
> Demonstration

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### 1. 解决css背景图片打包路径错误的问题
    
1. 在utils.js 文件中 找到 generateLoaders 方法

2. 把以下代码进行更换
3. ```  
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    ```
    更换成

    ```
    
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader',
                publicPath: '../../'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }```
3. 图
4. 打包就可以看到效果咯! 


### 2. Vue引入全局less变量
1. 用vue-cli初始化 一个vue项目
2. 再build文件夹下创建一个globalLessVars.js文件
3. 在globalLessVars.js文件中 放入如下代码
    
    ```
    
        const fs = require('fs');
        module.exports = function getLessVariables(file) {
            var themeContent = fs.readFileSync(file, 'utf-8')
            var variables = {}
            themeContent.split('\n').forEach(function(item) {
                if (item.indexOf('//') > -1 || item.indexOf('/*') > -1) {
                    return
                }
                var _pair = item.split(':')
                if (_pair.length < 2) return;
                var key = _pair[0].replace('\r', '').replace('@', '')
                if (!key) return;
                var value = _pair[1].replace(';', '').replace('\r', '').replace(/^\s+|\s+$/g, '')
                variables[key] = value
            })
            return variables
        }
    ```
    图

4. 在utils.js 引入 globalLessVars.js文件
    
    ```
    const globalLessVars = require('./globalLessVars');

    ```

5. 在static文件中创建 color.less 文件
6. 在 color.less 文件中 放入如下代码
    
    ```
        @theme-color: #c1866a;
        @vice-color: rgba(186,164,119,0.99);
        @blue-color: #2e90fe;

    ```
7. 在util.js文件中如下解析 color.less 文件
    
    ```
        const colorsLess = globalLessVars(path.join(__dirname, '../static/color.less'));
    ```
    图

8. 再把util.js 文件中 cssLoaders方法中返回值改成以下代码
    
    ```
        return {
            css: generateLoaders(),
            postcss: generateLoaders(),
            less: generateLoaders('less', {
                globalVars: colorsLess
            }),
            sass: generateLoaders('sass', { indentedSyntax: true }),
            scss: generateLoaders('sass'),
            stylus: generateLoaders('stylus'),
            styl: generateLoaders('stylus')
        }
    ```
    
    >大功告成
    
    >图
    
9. 引用多个文件的话  就这可以这样
    
    ``` 
        const colorsLess = getLessVariables(path.join(__dirname, '../static/color.less'));
        const stylesLess = getLessVariables(path.join(__dirname, '../static/style.less'));
        const allLess = Object.assign(colorsLess, stylesLess);
        
        less: generateLoaders('less', {
             globalVars: allLess
        })
    ```

### 3. 去除vue项目中的 # --- History模式
    
> 图

>  如果后台没给前端的 history 模式 匹配路径的话， history 只适合在本地开发使用， 打包记得改回 hash 模式
    
    
### 4. 自定义路径名
    
``` import HelloWorld from '@/components/HelloWorld' ```

1. 制定像 @ 这样的自定义名称
2. 可以前往 webpack.base.conf.js 中如下设置:
3. 
>图
    
    
### 5. 不符合规范导致eslint代码检测工具
>图
> 如果出现类似以上的错误 , 前往 build 文件下 webpack.base.conf.js  中注释调 eslint-loader  这个loader  就行了
>图
>如果你不想使用eslint 代码检测 你可以在用vue-cli直接在创建vue项目的时候就选择不生成代码检测这个eslint-loader
>图
        
        
        
### 6. 本地开发解决跨域请求的问题
1. 在 config 文件下的 index.js 文件中修改以下代码

    ``` proxyTable: {} ```
    
    设置成
    
    ``` 
        proxyTable: {
            '/api': {
                target: 'http://www.mytest.com', //这里放需要请求的接口
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        } 
        
        //  请求接口的时候 http://www.mytest.com/login  可以写成  /api/login
    ```
可以发起多个代理 (如下):

    ```
        proxyTable: {
            '/api': {
                target: 'http://www.mytest.com', 
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/a': {
                target: 'http://www.test.com', 
                changeOrigin: true,
                pathRewrite: {
                    '^/a': ''
                }
            }
        }
    ```
    
    
    

### 7. babel-polyfill 让ie上使用新语法的内置对象和API

 1. npm i babel-polyfill --save 下载 babel-polyfill 模块
 2. 在webpack.base.conf.js 中做以下修改
    
```
    module.exports = {
        entry: {
          app: ['babel-polyfill', './src/main.js']
        },
        ......
    }
    
```
> 图
     
     
     
     
### 8. 前台拦截器
一般在我们请求后台数据时,都会在请求过程中执行动画, 和统一管理请求错误,验证TOKEN 等等的情况;
当你使用 axios 做请求时,  你可以做如下设置来解决以上问题

1. npm i axios qs --save 来下载这两个模块
2. 创建fetch.js 文件，内容如下：

```
    
    import axios from 'axios'
    import qs from 'qs'  // 直接post请求后台取不到参数,()

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
        if (res.data.code === 0) {  //code值错误时
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
                timeout: 10000
            }).then(checkStatus).then(checkCode)
        },
        post(url, data) { //返回封装后的 post 方法
            if (!url) return
            return axios({
                method: 'post',
                url,
                data: qs.stringify(data),
                timeout: 10000
            }).then(checkStatus).then(checkCode)
        }
    }
```


    ```   
        在main.js中引入封装后的axios  
        import http from './utils/fetch'
        
        Vue.prototype.http = http;
    ```


>post请求直接放参数， 为何后台接收不到前端的参数 [axios发送post请求，springMVC接收不到数据问题](http://www.jianshu.com/p/042632dec9fb)
        
        
        
        
### 9. Vue数组更新, 却无法渲染问题
 具体可以参考这里 [变化检测问题（数组相关）](http://www.cnblogs.com/zhuzhenwei918/p/6893496.html)
 
 然后我demo可以在我的github上查看 []()
 
 可以使用Vue.$set(object, key, value)来解决这个问题
 


### 10. 路由懒加载
    
```
    export default new Router({
        routes: [
            {
                path: '/lazy',
                name: 'lazy-loading',
                component: (resolve) => {  //这里加载了 记得上面就不需要在import 这个组件了
                    require(['../components/lazy-loading'], resolve)
                }
            }
        ]
    })
    
```


### 11.生命周期的钩子函数

```
    beforeCreate () {
        console.log('--------------beforeCreate-------------------')
        console.log('在实例创建之后同步调用。此时实例已经结束解析选项，这意味着已建立：数据绑定，计算属性，方法，watcher/事件回')
        console.log('但是还没有开始 DOM 编译，$el 还不存在,但是实例存在')
    },
    created () {
        console.log('--------------created-------------------')
        console.log('在实例创建完成后被立即调用,挂载阶段还没开始，$el属性目前不可见')
    },
    beforeMount () {
        console.log('--------------beforeMount-------------------')
        console.log('模板编译挂载之前')
    },
    mounted () {
        console.log('--------------mounted-------------------')
        console.log('模板编译挂载之后')
    },
    beforeUpdate () {
        console.log('--------------beforeUpdate-------------------')
        console.log('组件更新之前')
    },
    updated () {
        console.log('--------------updated-------------------')
        console.log('组件更新之后')
    },
    activated () {
        console.log('--------------activated-------------------')
        console.log('keep-alive 组件激活时调用')
    },
    deactivated () {
        console.log('--------------deactivated-------------------')
        console.log('keep-alive 组件停用时调用')
    },
    beforeDestroy () {
        console.log('--------------beforeDestroy-------------------')
        console.log('组件销毁之前')
    },
    destroyed () {
        console.log('--------------destroyed-------------------')
        console.log('组件销毁之后')
    }
```



### 12. 路由钩子函数

```
    //全局钩子函数
    const router = new VueRouter({ ... })
    
    router.beforeEach((to, from, next) => {
        // do something  可以检测用户是否登录啥的
        next();
    });

    router.afterEach((to, from, next) => {
        console.log(to.path);
    });


    to: 即将要进入的目标 [路由对象]
    from: 当前导航正要离开的路由
    next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是confirmed （确认的）。
    next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from
    next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航

   


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


### 13. 打包事项

1. 在config 文件下的 index.js 中 修改以下属性 (如果你想在本地打包能看到页面效果, 此步骤不要忘记哦)
2. 
    ``` assetsPublicPath: '/' ```
    更改成
    ``` assetsPublicPath: './' ```

2. 在构建生产环境版本时是否开启source map
    ``` productionSourceMap: true ``` 
    当把这个设置 置为 false 时,  文件体积会变得很小 [JavaScript Source Map 详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
    
    
    
### 14. 简单文件介绍
```
    .babelrc

    {   
        // 此项指明，转码的规则
        "presets": [
            // env项是借助插件babel-preset-env，下面这个配置说的是babel对es6,es7,es8进行转码，并且设置amd,commonjs这样的模块化文件，不进行转码
            ["env", {
                "modules": false,
                "targets": {
                    "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                }
            }],
            // 下面这个是不同阶段出现的es语法，包含不同的转码插件
            "stage-2"
        ],

        // 下面这个选项是引用插件来处理代码的转换，transform-runtime用来处理全局函数和优化babel编译
        "plugins": ["transform-runtime"],

        // 下面这段是在特定的环境中所执行的转码规则，当环境变量是下面的test就会覆盖上面的设置
        "env": {

            // test 是提前设置的环境变量，如果没有设置BABEL_ENV则使用NODE_ENV，如果都没有设置默认就是development
            "test": {
                "presets": ["env", "stage-2"],

                // instanbul是一个用来测试转码后代码的工具
                "plugins": ["istanbul"]  
            }
        }
    }

```


```
    .editorconfig

    charset = utf-8  //编码
    indent_style = space //缩进风格,基于空格做缩进
    indent_size = 2   //缩进大小是2格
    end_of_line = lf   //换行符的风格
    insert_final_newline = true  //当你创建一个文件，会自动在文件末尾插入新行
    trim_trailing_whitespace = true  //自动移除行尾多余空格
```

```
    package.json


      "name": "example",
      "version": "1.0.0",
      "description": "A Vue.js project",
      "author": "",
      "private": true,
      "scripts": {  
        // 例: "dev": "node build/dev-server.js"
        // "dev"就相当于需要在命令行执行 npm run dev    所有我们执行的npm run dev 相当于执行了 "node build/dev-server.js"
        // 基本所有脚本命令 都需要 加上前缀 npm run ...  ,但是 "start" 这个脚本命令只需要执行 npm start 就行,  不需要中间的 run;

        "dev": "node build/dev-server.js",
        "start": "npm run dev",
        "build": "node build/build.js"
      },
      "dependencies": {  //  生产环境所需要的依赖
        "vue": "^2.5.2",
        "vue-router": "^3.0.1"
        ......
      },
      "devDependencies": {  // 开发环境所需要的依赖
        "autoprefixer": "^7.1.2",
        "babel-core": "^6.22.1",
        .......
      },
      "engines": {
        "node": ">= 4.0.0",
        "npm": ">= 3.0.0"
      },
      "browserslist": [
        "> 1%",
        "last 2 versions",
        "not ie <= 8"
      ]
    }

```

更多的文件配置可以参考 [vue-cli#2.0 webpack 配置分析](https://zhuanlan.zhihu.com/p/24322005)









   
