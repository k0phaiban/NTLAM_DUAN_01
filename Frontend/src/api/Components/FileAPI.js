import BaseAPI from "../base";
import Axios from 'axios';
import store from "@/store/index.js";
class FileAPI extends BaseAPI {
    constructor(){
        super();
        this.controller = "File"
        this.store = store;
    }
    async UploadFile(file){
        return  Axios.post(`https://localhost:44352/api/File/upload-file`, file,
        {
            headers: { 
                'Content-Type': 'multipart/form-data',
                Authorization : `Bearer ${this.store.getters.token}` }
        }).then(response => {
            return response;
        }).catch(error => {
            console.log(error);
        });;
    }
    async GetPersonal(param){
        return await this.Post("/personal",param);
    }
    async InsertPersonal(param){
        return await this.Post("/insert-personal",param);
    }
    async SearchPersonal(param){
        return await this.Post("/search",JSON.stringify(param));
    }
}
export default new FileAPI();