<template>
    <div class="wrapper">
        <h1>Vue 实例测试</h1>
        <ul>
            <router-link tag="li" to="/css-bg-build">css背景图片打包路径错误的问题</router-link>
            <router-link tag="li" to="/less-vars">Vue引入全局less变量</router-link>
            <router-link tag="li" to="/proxy">本地开发解决跨域请求的问题</router-link>
            <router-link tag="li" to="/babel-polyfill">babel-polyfill</router-link>
            <router-link tag="li" to="/interceptor">前台拦截器</router-link>
            <router-link tag="li" to="/vue-set">Vue数组更新, 却无法渲染问题</router-link>
            <router-link tag="li" to="/life-cycle">生命周期的钩子函数</router-link>
        </ul>
    </div>
</template>

<style lang="less" scoped>
    .wrapper {
        text-align: center;
    }
    li {
        margin: 20px 0;
        color: @vice-color;
        cursor: pointer;
        
        &:hover {
            color: @theme-color;
        }
    }
</style>

