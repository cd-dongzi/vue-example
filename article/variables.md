## Vue

##### 1. Vue引入全局变量
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
7. 在util.js文件中如下引入 color.less 文件
    ```
        const colorsLess = globalLessVars(path.join(__dirname, '../static/color.less'));
    ```
8. 再把cssLoaders方法中返回值改成以下代码
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
9. 引用多个文件的话  就这可以这样
    ``` 
        const colorsLess = getLessVariables(path.join(__dirname, '../static/color.less'));
        const stylesLess = getLessVariables(path.join(__dirname, '../static/style.less'));

        const allLess = Object.assign(colorsLess, stylesLess);

    ```