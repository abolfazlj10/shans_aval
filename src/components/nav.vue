<script>
export default{
    data(){
        return{
            isLogin:false,
            tooltip:false
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
        },
        async logOut(){
            const url = this.url + '/logout'
            const req = await fetch(url,{
                credentials:'include'
            })
            const res = await req.json()
            if(res.succes){
                this.isLogin = false
            }
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
        <div v-if="isLogin.status" class="btnDashboard" @mouseenter="tooltip = true" @mouseleave="tooltip = false">
            <div class="dashboard group">
                <div class="text-lg">{{ isLogin.data.username }}</div>
                <i class="ri-account-circle-line text-2xl duration-75 group-hover:scale-105 max-sm:text-[18px]"></i>
            </div>
            <div v-if="tooltip" class="absolute -bottom-[92px] -right-3 max-sm:right-2 text-white px-3 flex flex-col items-center">
                <svg width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 8L16.5 8L9.91421 1.41421C9.13317 0.633164 7.86684 0.633164 7.08579 1.41421L0.5 8Z" class="fill-black/50"/>
                </svg>
                <div class="bg-black/50 backdrop-blur-lg space-y-2 px-2 py-3 rounded-md text-sm">
                    <router-link to="/dashboard" class="itemTooltip">
                        <div>داشبورد</div>
                        <div><i class="ri-dashboard-line"></i></div>
                    </router-link>
                    <div class="w-full h-[1px] bg-white/30"></div>
                    <div @click="logOut" class="itemTooltip text-red-500 cursor-pointer">
                        <div>خروج</div>
                        <div><i class="ri-logout-box-line"></i></div>
                    </div>
                </div>
            </div>
        </div>
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
    @apply flex items-center gap-4 text-center bg-white text-brand border border-brand rounded-md py-[6px] px-6 duration-75 hover:bg-brand hover:text-white relative cursor-pointer;
}
.btnDashboard{
    @apply flex-row mr-auto relative max-md:order-2 max-sm:text-xs max-sm:px-6 max-sm:py-1 ;
}
.linkItem{
    @apply flex flex-col-reverse gap-[1px];
}
.borderbottom{
    @apply bg-brand w-0 h-[1px] rounded-2xl duration-100 group-hover:w-full;
}
.itemTooltip{
    @apply flex gap-5 w-24 justify-between mx-3;
}
</style>