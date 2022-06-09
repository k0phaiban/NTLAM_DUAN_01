import BaseAPI from "../base";
class RoleAPI extends BaseAPI {
    constructor(){
        super();
        this.controller = "Role"
    }
    async DeleteRole(id){
        return this.DeleteBase(`/delete-role/${id}`);
    }
}
export default new RoleAPI();