### 一些文件的介绍
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

    更多的文件配置可以参考 URL(vue-cli#2.0 webpack 配置分析 : https://zhuanlan.zhihu.com/p/24322005)