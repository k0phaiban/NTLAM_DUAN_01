import Axios from 'axios';
import store from "@/store/index.js";
export default class BaseAPI{
    constructor(){
        this.store = store;
    }
    api = "http://localhost:3000/"

    controller = ""

    async Get(route = ""){
        return await Axios.get(this.api + this.controller + route,
            {
                headers: { Authorization: `Bearer ${this.store.getters.token}` }
            }).then(response => {
                return response;
            }).catch(error => {
                console.log(error);
            });
    }

    async PostNotAuthen(route,data){
        return await Axios.post(this.api + this.controller + route, data,
        {
            headers: { 'Content-Type': "application/json" }
        }).then(response => {
            return response;
        }).catch(error => {
            console.log(error);
        });;
    }
    async Post(route,data){
        return await Axios.post(this.api + this.controller + route, data,
            {
                headers: { Authorization: `Bearer ${this.store.getters.token}`,
                'Content-Type': "application/json" }
            }).then(response => {
                return response;
            }).catch(error => {
                console.log(error);
            });
    }

    async DeleteBase(route){
        return await Axios.delete(this.api + this.controller + route,
            {
                headers: { Authorization: `Bearer ${this.store.getters.token}` }
            }).then(response => {
                return response;
            }).catch(error => {
                console.log(error);
            });
    }

    async Delete(id){
        var res =  await this.DeleteBase(`/${id}`);
        return res;
    }

    async Insert(data){
        var res =  await this.Post("/insert", data);
        return res;
    }

    async Update(data){
        var res =  await this.Post("/update", data);
        return res;
    }

    async SaveList(data){
        var res =  await this.Post("/save-list", data);
        return res;
    }
    async GetByID(data){
        return  await this.Get(`/getByID/${data}`);
    }
    //Hàm get ALL
    async GetAll(){
        return  await this.Get("/get-all");
    }
}
