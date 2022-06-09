import BaseAPI from "../base";
class OrganizationUnitAPI extends BaseAPI {
    constructor(){
        super();
        this.controller = "OrganizationUnit"
    }
}
export default new OrganizationUnitAPI();