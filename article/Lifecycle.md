### 生命周期
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