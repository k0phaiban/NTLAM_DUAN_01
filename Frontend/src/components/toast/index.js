/**
 * plugin popup
 */
import Toast from './ccToast.vue';
Toast.install = (Vue, options = {}) => {
    let MyComponent = Vue.extend({
        render: h=> {
            return h(Toast,{
                props:{
                    options: options
                },
                ref: "Toast"
            })
        }
    })
    var component = new MyComponent().$mount()
    document.body.appendChild(component.$el)
    Vue.prototype.$showToast = component.$refs.Toast
}
export default Toast;