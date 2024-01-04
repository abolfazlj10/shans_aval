<script>
import Nav from '../components/nav.vue'
export default{
    data(){
        return{
            id: this.$route.params.id,
            lottery:null
        }
    },
    methods:{
        async getData(){
            const url = this.url + '/Lottery/'+this.id
            const req = await fetch(url)
            const res = await req.json()
            if(!res.succes){
                alert('خطا') 
                console.log(res.status)
            }else{
                this.lottery = res.data
            }
        }
    },
    created(){
        this.getData()
    },
    components:{Nav}
}
</script>
<template>
    <Nav/>
    {{ lottery }}
</template>
<style scoped>

</style>