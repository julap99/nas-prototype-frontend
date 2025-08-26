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

  // Profiling
  {
    header: "Profiling",
    description: "Profiling",
    child: [
      {
        title: "Pendaftaran Lengkap",
        path: "/profiling/pendaftaran-lengkap",
        icon: "ic:outline-dashboard",
        child: [],
      },
      {
        title: "Organisasi",
        path: "/profiling/organisasi",
        icon: "ic:outline-dashboard",
        child: [],
      },
      {
        title: "Semakan",
        path: "/profiling/semakan",
        icon: "ic:outline-dashboard",
        child: [],
      },
      {
        title: "Pengesahan",
        path: "/profiling/pengesahan",
        icon: "ic:outline-dashboard",
        child: [],
      },
    ],
  },

  // Pengurusan Bantuan
  {
    header: "Pengurusan Bantuan",
    description: "BTN",
    child: [
      {
        title: "Mohon Bantuan",
        path: "/pengurusan-bantuan/mohon-bantuan",
        icon: "",
        child: [],
        meta: {},
      },
      {
        title: "Bantuan Dengan Siasatan",
        path: "/pengurusan-bantuan/bantuan-dengan-siasatan",
        icon: "",
        child: [],
        meta: {},
      },

      {
        title: "Bantuan Dengan Siasatan Teknikal",
        path: "/pengurusan-bantuan/bantuan-dengan-siasatan-teknikal",
        icon: "",
        child: [],
      },
      {
        title: "Bulk Processing",
        path: "",
        icon: "",
        child: [
          {
            title: "Cipta Bulk Processing",
            path: "/pengurusan-bantuan/bulk-processing/cipta-bulk-processing",
            icon: "",
            child: [],
          },
          {
            title: "Senarai Bulk Processing (Sokongan)",
            path: "/pengurusan-bantuan/bulk-processing/senarai-bulk-processing-sokongan",
            icon: "",
            child: [],
          },
          {
            title: "Senarai Bulk Processing (Kelulusan)",
            path: "/pengurusan-bantuan/bulk-processing/senarai-bulk-processing-kelulusan",
            icon: "",
            child: [],
          },
        ],
        meta: {},
      },
      {
        title: "Kelulusan Khas",
        path: "",
        icon: "",
        child: [
          {
            title: "Senarai Permohonan",
            path: "/pengurusan-bantuan/kelulusan-khas/senarai-permohonan",
            icon: "",
            child: [],
          },
        ],
        meta: {},
      },
      {
        title: "Tuntutan",
        path: "",
        icon: "",
        child: [
          {
            title: "Mohon Tuntutan",
            path: "/pengurusan-bantuan/tuntutan/mohon-tuntutan",
            icon: "",
            child: [],
          },
          {
            title: "Senarai Pengesahan",
            path: "/pengurusan-bantuan/tuntutan/senarai-pengesahan",
            icon: "",
            child: [],
          },
          {
            title: "Senarai Kelulusan",
            path: "/pengurusan-bantuan/tuntutan/senarai-kelulusan",
            icon: "",
            child: [],
          },
        ],
        meta: {},
      },
      {
        title: "Program",
        path: "",
        icon: "",
        child: [
          {
            title: "Cipta Program",
            path: "/pengurusan-bantuan/program/cipta-program",
            icon: "",
            child: [],
          },
          {
            title: "Pemilihan Peserta",
            path: "/pengurusan-bantuan/program/pemilihan-peserta",
            icon: "",
            child: [],
          },
          {
            title: "Senarai Program (Pengesahan)",
            path: "/pengurusan-bantuan/program/senarai-program-pengesahan",
            icon: "",
            child: [],
          },
          {
            title: "Rekod Senarai Kehadiran",
            path: "/pengurusan-bantuan/program/rekod-senarai-kehadiran",
            icon: "",
            child: [],
          },
          {
            title: "Rekod Senarai Tuntutan",
            path: "/pengurusan-bantuan/program/rekod-senarai-tuntutan",
            icon: "",
            child: [],
          },
        ],
        meta: {},
      },

      // KL
      // Tuntuan
      //
    ],
    meta: {
      auth: {
        role: ["Developer"],
      },
    },
  },

  // Pengurusan Tunai
  {
    header: "Pengurusan Tunai",
    description: "TNI",
    child: [
      {
        title: "Tambah Tunai",
        path: "/pengurusan-tunai/tambah-tunai",
        icon: "ic:outline-dashboard",
        child: [
          {
            title: "Senarai Permohonan",
            path: "/pengurusan-tunai/tambah-tunai/senarai-permohonan-tunai",
            icon: "ic:outline-dashboard",
            child: [],
          },
        ],
      },
    ],
    meta: {
      auth: {
        role: ["Developer"],
      },
    },
  },

  // Pengurusan Aduan
  {
    header: "Pengurusan Aduan",
    description: "Aduan",
    child: [
      {
        title: "Daftar Aduan",
        path: "/pengurusan-aduan/daftar-aduan",
        icon: "",
        child: [],
      },
      {
        title: "Senarai Aduan Saya",
        path: "/pengurusan-aduan/senarai-aduan-saya",
        icon: "",
        child: [],
      },
      {
        title: "Senarai Aduan (Kelas 1)",
        path: "/pengurusan-aduan/senarai-aduan-kelas-1",
        icon: "",
        child: [],
      },
      {
        title: "Senarai Tugasan (SSU/Eksekutif/KJ)",
        path: "/pengurusan-aduan/senarai-tugasan-ssu",
        icon: "",
        child: [],
      },
      {
        title: "Senarai Aduan Terbuka (Kelas 2/3)",
        path: "/pengurusan-aduan/senarai-aduan-terbuka",
        icon: "",
        child: [],
      },
      {
        title: "Senarai Tugasan (PAK)",
        path: "/pengurusan-aduan/senarai-tugasan-pak",
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

  // Test
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

  // Administration
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
            title: "Categories",
            path: "/devtool/process-flow/categories",
            icon: "",
            child: [],
          },
          {
            title: "Processes",
            path: "/devtool/process-flow/processes",
            icon: "",
            child: [],
          },
          {
            title: "Components",
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
