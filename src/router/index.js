import Vue from 'vue'
import Router from 'vue-router'
import _import_ from './_import_'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: (resolve) => {
                require(['../components/index'], resolve)
            }
        },
        {
            path: '/css-bg-build',
            name: 'css-bg-build',
            component: _import_('css-bg-build')
        },
        {
            path: '/less-vars',
            name: 'less-vars',
            component: _import_('less-vars')
        },
        {
            path: '/proxy',
            name: 'proxy',
            component: _import_('proxy')
        },
        {
            path: '/babel-polyfill',
            name: 'babel-polyfill',
            component: _import_('babel-polyfill')
        },
        {
            path: '/interceptor',
            name: 'interceptor',
            component: _import_('interceptor')
        },
        {
            path: '/vue-set',
            name: 'vue-set',
            component: _import_('vue-set')
        },
        {
            path: '/life-cycle',
            name: 'life-cycle',
            component: _import_('life-cycle')
        }
    ]
})