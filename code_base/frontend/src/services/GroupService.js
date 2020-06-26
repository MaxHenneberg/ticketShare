const GroupApiEndpoint = "http://localhost:8080/group";

export default class GroupService {

   static async getGroupById(id) {
     return fetch(GroupApiEndpoint + "?id=" + id)
    .then(response => response.json());
  }
}
