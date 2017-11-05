<template>
    <div class="proxy">
        <img :src="info.image" alt="">
        <h3>{{info.title}}</h3>
        <p>{{info.summary}}</p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            info: {}
        }
    },
    created () {
        this.http.get('/api/v2/book/1220562')
            .then( res => {
                console.log(res)
                this.info = res.data
            })
        
    }
}
</script>

