import BaseAPI from "../base";
class UserAPI extends BaseAPI {
    constructor(){
        super();
        this.controller = "User"
    }
    async Login(param){
        return await this.PostNotAuthen("/authenticate",param);
    }
    async GetUserInfo(){
        return await this.Get("/user-info");
    }
}
export default new UserAPI();