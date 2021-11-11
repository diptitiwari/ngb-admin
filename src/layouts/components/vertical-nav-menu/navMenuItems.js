/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: "/",
    name: "Dashboard",
    slug: "Dashboard",
    icon: "HomeIcon",
    i18n: "label.heading.dashboard",
  },
  {
    url: "/customers",
    name: "Customer",
    slug: "Customer",
    icon: "UserIcon",
    slug: "page2",
    i18n: "label.anchor.customers",
  },
  {
    url: null,
    name: "Inventory",
    icon: "ClipboardIcon",
    i18n: "label.heading.inventory",
    submenu: [
      {
        url: "/good_receipt",
        name: "Goods Receipt",
        slug: "app-user-list",
        i18n: "label.heading.goodsreceipt",
      },
      {
        url: "/load_devices",
        name: "Load Devices",
        slug: "app-user-view",
        i18n: "label.heading.loaddevices",
      },
      {
        url: "/stock_transfer",
        name: "Stock Transfer",
        slug: "app-user-list",
        i18n: "label.heading.stocktransfer",
      },
      {
        url: "/transfer_request",
        name: "Transfer Request",
        slug: "app-user-view",
        i18n: "label.heading.transferrequest",
      }
    ]
  },
  {
    url: null,
    name: "Ticketing",
    icon: "TagIcon",
    i18n: "label.anchor.ticketing",
    submenu: [
      {
        url: "/create_ticket",
        name: "Create Ticket",
        slug: "app-user-list",
        i18n: "label.createticket",
      },

    ]
  },
  {
    url: '/entity',
    name: "Entity",
    slug: "Entity",
    icon: "UserPlusIcon",
    i18n: "label.heading.entity",
  },
  {
    url: null,
    name: "Leads",
    icon: "UserCheckIcon",
    i18n: "label.heading.leads",
    submenu: [
      {
        url: "/create_enttiy",
        name: "Create Entity",
        slug: "app-user-list",
        i18n: "label.anchor.createentity",
      },

    ]
  },
  {
    url: "/reporting",
    name: "Reporting",
    slug: "reporting",
    icon: "CheckCircleIcon",
    i18n: "label.anchor.reporting"
  },
  {
    url: "/system_config",
    name: "System Config",
    slug: "page2",
    icon: "SettingsIcon",
    i18n: "label.anchor.systemconfig"
  },
  {
    url: "/master_setup",
    name: "Master Setup",
    slug: "page2",
    icon: "LayersIcon",
    i18n: "label.anchor.mastersetup"
  },
  {
    url: "/accounting",
    name: "Accounting",
    slug: "page2",
    icon: "FileTextIcon",
    i18n: "label.anchor.accounting"
  },
  {
    url: null,
    name: "Admin",
    icon: "UsersIcon",
    i18n: "label.anchor.admin",
    submenu: [
      {
    url: "/bulk_uploads",
    name: "Bulk Uploads",
    slug: "app-user-view",
    i18n: "label.anchor.datauploads"
  },
      {
        url: "/scheduler_job",
        name: "Scheduler Job",
        slug: "app-user-view",
        i18n: "label.anchor.schedulerjob",
      },
      {
        url: "/online_payments",
        name: "Online Payments",
        slug: "app-user-list",
        i18n: "label.anchor.managepaymentgateway",
      },
      {
        url: "/provisioning_status",
        name: "Provisioning Status",
        slug: "app-user-view",
        i18n: "label.anchor.provisioningstatus",
      },
      {
        url: "/event_actions",
        name: "Event Actions",
        slug: "app-user-view",
        i18n: "label.anchor.eventactions",
      },
      {
        url: "/provisioning_commands",
        name: "Provisioning Commands",
        slug: "app-user-list",
        i18n: "label.anchor.provisioningcommands",
      }
    ]
  },
  // {
  //   url: "/payment-gateway",
  //   name: "Payment Gateway",
  //   slug: "page2",
  //   icon: "CreditCardIcon",
  //   i18n: "label.anchor.paymentgateway"
  // },
  // {
  //   url: "/bulk-uploads",
  //   name: "Bulk Uploads",
  //   slug: "page2",
  //   icon: "FileIcon",
  //   i18n: "label.anchor.datauploads"
  // },
  // {
  //   url: "/scheduler-jobs",
  //   name: "Scheduler Jobs",
  //   slug: "page2",
  //   icon: "ClockIcon",
  //   i18n: "label.anchor.schedulerjobs"
  // },
  // {
  //   url: "/accounting",
  //   name: "Accounting",
  //   slug: "page2",
  //   icon: "DollarSignIcon",
  //   i18n: "label.heading.accounting"
  // },
  // {
  //   url: "/short-cuts",
  //   name: "Short Cuts",
  //   slug: "page2",
  //   icon: "ExternalLinkIcon",
  //   i18n: "label.anchor.shortcuts"
  // },
  // {
  //   url: "/customers",
  //   name: "Customers",
  //   slug: "page2",
  //   icon: "UsersIcon",
  //   i18n: "label.anchor.customers"
  // },
  // {
  //   url: null,
  //   name: "Customer",
  //   icon: "UserIcon",
  //   i18n: "User",
  //   submenu: [
  //     {
  //       url: "/create_client",
  //       name: "Create Customer",
  //       slug: "app-user-list",
  //       i18n: "List",
  //     },
  //     {
  //       url: "/apps/user/user-view/268",
  //       name: "View",
  //       slug: "app-user-view",
  //       i18n: "View",
  //     },
  //     {
  //       url: "/apps/user/user-edit/268",
  //       name: "Edit",
  //       slug: "app-user-edit",
  //       i18n: "Edit",
  //     },
  //   ]
  // },
  // {
  //   url: "/entity",
  //   name: "Entity",
  //   slug: "page2",
  //   icon: "UserCheckIcon",
  //   i18n: "label.heading.entity"
  // },
]
