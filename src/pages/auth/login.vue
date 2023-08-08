<script>
import { inject } from 'vue'
import fream from './fream.vue'
export default{
    setup(){
        let isAlert = inject('isAlert')
        return{
            isAlert
        }
    },
    data(){
        return{
            seePass:true,
            username:null,
            password:null
        }
    },
    methods:{
        focusPass (){
            this.$refs.pass.focus()
        },
        async login(){
            const data = {
                username:this.username,
                password:this.password
            }
            const url = this.url + '/login'
            const req = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'applciation/json'
                },
                credentials:'include',
                body:JSON.stringify(data)
            })
            const res = await req.json()
            if(!res.succes)
                this.isAlert(true,{
                    icon:'error',
                    title:'تلاش ناموفق',
                    description:'خطا'
                })
            else if(res.status === 'notfound'){
                this.isAlert(true,{
                    icon:'error',
                    title:'تلاش ناموفق',
                    description:'حساب کاربری با این نام کاربری وجود ندارد.'
                })
                this.$refs.username.focus()
                this.username = null
            }else if(res.status === 'verify'){
                this.username = null
                this.password = null
                this.isAlert(true,{
                    icon:'succes',
                    title:'ورود موفقیت آمیز',
                    description:'ورود شما با موفقیت به شانس اول تایید شد.'
                })
                this.$router.push('/')
            }else if(res.status === 'invalid'){
                this.password = null
                this.$refs.pass.focus()
                this.isAlert(true,{
                    icon:'error',
                    title:'تلاش ناموفق',
                    description:'رمز شما معتبر نیست دوباره تلاش کنید'
                })
            }
        },
    },
    components:{fream}
}
</script>
<template>
    <fream v-slot="propsParent">
        <div class="flex-grow flex items-center text-2xl">ورود</div>
        <form @submit.prevent="login" class="flex-grow justify-center w-full flex flex-col gap-5">
            <div class="inputs group">
                <i class="ri-user-line iconInput"></i>
                <input required v-model="username" name="username" ref="username" @focus="propsParent.changer(5)" type="text" placeholder="نام کاربری" class="inputStyle">
            </div>
            <div class="inputs group">
                <i class="ri-lock-2-line iconInput"></i>
                <input required v-model="password" name="password" @focus="propsParent.changer(2)" minlength="8" ref="pass" :type="seePass ? 'password' : 'text'" placeholder="رمز" class="inputStyle">
                <i v-if="seePass" @click="seePass = false;focusPass()" class="ri-eye-line cursor-pointer iconInput"></i>
                <i v-else @click="seePass = true;focusPass()" class="ri-eye-off-line cursor-pointer iconInput"></i>
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
    @apply max-[1083px]:py-1 max-[1083px]:px-3;
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