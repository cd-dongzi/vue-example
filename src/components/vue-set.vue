<template>
    <div class="vue-set">
        <small>页面的数据变化和控制台的打印信息一起观看</small>
        <div class="btn-item">
            <span>更改数组第三个元素的name属性：</span>
            <button @click="changeChild">change</button>
        </div>

        <div class="btn-item">
            <span>更改数组第二个的元素：</span>
            <button @click="changeEle">change</button>
        </div>

        <div class="btn-item">
            <span>引用vue的$set方法更改数组第二个的元素：</span>
            <button @click="setChangeEle">change</button>
        </div>

        <ul>
            <li v-for="v in list">
                <span>{{v.name}}</span><br/>
                <span>{{v.age}}</span><hr/>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            list: [
                {name: '陈冬', age: 23},
                {name: '陈西', age: 24},
                {name: '陈北', age: 25},
                {name: '陈南', age: 26}
            ]
        }
    },
    methods: {
        changeChild () {
            this.list[2].name = "第三个元素的name属性改变了";
            console.log(this.list)
        },
        changeEle () {
            this.list[1] = {name: '第二个被更改了', age: 100};
            console.log(this.list)
        },
        setChangeEle () {
            this.$set(this.list, 1, {name: '第二个被更改了', age: 100})
        }
    }
}
</script>

<style lang="less" scoped>
    .vue-set {
        text-align: center;

        .btn-item {
            margin: 10px 0;
        }
        span {
            color: @theme-color;
        }
        button {
            padding: 5px 20px;
            color: #fff;
            border-radius: 5px;
            outline: none;
            border: none;
            background: linear-gradient(left , rgba(186,164,119,0.99),#c1866a 100%);
        }

        ul {
            margin-top: 40px;
        }
    }
    
</style>


