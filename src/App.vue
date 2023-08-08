<script>
import { RouterView } from 'vue-router'
import alert from './components/alert.vue';
import { provide, ref } from 'vue';
export default{
  setup(){
    let alertStatus = ref(false)
    let data = ref({})
    function isAlert (status,objData){
      alertStatus.value = status
      if(objData){
        data.value = objData
      }
    }
    provide('isAlert',isAlert)
    return{
      alertStatus,data
    }
  },
  components:{alert}
}
</script>
<template>
  <transition name="slide-fade" apper mode="out-in">
    <alert v-if="alertStatus" :data="data"/>
  </transition>
  <RouterView />
</template>
<style>
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
</style>