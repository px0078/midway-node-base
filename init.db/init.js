db.authgroups.insert([
  {
    __v: 0,
    _id: ObjectId("5ae18d0efbbe77641966cb60"),
    create_date: ISODate("2018-04-26T08:25:50.341Z"),
    describe: "超级管理员",
    modules: [
      "5ae2a084dfa9080ec4bf4a6d",
      "5ae2b9dc06ebe130282a3968",
      "5ae2ba4f06ebe130282a396a",
      "5ae2ba5a06ebe130282a396b",
      "5ae2ba6d06ebe130282a396d",
      "5ae2b6e6772d6f2d78726aca",
      "5ae2b741772d6f2d78726acc",
      "5ae2b765772d6f2d78726acf",
      "5ae2b74d772d6f2d78726acd",
      "5ae2baff06ebe130282a3972",
      "5ae2bb3806ebe130282a3977",
      "5ae2bb1e06ebe130282a3974",
      "5ae2bb2706ebe130282a3975"
    ],
    name: "admin",
    update_date: ISODate("2019-06-21T06:50:08.37Z"),
    users: ["5ae16cc3e928ed4ac5f887a0"]
  }
]);

db.authusers.insert([
  {
    __v: 0,
    _id: ObjectId("5ae16cc3e928ed4ac5f887a0"),
    account: "admin",
    create_date: ISODate("2018-04-26T06:08:03.756Z"),
    email: "",
    mobile: "",
    name: "超级管理员",
    password: "e10adc3949ba59abbe56e057f20f883e",
    update_date: ISODate("2018-06-21T08:43:33.597Z")
  }
]);

db.authmodules.insert([
  {
    sort: 1,
    _id: ObjectId("5ae2a084dfa9080ec4bf4a6d"),
    __v: 0,
    create_date: "2018-04-27T04:01:08.952Z",
    describe: null,
    iconfont: "solution",
    isMenu: true,
    name: "系统设置",
    parent_id: "",
    update_date: "2019-11-25T10:12:49.137Z",
    uri: ""
  },
  {
    sort: 0,
    _id: ObjectId("5ae2b6e6772d6f2d78726aca"),
    __v: 0,
    create_date: "2018-04-27T05:36:38.388Z",
    describe: null,
    iconfont: "user",
    isMenu: true,
    name: "用户管理",
    parent_id: "5ae2a084dfa9080ec4bf4a6d",
    update_date: "2019-11-25T10:12:49.138Z",
    uri: "auth.user.index"
  },
  {
    sort: 0,
    _id: ObjectId("5ae2b741772d6f2d78726acc"),
    __v: 0,
    create_date: "2018-04-27T05:38:09.041Z",
    describe: null,
    iconfont: null,
    isMenu: null,
    name: "添加按钮",
    parent_id: "5ae2b6e6772d6f2d78726aca",
    update_date: "2019-11-25T10:12:49.138Z",
    uri: "auth.user.create"
  },
  {
    sort: 0,
    _id: ObjectId("5ae2b74d772d6f2d78726acd"),
    __v: 0,
    create_date: "2018-04-27T05:38:21.861Z",
    describe: null,
    iconfont: null,
    isMenu: null,
    name: "删除按钮",
    parent_id: "5ae2b6e6772d6f2d78726aca",
    update_date: "2019-11-25T10:12:49.138Z",
    uri: "auth.user.destroy"
  },
  {
    sort: 0,
    _id: ObjectId("5ae2b765772d6f2d78726acf"),
    __v: 0,
    create_date: "2018-04-27T05:38:45.456Z",
    describe: null,
    iconfont: null,
    isMenu: null,
    name: "修改按钮",
    parent_id: "5ae2b6e6772d6f2d78726aca",
    update_date: "2019-11-25T10:12:49.138Z",
    uri: "auth.user.edit,auth.user.setPassword,auth.user.update"
  },
  {
    sort: 0,
    _id: ObjectId("5ae2b9dc06ebe130282a3968"),
    __v: 0,
    create_date: "2018-04-27T05:49:16.063Z",
    describe: null,
    iconfont: "team",
    isMenu: true,
    name: "角色管理",
    parent_id: "5ae2a084dfa9080ec4bf4a6d",
    update_date: "2019-11-25T10:12:49.138Z",
    uri: "auth.group.getModule,auth.group.getUser,auth.group.index"
  },
  {
    sort: 0,
    _id: ObjectId("5ae2ba4f06ebe130282a396a"),
    __v: 0,
    create_date: "2018-04-27T05:51:11.006Z",
    describe: null,
    iconfont: null,
    isMenu: null,
    name: "添加按钮",
    parent_id: "5ae2b9dc06ebe130282a3968",
    update_date: "2019-11-25T10:12:49.138Z",
    uri: "auth.group.create"
  },
  {
    sort: 0,
    _id: ObjectId("5ae2ba5a06ebe130282a396b"),
    __v: 0,
    create_date: "2018-04-27T05:51:22.059Z",
    describe: null,
    iconfont: null,
    isMenu: null,
    name: "删除按钮",
    parent_id: "5ae2b9dc06ebe130282a3968",
    update_date: "2019-11-25T10:12:49.138Z",
    uri: "auth.group.destroy"
  },
  {
    sort: 0,
    _id: ObjectId("5ae2ba6d06ebe130282a396d"),
    __v: 0,
    create_date: "2018-04-27T05:51:41.524Z",
    describe: null,
    iconfont: null,
    isMenu: false,
    name: "修改按钮",
    parent_id: "5ae2b9dc06ebe130282a3968",
    update_date: "2019-11-25T10:12:49.138Z",
    uri:
      "auth.group.edit,auth.group.setModule,auth.group.setUser,auth.group.update"
  },
  {
    sort: 0,
    _id: ObjectId("5ae2baff06ebe130282a3972"),
    __v: 0,
    create_date: "2018-04-27T05:54:07.280Z",
    describe: null,
    iconfont: "solution",
    isMenu: true,
    name: "菜单管理",
    parent_id: "5ae2a084dfa9080ec4bf4a6d",
    update_date: "2019-11-25T10:12:49.138Z",
    uri: "auth.module.index,auth.module.system"
  },
  {
    sort: 0,
    _id: ObjectId("5ae2bb1e06ebe130282a3974"),
    __v: 0,
    create_date: "2018-04-27T05:54:38.858Z",
    describe: null,
    iconfont: null,
    isMenu: null,
    name: "添加按钮",
    parent_id: "5ae2baff06ebe130282a3972",
    update_date: "2019-11-25T10:12:49.138Z",
    uri: "auth.module.create"
  },
  {
    sort: 0,
    _id: ObjectId("5ae2bb2706ebe130282a3975"),
    __v: 0,
    create_date: "2018-04-27T05:54:47.486Z",
    describe: null,
    iconfont: null,
    isMenu: null,
    name: "删除按钮",
    parent_id: "5ae2baff06ebe130282a3972",
    update_date: "2019-11-25T10:12:49.139Z",
    uri: "auth.module.destroy"
  },
  {
    sort: 0,
    _id: ObjectId("5ae2bb3806ebe130282a3977"),
    __v: 0,
    create_date: "2018-04-27T05:55:04.553Z",
    describe: null,
    iconfont: null,
    isMenu: null,
    name: "修改按钮",
    parent_id: "5ae2baff06ebe130282a3972",
    update_date: "2019-11-25T10:12:49.139Z",
    uri: "auth.module.edit,auth.module.update"
  },
  {
    sort: 0,
    _id: ObjectId("5d25b469ae572c2fe9fdce18"),
    __v: 0,
    create_date: "2019-08-02T08:17:10.029Z",
    describe: "",
    name: "导出按钮",
    parent_id: "5ae2baff06ebe130282a3972",
    update_date: "2019-11-25T10:12:49.141Z",
    uri: "auth.module.export"
  },
  {
    sort: 0,
    _id: ObjectId("5d26e76d1d09cb6996fc81ce"),
    __v: 0,
    create_date: "2019-08-02T08:17:10.029Z",
    describe: "",
    name: "文件上传",
    parent_id: "5ae2a084dfa9080ec4bf4a6d",
    update_date: "2019-11-25T10:12:49.142Z",
    uri: "sys.common.getOSSToken"
  },
  {
    sort: 0,
    _id: ObjectId("5d43f034a1931579ad3b5a59"),
    name: "导入按钮",
    uri: "auth.module.import",
    describe: "",
    parent_id: "5ae2baff06ebe130282a3972",
    create_date: "2019-08-02T08:11:32.185Z",
    update_date: "2019-08-02T08:11:32.185Z",
    __v: 0
  },
  {
    sort: 0,
    _id: ObjectId("5def9bca4ed70ff72379d987"),
    name: "权限表",
    uri: "auth.user.authorization",
    describe: "",
    parent_id: "5ae2b6e6772d6f2d78726aca",
    create_date: "2019-12-15T12:43:06.410Z",
    update_date: "2019-12-15T12:43:06.411Z"
  },
  {
    sort: 0,
    _id: ObjectId("5def9bca4ed70ff72379d988"),
    name: "用户表",
    uri: "auth.group.getUser",
    describe: "",
    parent_id: "5ae2b9dc06ebe130282a3968",
    create_date: "2019-12-15T12:43:06.411Z",
    update_date: "2019-12-15T12:43:06.411Z"
  },
  {
    sort: 0,
    _id: ObjectId("5def9bca4ed70ff72379d989"),
    name: "权限查询",
    uri: "auth.auth.assign",
    describe: "",
    parent_id: "5ae2a084dfa9080ec4bf4a6d",
    create_date: "2019-12-15T12:43:06.411Z",
    update_date: "2019-12-15T12:43:06.411Z"
  },
  {
    sort: 0,
    _id: ObjectId("5def9d554ed70ff72379d98b"),
    name: "查询权限用户",
    uri: "auth.authorization.users,auth.user.getUserById",
    describe: "",
    parent_id: "5def9bca4ed70ff72379d989",
    create_date: "2019-12-15T12:43:06.411Z",
    update_date: "2019-12-15T12:43:06.411Z"
  }
]);
