export default [
  {
    header: "Main",
    description: "",
    child: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
    ],
    meta: {},
  },
  {
    header: "Test",
    description: "Test Menu",
    child: [
      {
        title: "Penolong Amil",
        path: "",
        icon: "",
        child: [
          {
            title: "Konfigurasi",
            path: "",
            icon: "",
            child: [
              {
                title: "Kemaskini Jawatan",
                path: "/pengurusan-bantuan/mohon-bantuan/bantuan-dengan-siasatan",
                icon: "",
                child: [],
              },
            ],
            meta: {
              auth: {
                role: ["Developer"],
              },
            },
          },
        ],
        meta: {
          auth: {
            role: ["Developer"],
          },
        },
      },
      {
        title: "Profiling - FR",
        path: "/profiling/full-registration",
        icon: "",
        child: [],
        meta: {
          auth: {
            role: ["Developer"],
          },
        },
      },
      {
        title: "Penolong Amil",
        path: "/profiling/quick-registration",
        icon: "",
        child: [],
        meta: {
          auth: {
            role: ["Developer"],
          },
        },
      },
      {
        title: "Pengurusan Bantuan",
        path: "",
        icon: "",
        child: [
          {
            title: "Mohon Bantuan",
            path: "",
            icon: "",
            child: [
              {
                title: "Bantuan Dengan Siasatan",
                path: "/pengurusan-bantuan/mohon-bantuan/bantuan-dengan-siasatan",
                icon: "",
                child: [],
              },
            ],
            meta: {
              auth: {
                role: ["Developer"],
              },
            },
          },
        ],
        meta: {
          auth: {
            role: ["Developer"],
          },
        },
      },
    ],
    meta: {
      auth: {
        role: ["Developer"],
      },
    },
  },
  {
    header: "Administration",
    description: "Manage your application",
    child: [
      {
        title: "Process Flow",
        path: "/devtool/process-flow",
        icon: "ic:sharp-scatter-plot",
        child: [
          {
            title: "Processes",
            path: "/devtool/process-flow/processes",
            icon: "",
            child: [],
          },
          {
            title: "Configuration",
            path: "/devtool/process-flow/components",
            icon: "",
            child: [],
          },
        ],
        meta: {
          auth: {
            role: ["Developer"],
          },
        },
      },
      {
        title: "Menu Editor",
        icon: "ci:menu-alt-03",
        path: "/devtool/menu-editor",
        child: [],
      },
      {
        title: "Content Editor",
        path: "/devtool/content-editor",
        icon: "ic:content-copy",
        child: [],
      },
      {
        title: "User Management",
        path: "/devtool/user-management",
        icon: "ph:user-circle-gear",
        child: [
          {
            title: "User List",
            path: "/devtool/user-management/user",
            icon: "",
            child: [],
          },
          {
            title: "Role List",
            path: "/devtool/user-management/role",
            icon: "",
            child: [],
          },
        ],
      },
      // {
      //   title: "API Editor",
      //   path: "/devtool/api-editor",
      //   icon: "material-symbols:api-rounded",
      //   child: [],
      // },
    ],
    meta: {
      auth: {
        role: ["Developer"],
      },
    },
  },
];
