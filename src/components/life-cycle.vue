<template>
    <div class="life-cycle">

        <div class="btn-item">
            <span>组件更新：</span>
            <button @click="update">update</button>
        </div>

        <div class="box">
            <ul>
                <li v-for="v in list">执行阶段：{{v}}</li>
            </ul>
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
    
    beforeCreate () {
        console.log('--------------beforeCreate-------------------')
        console.log('在实例创建之后同步调用。此时实例已经结束解析选项，这意味着已建立：数据绑定，计算属性，方法，watcher/事件回调')
        // this.list.push('beforeCreate')
        // console.log(this)
        
    },
    created () {
        console.log('--------------created-------------------')
        console.log('在实例创建完成后被立即调用,挂载阶段还没开始，$el属性目前不可见')
        this.list.push('created');
    },
    beforeMount () {
        console.log('--------------beforeMount-------------------')
        console.log('模板编译挂载之前')
        this.list.push('beforeMount');
    },
    mounted () {
        console.log('--------------mounted-------------------')
        console.log('模板编译挂载之后')
        this.list.push('mounted');
    },
    beforeUpdate () {
        console.log('--------------beforeUpdate-------------------')
        console.log('组件更新之前')
        // this.list.push('beforeUpdate')
    },
    updated () {
        console.log('--------------updated-------------------')
        console.log('组件更新之后')
        // this.list.push('updated')
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
    },



    methods: {
        update () {

        }   
    }

}
</script>

<style lang="less" scoped>
    .life-cycle {
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


