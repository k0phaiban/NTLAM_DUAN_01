import BaseAPI from "../base";
class ProductsAPI extends BaseAPI {
    constructor(){
        super();
        this.controller = "products"
    }
    async GetAll(){
        return await this.Get();
    }

    async Export(){
        return await this.Get('/export');
    }
}
export default new ProductsAPI();