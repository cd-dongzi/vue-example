<template>
    <div class="interceptor">
        <button class="btn-bg-color" @click="getData">请求数据</button>
        <ul v-if="list.length > 0">
            <li v-for="v in list">
                <div class="name">name: {{v.name}}</div>
                <div class="age">age: {{v.age}}</div>
                <div class="sex">sex: {{v.sex == 0 ? '女':'男'}}</div>
                <hr>
            </li>
        </ul>
        <div v-else>
            请求数据的时候前台拦截器做加载动画的处理
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            list: []
        }
    },
    methods: {
        getData () {
            this.http.get('http://www.test.com', {})
                .then( res => {
                    console.log(res)
                    this.list = res.data.list;
                })
        }
    }
}
</script>
<style lang="less" scoped>
    button {
        width: 120px;
        height: 40px;
        border: none;
        color: #fff;
        border-radius: 5px;
        text-align: center;
        line-height: 40px;
        margin-bottom: 40px;
    }
</style>

