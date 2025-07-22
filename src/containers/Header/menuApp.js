export const adminMenu = [
  {
    //Quản lý người dùng
    name: "admin.manage-user",
    menus: [
      {
        name: "admin.crud",
        link: "/system/user-manage",
        // subMenus: [
        //   {
        //     name: "menu.system.system-administrator.user-manage",
        //     link: "/system/user-manage",
        //   },
        //   {
        //     name: "menu.system.system-administrator.user-redux",
        //     link: "/system/user-redux",
        //   },
        // ],
      },
      { name: "admin.crud-redux", link: "/system/user-redux" },
      { name: "admin.manage-doctor", link: "/system/manage-doctor" },
      { name: "admin.manage-admin", link: "/system/user-admin" },
      {
        name: "menu.system.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  //Quản lý phòng khám
  {
    name: "admin.clinic",
    menus: [{ name: "admin.manage-clinic", link: "/system/manage-clinic" }],
  },
  {
    //Quản lý chuyên khoa
    name: "admin.specialty",
    menus: [
      { name: "admin.manage-specialty", link: "/system/manage-specialty" },
    ],
  },
  {
    //Quản lý cẩm nang
    name: "admin.handbook",
    menus: [{ name: "admin.manage-handbook", link: "/system/manage-handbook" }],
  },
];

export const doctorMenu = [
  {
    name: "admin.manage-user",
    menus: [
      {
        name: "menu.system.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      {
        name: "menu.system.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
    ],
  },
];
