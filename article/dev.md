### 本地开发解决跨域请求的问题
    1. 在 config 文件下的 index.js 文件中修改以下代码
        ``` proxyTable: {} ```
        更换成
        ``` 
            '/api': {
                target: 'http://www.mytest.com/login', //这里放需要请求的接口
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        ```
    可以发起多个代理 (如下):
        ```
            '/api': {
                target: 'http://www.mytest.com/login', //这里放需要请求的IP或域名
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/a': {
                target: 'http://www.test.com/list', //这里放需要请求的IP或域名
                changeOrigin: true,
                pathRewrite: {
                    '^/a': ''
                }
            }

        ```

    2. babel-polyfill 让ie上使用新语法的内置对象
    在webpack.base.conf.js 中做以下修改
    ```
        module.exports = {
            entry: {
              app: ['babel-polyfill', './src/main.js']
            },
            ......
        }
        
    ```
    > 图



    3.前台拦截器
        一般在我们请求后台数据时,都会在请求过程中执行动画, 和统一管理请求错误,验证TOKEN 等等的情况;
        当你使用 axios 做请求时,  你可以做如下设置来解决以上问题
        ```
            
            import axios from 'axios'
            import qs from 'qs'  //  直接post请求后台取不到参数,(http://www.jianshu.com/p/042632dec9fb)

            // 发起请求时,会执行该方法
            axios.interceptors.request.use(config => {
                //你可以在这里开始加载动画,  查询token  等等之类
                return config
            }, err => {
                return Promise.reject(err)
            })

            //接收到后台的数据时执行的方法
            axios.interceptors.response.use(response => response, err => Promise.resolve(err.response))


            //检查状态码 status
            function checkStatus(res) {
                if (res.status === 200 || res.status === 304) { //当状态正常是返回原样的数据
                    return res
                }
                return {  // 状态不正常时可以返回自己自定义的一些格式或者状态什么的
                    ....
                }
            }

            //检查后台的code 值
            function checkCode(res) {
                if (res.data.code === 0) {  //code值前后台协商定义的代表什么意思
                    alert('出错了')
                }
                return res
            }


            export default {
                get(url, params) {  //返回封装后的 get 方法
                    if (!url) return
                    return axios({
                        method: 'get',
                        url,
                        params,
                        timeout: 30000
                    }).then(checkStatus).then(checkCode)
                },
                post(url, data) { //返回封装后的 post 方法
                    if (!url) return
                    return axios({
                        method: 'post',
                        url,
                        data: qs.stringify(data),
                        timeout: 30000
                    }).then(checkStatus).then(checkCode)
                }
            }


        ```


###  检测数组更新, 却无法渲染问题 (http://www.cnblogs.com/zhuzhenwei918/p/6893496.html)
    Vue.set(object, key, value)



### 路由懒加载
    ```
        export default new Router({
            routes: [
                {
                    path: '/',
                    name: 'Hello',
                    component: (resolve) => {  //这里加载了 记得上面就不需要在import 这个组件了
                        require(['../components/HelloWorld'], resolve)
                    }
                }
            ]
        })
        

    ```
### vue-router  钩子函数
    ```
        //全局钩子函数
        const router = new VueRouter({ ... })

        to: 即将要进入的目标 [路由对象]
        from: 当前导航正要离开的路由
        next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是confirmed （确认的）。
        next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from
        next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航

        router.beforeEach((to, from, next) => {
            // do something  可以检测用户是否登录啥的
            next();
        });

        router.afterEach((to, from, next) => {
            console.log(to.path);
        });



        //组件内的钩子
        beforeRouteEnter (to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 相对于组件来说的，而且应该是在路由进入之前开始准备的 所以beforeRouteEnter是调用ajax的时机
            // 不能获取组件实例 `this`
            // 因为当钩子执行前，组件实例还没被创建

            next();
        },

        beforeRouteLeave (to, from, next) {
            //在组件的生命周期完成后，且旧路由即将切换走，新路由beforeEach的时机执行
        }


    ```