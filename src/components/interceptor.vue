<template>
    <div class="interceptor">

    </div>
</template>
<script>
export default {
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            this.http.get('/api/url', {})
                .then( res => {
                    console.log(res)
                })
        }
    }
}
</script>
