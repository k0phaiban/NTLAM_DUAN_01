/**
 * plugin popup
 */
import Popup from './CCPopupNotification.vue';
Popup.install = (Vue, options = {}) => {
    let MyComponent = Vue.extend({
        render: h=> {
            return h(Popup,{
                props:{
                    options: options
                },
                ref: "Popup"
            })
        }
    })
    var component = new MyComponent().$mount()
    document.body.appendChild(component.$el)
    Vue.prototype.$popup = component.$refs.Popup
}
export default Popup;