<script>
import { inject } from 'vue'
import fream from './fream.vue'
export default{
    setup(){
        let isAlert = inject('isAlert')
        return{isAlert}
    },
    data(){
        return{
            seePass:true,
            isShow:false,
            username:null,
            email:null,
            password:null
        }
    },
    methods:{
        focusPass (){
            this.$refs.pass.focus()
        },
        async register(){
            const data = {
                username:this.username,
                email:this.email,
                password:this.password
            }
            const url = this.url + '/register'
            const req = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'applciation/json',
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
            else if(res.status === 'rename username'){
                this.$refs.username.focus()
                this.username = null
                this.isAlert(true,{
                    icon:'error',
                    title:'نام کاربری مشابه',
                    description:'این نام کاربری از قبل وجود داشته است لطفا نام دیگری را وارد کنید.'
                })
            }else if(res.status === 'rename email'){
                this.$refs.username.focus()
                this.username = null
                this.isAlert(true,{
                    icon:'error',
                    title:'ایمیل مشابه',
                    description:'این ایمیل از قبل وجود داشته است لطفا ایمیل دیگری را وارد کنید.'
                })
            }else{
                this.username = null
                this.email = null
                this.password = null
                this.isAlert(true,{
                    icon:'succes',
                    title:'ثبت نام موفقیت آمیز',
                    description:'حساب کاربری شما با موفقیت در شانس اول ایجاد شد.'
                })
                this.$router.push('/')
            }
        }
    },
    mounted(){
        this.isShow = true
    },
    components:{fream}
}
</script>
<template>
    <fream v-slot="propsParent">
        {{ !isShow ? propsParent.changer(4) : null }}
        <div class="text-2xl">ثبت نام</div>
        <form @submit.prevent="register" class="w-full flex flex-col gap-5">
            <div class="inputs group">
                <i class="ri-user-line iconInput"></i>
                <input required v-model="username" name="username" @focus="propsParent.changer(5)" ref="username" type="text" placeholder="نام کاربری" class="inputStyle">
            </div>
            <div class="inputs group">
                <i class="ri-mail-line iconInput"></i>
                <input required v-model="email" name="email" @focus="propsParent.changer(1)" type="email" placeholder="ایمیل" class="inputStyle">
            </div>
            <div class="inputs group">
                <i class="ri-lock-2-line iconInput"></i>
                <input required v-model="password" name="password" @focus="propsParent.changer(2)" minlength="8" ref="pass" :type="seePass ? 'password' : 'text'" placeholder="رمز" class="inputStyle">
                <i v-if="!seePass" @click="seePass = true;focusPass()" class="ri-eye-line cursor-pointer iconInput"></i>
                <i v-else @click="seePass = false;focusPass()" class="ri-eye-off-line cursor-pointer iconInput"></i>
            </div>
            <button class="loginBtn">ارسال</button>
        </form>
        <div class="w-full flex flex-col gap-5">
            <div class="w-full flex items-center gap-3 px-10">
                <div class="w-5 h-[1px] bg-brd/50 flex-grow"></div>
                <div class="text-gray-500">یا</div>
                <div class="w-5 h-[1px] bg-brd/50 flex-grow"></div>
            </div>
            <div class="createAccount"><router-link to="/login">قبلا حساب کاربری داشتید؟</router-link></div>
            <router-link to="/login"><div class="registerBtn loginBtn">ورود</div></router-link>
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