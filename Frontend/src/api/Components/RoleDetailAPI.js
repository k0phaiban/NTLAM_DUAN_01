import BaseAPI from "../base";
class RoleDetailAPI extends BaseAPI {
    constructor(){
        super();
        this.controller = "RoleDetail"
    }
    async GetListRoleDetail(param){
        return await this.Get(`/list-role/${param}`);
    }
}
export default new RoleDetailAPI();