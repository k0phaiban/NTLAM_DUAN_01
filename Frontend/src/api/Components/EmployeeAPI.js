import BaseAPI from "../base";
import Axios from 'axios';
class EmployeeAPI extends BaseAPI {
    constructor(){
        super();
        this.controller = "Employee"
    }
}
export default new EmployeeAPI();