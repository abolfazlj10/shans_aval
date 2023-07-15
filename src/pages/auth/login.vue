<script>
import fream from './fream.vue'
export default{
    data(){
        return{
            seePass:true
        }
    },
    methods:{
        focusPass (){
            this.$refs.pass.focus()
        }
    },
    components:{fream}
}
</script>
<template>
    <fream v-slot="propsParent">
        <div class="flex-grow flex items-center text-2xl">ورود</div>
        <form class="flex-grow justify-center w-full flex flex-col gap-5">
            <div class="inputs group">
                <i class="ri-mail-line iconInput"></i>
                <input required @focus="propsParent.changer(1)" type="email" placeholder="ایمیل" class="inputStyle">
            </div>
            <div class="inputs group">
                <i class="ri-lock-2-line iconInput"></i>
                <input required @focus="propsParent.changer(2)" minlength="8" ref="pass" :type="seePass ? 'password' : 'text'" placeholder="رمز" class="inputStyle">
                <i v-if="!seePass" @click="seePass = true;focusPass()" class="ri-eye-line cursor-pointer iconInput"></i>
                <i v-else @click="seePass = false;focusPass()" class="ri-eye-off-line cursor-pointer iconInput"></i>
            </div>
            <router-link to="/forgot" class="text-xs text-brand text-left cursor-pointer"><div>رمز عبور خود را فراموش کرده اید؟</div></router-link>
            <button class="loginBtn">ورود</button>
        </form>
        <div class="flex-grow justify-center w-full flex flex-col gap-5">
            <div class="w-full flex items-center gap-3 px-10">
                <div class="w-5 h-[1px] bg-brd/50 flex-grow"></div>
                <div class="text-gray-500">یا</div>
                <div class="w-5 h-[1px] bg-brd/50 flex-grow"></div>
            </div>
            <div class="createAccount"><router-link to="/register">حساب کاربری ندارید؟</router-link></div>
            <router-link to="/register"><div class="registerBtn loginBtn">ثبت نام</div></router-link>
        </div>
    </fream>
</template>
<style scoped>
.inputs{
    @apply flex gap-2 border border-brd px-2 py-2 rounded-lg duration-100 focus-within:border-brand;
}
.inputStyle{
    @apply w-10/12 outline-none placeholder:text-sm;
}
.iconInput{
    @apply w-1/12 text-[#828282] text-lg duration-100 group-focus-within:text-brand;
}
.loginBtn{
    @apply bg-brand text-white text-center py-3 rounded-3xl shadow-lg cursor-pointer duration-100 hover:bg-brand/95;
}
.texter{
    @apply flex items-center text-center whitespace-nowrap text-xl space-y-3 overflow-hidden;
    transition: .1s all ease;
}
.registerBtn{
    @apply !bg-white !text-brand border border-brand !duration-100 hover:!bg-brand hover:!text-white;
}
.createAccount{
    @apply text-sm text-center text-gray-500;
}
</style>