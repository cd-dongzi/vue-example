<template>
    <div class="babel-polyfill">
        <h1>请看控制台</h1>
    </div>
</template>

<script>
export default {
    mounted () {
        this.test()
    },
    methods: {
        async test () {
            try {
                console.log('start')
                var data = await this.data(2000);
                var errData = await this.errData(2000);
            }catch (err) {
                console.log('进来错误通道了')
                console.log(err)
            }
            console.log('end')
        },
        data (time) {
            return new Promise( (resolve, reject) => {
                setTimeout( () => {
                    console.log('在end之前打印')
                    resolve('YES')
                }, time)
            })
        },
        errData (time) {
            return new Promise( (resolve, reject) => {
                setTimeout( () => {
                    reject('NO')
                }, time)
            })
        }
    }
}
</script>

