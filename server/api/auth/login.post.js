import sha256 from "crypto-js/sha256.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const ENV = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody(event);

    if (!username || !password) {
      return {
        statusCode: 400,
        message: "Username and password are required",
      };
    }

    const user = await prisma.user.findFirst({
      where: {
        userUsername: username,
      },
      select: {
        userID: true,
        userUsername: true,
        userEmail: true,
        userFullName: true,
        userPassword: true,
      },
    });

    console.log("User: ", user);

    if (!user) {
      return {
        statusCode: 404,
        message: "User does not exist",
      };
    }

    const hashedPassword = sha256(password).toString();
    if (user.userPassword !== hashedPassword) {
      return {
        statusCode: 401,
        message: "Invalid password",
      };
    }

    console.log("User password: ", user.userPassword);
    console.log("Hashed password: ", hashedPassword);

    // Get user roles (if userRole is a relation, keep this block)
    const roles = await prisma.userrole.findMany({
      where: {
        userRoleUserID: user.userID,
      },
      select: {
        role: {
          select: {
            roleName: true,
          },
        },
      },
    });
    console.log("Roles: ", roles);
    const roleNames = roles.map((r) => r.role.roleName);

    console.log("Role names: ", roleNames);

    // Generate tokenId for refresh token
    const tokenId = uuidv4();

    // JWT payloads
    const accessPayload = {
      sub: user.userID,
      email: user.userEmail,
      role: roleNames,
      fullName: user.userFullName,
    };
    const refreshPayload = {
      ...accessPayload,
      tokenId,
    };

    const accessToken = generateAccessToken(accessPayload);
    const refreshToken = generateRefreshToken(refreshPayload);

    // Set cookie httpOnly
    event.res.setHeader("Set-Cookie", [
      `accessToken=${accessToken}; HttpOnly; Secure; SameSite=Lax; Path=/`,
      `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Lax; Path=/`,
    ]);

    return {
      statusCode: 200,
      message: "Login success",
      data: {
        username: user.userUsername,
        roles: roleNames,
        accessToken,
        refreshToken,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Internal server error",
    };
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, ENV.auth.secretAccess, { expiresIn: "1d" });
}

function generateRefreshToken(user) {
  return jwt.sign(user, ENV.auth.secretRefresh, { expiresIn: "30d" });
}
