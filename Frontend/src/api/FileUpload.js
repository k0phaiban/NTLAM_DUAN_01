import { Upload } from 'element-ui';
import BaseApi from './base';
import Axios from 'axios';

export default{
    //Hàm get ALL
    controller: "Upload",
    async GetAll(){
        return  BaseApi.GetAll(this.controller);
    },
    //Hàm xóa
    async Delete(id){
        return  BaseApi.Delete(this.controller,id);
    },
    async Upload(file){
        return  Axios.post(`https://localhost:44352/api/Upload`, file,
        {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            return response;
        }).catch(error => {
            console.log(error);
        });;
    }
}
