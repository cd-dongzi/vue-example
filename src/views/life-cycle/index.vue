<template>
    <div class="life-cycle">

        <div class="box">
            <ul>
                <li v-for="v in list">执行阶段：{{v}}</li>
            </ul>
        </div>
        <hr>
        <div class="btn-item">
            <span>组件更新：</span>
            <button class="btn-bg-color" @click="update">update</button>
        </div>
        <div class="text">{{updateText}}</div>

        <hr>
        <div class="btn-item">
            <span>实例销毁：</span>
            <button class="btn-bg-color" @click="destroy">destroy</button>
        </div>
        <div class="text">{{destroyText}}</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            list: [],
            updateText: '组件未更新',
            destroyText: '实例未销毁'
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
        this.list.push('created: ' + new Date().getTime());
    },
    beforeMount () {
        console.log('--------------beforeMount-------------------')
        console.log('模板编译挂载之前')
        this.list.push('beforeMount: ' + new Date().getTime());
    },
    mounted () {
        console.log('--------------mounted-------------------')
        console.log('模板编译挂载之后')
        this.list.push('mounted: ' + new Date().getTime());
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
        this.list.push('activated: ' + new Date().getTime())
    },
    deactivated () {
        console.log('--------------deactivated-------------------')
        console.log('keep-alive 组件停用时调用')
        this.list.push('deactivated: ' + new Date().getTime())
    },
    beforeDestroy () {
        console.log('--------------beforeDestroy-------------------')
        console.log('实例销毁之前')
    },
    destroyed () {
        console.log('--------------destroyed-------------------')
        console.log('实例销毁之后')
    },



    methods: {
        update () {
            this.updateText = '组件更新，调用了钩子函数'
        },
        destroy () {
            this.destroyText = '实例已销毁'
            setTimeout( () => {
                this.$destroy();
            }, 100);
        }   
    }

}
</script>

<style lang="less" scoped>
    .life-cycle {
        text-align: center;

        hr {
            margin: 20px 0;
        }

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
        }

        ul {
            margin-top: 40px;
        }
    }
</style>


