<template>
    <div class="babel-polyfill">
        <h4>控制台有打印</h4>
        <ul>
            <li v-for="v in list">{{v}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            list: []
        }
    },
    mounted () {
        this.test()
    },
    methods: {
        async test () {
            try {
                
                console.log('start')
                this.list.push('start')
                var data = await this.data(2000);
                // var errData = await this.errData(2000);
            }catch (err) {
                console.log('进来错误通道了')
                this.list.push('进来错误通道了')
                console.log(err)
            }
            console.log('end')
        },
        data (time) {
            return new Promise( (resolve, reject) => {
                setTimeout( () => {
                    console.log('执行正确')
                    this.list.push('执行正确')
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

