<script>
import { inject } from 'vue';

export default{
    props:["data"],
    data(){
        return{
            btnOne:'ادامه',
            btnTwo:'برگشت'
        }
    },
    setup(){
        let isAlert = inject('isAlert')
        return{isAlert}
    },
    mounted(){
        this.$refs.btnOne.focus()
    },
}
</script>
<template>
    <div class="boardModal">
        <div class="Modal">
            <div class="bg-[#D6D6D6] w-10 h-1 rounded-full"></div>
            <div class="text-red flex flex-col text-[45px]">
                <i v-if="data.icon == 'succes'" class="ri-shield-check-fill text-[#148582]"></i>
                <i v-else-if="data.icon == 'error'" class="ri-error-warning-fill text-[#ff0e0e]"></i>
                <i v-else-if="data.icon == 'sendMail'" class="ri-mail-send-line text-brand"></i>
                <i v-else class="ri-alarm-warning-fill text-[#FFCC00]"></i>
            </div>
            <div class="text-[#181818] text-3xl max-[800px]:text-2xl">{{ data.title }}</div>
            <div class="text-[#5E5E5E] text-lg text-center">{{ data.description }}</div>
            <div class="flex gap-3 w-full">
                <button ref="btnOne" class="btn bg-[#0046b3ed] hover:bg-[#0046B3] text-white" @click="isAlert(false)">{{ btnOne }}</button>
                <!-- <button class="btn bg-[#D6D6D6]" @click="isAlert(false)">{{ btnTwo }}</button> -->
            </div>
            <div class="bg-[#181818] w-32 h-1 rounded-full"></div>
        </div>
    </div>
</template>
<style scoped>
.boardModal{
    @apply fixed h-screen w-screen flex justify-center items-center backdrop-blur-sm z-50 max-[600px]:items-end;
}
.Modal{
    @apply w-[500px] bg-white rounded-[46px] px-7 py-2 shadow-sm flex flex-col gap-8 items-center ring-1 max-[1600px]:w-[450px] max-[1600px]:gap-6 max-[550px]:w-full max-[550px]:rounded-none max-[550px]:rounded-t-[46px];
}
.btn{
    @apply border flex-1 p-4 text-xl rounded-3xl duration-75 focus:outline-none;
}
</style>