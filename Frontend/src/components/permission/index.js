/**
 * plugin popup
 */
import Permission from './ccPermission.vue';
Permission.install = (Vue, options = {}) => {
    let MyComponent = Vue.extend({
        render: h=> {
            return h(Permission,{
                props:{
                    options: options
                },
                ref: "Permission"
            })
        }
    })
    var component = new MyComponent().$mount()
    document.body.appendChild(component.$el)
    Vue.prototype.$checkPermission = component.$refs.Permission
}
export default Permission;