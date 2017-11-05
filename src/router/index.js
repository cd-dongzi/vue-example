import Vue from 'vue'
import Router from 'vue-router'
import _import_ from './_import_'

Vue.use(Router)
Router.prototype.back = false;
Router.prototype.goBack = function () {
  	this.back = true;
  	this.go(-1)
}
const router =new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: (resolve) => {
                require(['../views/home/index'], resolve)
            }
        },
        {
            path: '/css-bg-build',
            name: 'css-bg-build',
            component: _import_('css-bg-build/index')
        },
        {
            path: '/less-vars',
            name: 'less-vars',
            component: _import_('less-vars/index')
        },
        {
            path: '/proxy',
            name: 'proxy',
            component: _import_('proxy/index')
        },
        {
            path: '/babel-polyfill',
            name: 'babel-polyfill',
            component: _import_('babel-polyfill/index')
        },
        {
            path: '/interceptor',
            name: 'interceptor',
            component: _import_('interceptor/index')
        },
        {
            path: '/vue-set',
            name: 'vue-set',
            component: _import_('vue-set/index')
        },
        {
            path: '/life-cycle',
            name: 'life-cycle',
            component: _import_('life-cycle/index')
        },
        {
            path: '/global-components',
            name: 'global-components',
            component: _import_('global-components/index')
        }
    ]
})


router.beforeEach((to, from, next) => {
    // Vue.prototype.$showLoading()
    next();
});

router.afterEach((to, from, next) => {
    // Vue.prototype.$hideLoading()
    console.log(to.path);
});

export default router