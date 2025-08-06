export default [
  {
    "header": "Main",
    "description": "",
    "child": [
      {
        "title": "Dashboard",
        "path": "/dashboard",
        "icon": "ic:outline-dashboard",
        "child": [],
        "meta": {}
      }
    ],
    "meta": {}
  },
  {
    "header": "Test",
    "description": "Test Menu",
    "child": [
      {
        "title": "Profiling - FR",
        "path": "/profiling/full-registration",
        "icon": "",
        "child": [],
        "meta": {
          "auth": {
            "role": [
              "Developer"
            ]
          }
        }
      },
      {
        "title": "Profiling - QR",
        "path": "/profiling/quick-registration",
        "icon": "",
        "child": [],
        "meta": {
          "auth": {
            "role": [
              "Developer"
            ]
          }
        }
      }
    ],
    "meta": {
      "auth": {
        "role": [
          "Developer"
        ]
      }
    }
  },
  {
    "header": "Administration",
    "description": "Manage your application",
    "child": [
      {
        "title": "Configuration",
        "icon": "ic:outline-settings",
        "child": [
          {
            "title": "Environment",
            "path": "/devtool/config/environment"
          },
          {
            "title": "Site Settings",
            "path": "/devtool/config/site-settings"
          }
        ]
      },
      {
        "title": "Process Flow",
        "icon": "ic:baseline-keyboard-double-arrow-right",
        "child": [
          {
            "title": "Processes",
            "path": "/devtool/process-flow/processes"
          },
          {
            "title": "Components",
            "path": "/devtool/process-flow/components"
          }
        ]
      },
      {
        "title": "Menu Editor",
        "icon": "ci:menu-alt-03",
        "path": "/devtool/menu-editor",
        "child": []
      },
      {
        "title": "User Management",
        "path": "/devtool/user-management",
        "icon": "ph:user-circle-gear",
        "child": [
          {
            "title": "User List",
            "path": "/devtool/user-management/user",
            "icon": "",
            "child": []
          },
          {
            "title": "Role List",
            "path": "/devtool/user-management/role",
            "icon": "",
            "child": []
          }
        ]
      },
      {
        "title": "Content",
        "icon": "mdi:pencil-ruler",
        "child": [
          {
            "title": "Editor",
            "path": "/devtool/content-editor"
          },
          {
            "title": "Templates",
            "path": "/devtool/content-editor/template"
          }
        ]
      },
      {
        "title": "API Editor",
        "path": "/devtool/api-editor",
        "icon": "material-symbols:api-rounded",
        "child": []
      }
    ],
    "meta": {
      "auth": {
        "role": [
          "Developer"
        ]
      }
    }
  }
]