<script>
import {useStore}  from '../store';
import navbar from '../components/nav.vue';
import getStarted from '../components/header.vue';
export default{
    setup(){
        const store = useStore()
        console.log(store.esmesh);
    },
    components:{navbar,getStarted},
}
</script>
<template>
    <navbar/>
    <getStarted/>
</template>