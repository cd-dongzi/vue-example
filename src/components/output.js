import Alert from './alert/index'
import { showLoading, hideLoading } from './loading/index'

const install = function(Vue) {
    Vue.prototype.$alert = Alert;
    Vue.prototype.$showLoading = showLoading;
    Vue.prototype.$hideLoading = hideLoading;
}
export default install