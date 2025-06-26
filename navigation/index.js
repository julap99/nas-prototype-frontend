// Navigation configurations for different roles
const superadminNavigation = [
  {
    header: "System Management",
    description: "Manage the entire system",
    child: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {
          auth: {
            role: ["superadmin"]
          }
        },
      },
      {
        title: "User Management",
        path: "/admin/users",
        icon: "ic:outline-people",
        child: [],
        meta: {
          auth: {
            role: ["superadmin"]
          }
        },
      },
      {
        title: "Role Management",
        path: "/admin/roles",
        icon: "ic:outline-admin-panel-settings",
        child: [],
        meta: {
          auth: {
            role: ["superadmin"]
          }
        },
      },
      {
        title: "System Settings",
        path: "/admin/settings",
        icon: "ic:outline-settings",
        child: [],
        meta: {
          auth: {
            role: ["superadmin"]
          }
        },
      },
      {
        title: "Audit Logs",
        path: "/admin/logs",
        icon: "ic:outline-history",
        child: [],
        meta: {
          auth: {
            role: ["superadmin"]
          }
        },
      },
    ],
    meta: {
      auth: {
        role: ["superadmin"]
      }
    },
  },
  {
    header: "Reports & Analytics",
    description: "System-wide reports and analytics",
    child: [
      {
        title: "System Reports",
        path: "/reports/system",
        icon: "ic:outline-analytics",
        child: [],
        meta: {
          auth: {
            role: ["superadmin"]
          }
        },
      },
      {
        title: "User Activity",
        path: "/reports/user-activity",
        icon: "ic:outline-timeline",
        child: [],
        meta: {
          auth: {
            role: ["superadmin"]
          }
        },
      },
    ],
    meta: {
      auth: {
        role: ["superadmin"]
      }
    },
  },
];

const ekpNavigation = [
  {
    header: "EKP Management",
    description: "Manage EKP operations",
    child: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {
          auth: {
            role: ["ekp", "superadmin"]
          }
        },
      },
      {
        title: "EKP Applications",
        path: "/ekp/applications",
        icon: "ic:outline-description",
        child: [],
        meta: {
          auth: {
            role: ["ekp", "superadmin"]
          }
        },
      },
      {
        title: "Document Management",
        path: "/ekp/documents",
        icon: "ic:outline-folder",
        child: [],
        meta: {
          auth: {
            role: ["ekp", "superadmin"]
          }
        },
      },
      {
        title: "Approval Workflow",
        path: "/ekp/approvals",
        icon: "ic:outline-check-circle",
        child: [],
        meta: {
          auth: {
            role: ["ekp", "superadmin"]
          }
        },
      },
    ],
    meta: {
      auth: {
        role: ["ekp", "superadmin"]
      }
    },
  },
  {
    header: "Reports",
    description: "EKP reports and statistics",
    child: [
      {
        title: "EKP Reports",
        path: "/reports/ekp",
        icon: "ic:outline-assessment",
        child: [],
        meta: {
          auth: {
            role: ["ekp", "superadmin"]
          }
        },
      },
    ],
    meta: {
      auth: {
        role: ["ekp", "superadmin"]
      }
    },
  },
];

const pkpNavigation = [
  {
    header: "PKP Management",
    description: "Manage PKP operations",
    child: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {
          auth: {
            role: ["pkp", "superadmin"]
          }
        },
      },
      {
        title: "PKP Applications",
        path: "/pkp/applications",
        icon: "ic:outline-description",
        child: [],
        meta: {
          auth: {
            role: ["pkp", "superadmin"]
          }
        },
      },
      {
        title: "Document Management",
        path: "/pkp/documents",
        icon: "ic:outline-folder",
        child: [],
        meta: {
          auth: {
            role: ["pkp", "superadmin"]
          }
        },
      },
      {
        title: "Approval Workflow",
        path: "/pkp/approvals",
        icon: "ic:outline-check-circle",
        child: [],
        meta: {
          auth: {
            role: ["pkp", "superadmin"]
          }
        },
      },
    ],
    meta: {
      auth: {
        role: ["pkp", "superadmin"]
      }
    },
  },
  {
    header: "Reports",
    description: "PKP reports and statistics",
    child: [
      {
        title: "PKP Reports",
        path: "/reports/pkp",
        icon: "ic:outline-assessment",
        child: [],
        meta: {
          auth: {
            role: ["pkp", "superadmin"]
          }
        },
      },
    ],
    meta: {
      auth: {
        role: ["pkp", "superadmin"]
      }
    },
  },
];

const eoadNavigation = [
  {
    header: "EOAD Management",
    description: "Manage EOAD operations",
    child: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {
          auth: {
            role: ["eoad", "superadmin"]
          }
        },
      },
      {
        title: "EOAD Applications",
        path: "/eoad/applications",
        icon: "ic:outline-description",
        child: [],
        meta: {
          auth: {
            role: ["eoad", "superadmin"]
          }
        },
      },
      {
        title: "Document Management",
        path: "/eoad/documents",
        icon: "ic:outline-folder",
        child: [],
        meta: {
          auth: {
            role: ["eoad", "superadmin"]
          }
        },
      },
      {
        title: "Approval Workflow",
        path: "/eoad/approvals",
        icon: "ic:outline-check-circle",
        child: [],
        meta: {
          auth: {
            role: ["eoad", "superadmin"]
          }
        },
      },
    ],
    meta: {
      auth: {
        role: ["eoad", "superadmin"]
      }
    },
  },
  {
    header: "Reports",
    description: "EOAD reports and statistics",
    child: [
      {
        title: "EOAD Reports",
        path: "/reports/eoad",
        icon: "ic:outline-assessment",
        child: [],
        meta: {
          auth: {
            role: ["eoad", "superadmin"]
          }
        },
      },
    ],
    meta: {
      auth: {
        role: ["eoad", "superadmin"]
      }
    },
  },
];

const asnafNavigation = [
  {
    header: "Asnaf Services",
    description: "Asnaf application and services",
    child: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {
          auth: {
            role: ["asnaf", "superadmin"]
          }
        },
      },
      {
        title: "My Applications",
        path: "/asnaf/applications",
        icon: "ic:outline-description",
        child: [],
        meta: {
          auth: {
            role: ["asnaf", "superadmin"]
          }
        },
      },
      {
        title: "Submit Application",
        path: "/asnaf/apply",
        icon: "ic:outline-add-circle",
        child: [],
        meta: {
          auth: {
            role: ["asnaf", "superadmin"]
          }
        },
      },
      {
        title: "My Documents",
        path: "/asnaf/documents",
        icon: "ic:outline-folder",
        child: [],
        meta: {
          auth: {
            role: ["asnaf", "superadmin"]
          }
        },
      },
      {
        title: "Application Status",
        path: "/asnaf/status",
        icon: "ic:outline-info",
        child: [],
        meta: {
          auth: {
            role: ["asnaf", "superadmin"]
          }
        },
      },
    ],
    meta: {
      auth: {
        role: ["asnaf", "superadmin"]
      }
    },
  },
  {
    header: "Help & Support",
    description: "Get help and support",
    child: [
      {
        title: "Help Center",
        path: "/help",
        icon: "ic:outline-help",
        child: [],
        meta: {
          auth: {
            role: ["asnaf", "superadmin"]
          }
        },
      },
      {
        title: "Contact Support",
        path: "/support",
        icon: "ic:outline-support-agent",
        child: [],
        meta: {
          auth: {
            role: ["asnaf", "superadmin"]
          }
        },
      },
    ],
    meta: {
      auth: {
        role: ["asnaf", "superadmin"]
      }
    },
  },
];

// Function to get navigation based on user role
export const getNavigationByRole = (userRole) => {
  switch (userRole) {
    case 'superadmin':
      return [
        ...superadminNavigation,
        ...ekpNavigation,
        ...pkpNavigation,
        ...eoadNavigation,
        ...asnafNavigation
      ];
    case 'ekp':
      return ekpNavigation;
    case 'pkp':
      return pkpNavigation;
    case 'eoad':
      return eoadNavigation;
    case 'asnaf':
      return asnafNavigation;
    default:
      return asnafNavigation; // Default to asnaf navigation
  }
};

// Default export for backward compatibility
export default asnafNavigation;
