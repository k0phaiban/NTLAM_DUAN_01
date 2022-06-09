import Api from './base';

export default{
    async GetListPage(){
        var res =  await Api.Get('Pages')
        return res
    },

    async InsertCatagory(data){
        var res =  await Api.Insert('Catagories',data)
        return res
    }
}