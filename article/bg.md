1. ### 解决css背景图片打包路径错误的问题
    
    1. 在utils.js 文件中 找到 generateLoaders 方法

    2. 把以下代码进行更换
        ```
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
            }
        ```
    3. 图
    4. 然后你在打包试试!


