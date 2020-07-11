module.exports = {
  USERS_LOGIN: "/users/login",
  USER_LOGIN_FAIL: "/users/login/fail",
  USERS_REGISTER: "/users/register",
  USERS_COOKIE: "/users/cookie",
  USER_ID: "/user/:id",
  USER: "/user",
  USERS: "/users",
  USER_TICKETS: "/tickets",
  GROUPS: "/groups",
  //group routers
  GROUP: "/groups/all",
	GET_GROUP: "/group/:id",

  GROUP_FREE_SLOTS: "/group/info/freeslots/:id",
  GetCreatedGroups: "/user/createdgroups/:user_id",
  GetJoinedGroups: "/user/joinedgroups/:user_id",

  GROUP_OCCSLOTS: "/group/occSlots",
  GROUP_INITJOIN: "/group/initJoin",
  GROUP_REVERT_INITJOIN: "/group/revertInitJoin",
  GROUP_VERFIY_PAYMENT: "/group/verifyPayment"

  //end group routers
  USER_ADDRESSES: "/addresses",
  NEW_ADDRESS: "/new_address",
  ADDRESS: "/address/:id",
  JOIN_INFO: "/join/:groupId",
  CREATE_GROUP: "/group/create",
  CURRENCY: "/currency",
  GROUP_ID: "/group",
};
