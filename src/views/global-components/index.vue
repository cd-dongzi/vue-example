<template>
    <div class="global-components">
        <button class="btn-bg-color" @click="showAlert">Alert</button>
        <button class="btn-bg-color" @click="showLoading">Loading</button>
    </div>
</template>
<script>
export default {
    methods: {
        showAlert () {
            this.$alert({
                container: '.global-components',
                content: 'aaa'
            }).then( () => {
                alert('确定')
            }).catch( () => {
                alert('取消')
            })
        },
        showLoading () {
            this.$showLoading()
        
            setTimeout( () => {
                this.$hideLoading()
            }, 2000);
        }
    }
}
</script>
<style lang="less" scoped>
    .global-components {
        text-align: center;
    }
    button {
        padding: 10px 40px;
        color: #fff;
        border-radius: 5px;
        outline: none;
        border: none;
    }
</style>



