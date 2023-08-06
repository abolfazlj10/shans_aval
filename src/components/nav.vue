<script>
export default{
    data(){
        return{
            isLogin:false
        }
    },
    methods:{
        async auth(){
            const url = this.url + '/auth'
            const req = await fetch(url,{
                credentials:'include'
            })
            const res = await req.json()
            this.isLogin = res
        }
    },
    created(){
        this.auth()
    }
}
</script>
<template>
    <div class="nav">
        <div class="title"><router-link to="/">شانس اول</router-link></div>
        <div class="linkNav">
            <div class="linkItem group">
                <div class="borderbottom"></div>
                <router-link to="/">ایجاد</router-link>
            </div>
            <div class="linkItem group">
                <div class="borderbottom"></div>
                <router-link to="/">قرعه کشی ها</router-link>
            </div>
            <div class="linkItem group">
                <div class="borderbottom"></div>
                <a href="https://github.com/abolfazlj10/shans_aval">گیت هاب</a>
            </div>
            <div class="linkItem group">
                <div class="borderbottom"></div>
                <router-link to="/">درباره ما</router-link>
            </div>
        </div>
        <router-link v-if="isLogin.status" to="/dashboard" class="dashboard group">
            <div class="text-lg">{{ isLogin.data.username }}</div>
            <i class="ri-account-circle-line text-2xl duration-75 group-hover:scale-105 max-sm:text-[18px]"></i>
        </router-link>
        <router-link v-else to="/login" class="login group">
            <div>ورود</div>
            <i class="ri-login-box-line text-xl duration-75 group-hover:scale-105 max-sm:text-[18px]"></i>
        </router-link>
    </div>
</template>
<style scoped>
.nav{
    @apply container flex items-center gap-7 py-2 border-b max-md:flex-wrap max-sm:px-7 ;
}
.title{
    @apply text-2xl text-brand max-md:order-1 max-md:border-b max-md:border-brand max-md:py-2 max-sm:text-xl;
}
.linkNav{
    @apply flex gap-12 max-md:w-full max-md:order-3 max-md:justify-center max-[400px]:gap-7 max-[332px]:gap-3 text-sm max-sm:text-xs;
}
.login{
    @apply flex flex-row-reverse items-center gap-4 mr-auto text-center bg-brand rounded-md text-white py-2 px-8 max-md:order-2 max-sm:text-xs max-sm:px-6 max-sm:py-1;
}
.dashboard{
    @apply flex flex-row items-center gap-4 mr-auto text-center bg-white text-brand border border-brand rounded-md py-[6px] px-6 duration-75 hover:bg-brand hover:text-white max-md:order-2 max-sm:text-xs max-sm:px-6 max-sm:py-1;
}
.linkItem{
    @apply flex flex-col-reverse gap-[1px];
}
.borderbottom{
    @apply bg-brand w-0 h-[1px] rounded-2xl duration-100 group-hover:w-full;
}
</style>