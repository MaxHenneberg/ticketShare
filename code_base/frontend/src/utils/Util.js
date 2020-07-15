export default class Utils {
  static isUserCreator(user, group) {
    return user._id === group.creator;
  }

  static isUserJoined(user, joinInformation) {
    console.log(joinInformation);
    for (const info of joinInformation) {
      console.log("INFO :"+info);
      if (info.joinedUser._id === user._id) {
        return true;
      }
    }
    return false;
  }
}

