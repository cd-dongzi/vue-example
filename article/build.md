### 打包事项
    1. 在config 文件下的 index.js 中 修改以下属性 (如果你想在本地打包能看到页面效果, 此步骤不要忘记哦)
        ``` assetsPublicPath: '/' ```
        更改成
        ``` assetsPublicPath: './' ```

    2. 在构建生产环境版本时是否开启source map
        ``` productionSourceMap: true ``` 
        当把这个设置 置为 false 时,  文件体积会变得很小 (http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)