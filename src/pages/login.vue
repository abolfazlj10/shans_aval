<script>
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
    }
}
</script>
<template>
    <div class="h-screen flex">
        <div class="containerLogin">
            <div class="form">
                <div class="text-2xl">سللام کاربر عزیز</div>
                <form class="w-full space-y-5">
                    <div class="inputs group">
                        <i class="ri-mail-line iconInput"></i>
                        <input type="email" placeholder="ایمیل" class="inputStyle">
                    </div>
                    <div class="inputs group">
                        <i class="ri-lock-2-line iconInput"></i>
                        <input ref="pass" :type="seePass ? 'password' : 'text'" placeholder="رمز" class="inputStyle">
                        <i v-if="!seePass" @click="seePass = true;focusPass()" class="ri-eye-line cursor-pointer iconInput"></i>
                        <i v-else @click="seePass = false;focusPass()" class="ri-eye-off-line cursor-pointer iconInput"></i>
                    </div>
                    <div class="text-xs text-brand text-left cursor-pointer">رمز عبور خود را فراموش کرده اید؟</div>
                    <div class="loginBtn">ورود</div>
                </form>
                <div class="w-full space-y-5">
                    <div class="w-full flex items-center gap-3 px-10">
                        <div class="w-5 h-[1px] bg-brd/50 flex-grow"></div>
                        <div class=" text-gray-500">یا</div>
                        <div class="w-5 h-[1px] bg-brd/50 flex-grow"></div>
                    </div>
                    <div class="createAccount">حساب کاربری ندارید؟</div>
                    <div class="registerBtn loginBtn">ثبت نام</div>
                </div>
            </div>
            <div class="cover">
                <div class="flex gap-5 justify-end items-center">
                    <div class="text-lg">
                        <div class="text-left">SA</div>
                        <div>شانس اول</div>
                    </div>
                    <img class="border border-brd w-10" src="../../public/SA.ico">
                </div>
                <div class="m-auto relative">
                    <img class="absolute right-16 top-14" src="../assets/img/Back.svg"> 
                    <img class="z-10 relative" src="../assets/img/Art.svg">
                    <!-- shape radious -->
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[90%] top-[0%] bg-[#F86F03]" style="border-radius:0% 100% 0% 100% / 1% 100% 0% 99% ;"></div>
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[10%] top-[10%] bg-[#FFF6F4]" style="border-radius:24% 76% 60% 40% / 30% 49% 51% 70% ;"></div>
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[0%] top-[30%] bg-[#FFA41B]" style="border-radius:24% 76% 0% 100% / 30% 100% 0% 70% ;"></div>
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[20%] top-[90%] bg-[#00DFA2]" style="border-radius:51% 49% 38% 62% / 74% 29% 71% 26% ;"></div>
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[75%] top-[90%] bg-[#DB005B]" style="border-radius:100% 0% 36% 64% / 97% 8% 92% 3% ;"></div>
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[85%] top-[32%] bg-[#DD58D6]" style="border-radius:44% 56% 88% 12% / 56% 24% 76% 44%  ;"></div>
                </div> 
                <div class="text-center text-xl space-y-3">
                    <div>کاربر عزیز  به شانس اول خوش آمدید</div>
                    <div class="text-lg text-white/80">بریم برای ثبت نام و ورود</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.containerLogin{
    @apply h-[743px] w-[1218px] m-auto flex;
}
.cover{
    @apply flex flex-col justify-around bg-brand w-7/12 text-white px-20 py-14;
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
}
.form{
    @apply flex flex-col justify-evenly items-center bg-white w-5/12 border px-16 py-8;
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
}
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
.registerBtn{
    @apply !bg-white !text-brand border border-brand !duration-100 hover:!bg-brand hover:!text-white;
}
.createAccount{
    @apply text-sm text-center text-gray-500 cursor-pointer;
}
.shape{
    @apply absolute;
    transform: translateY(0);
    animation: shape 3s ease infinite;
}
@keyframes shape {
    0%{
        transform: translateY(0);
    }
    50%{
        transform: translateY(3px);
    }
    100%{
        transform: translateY(0);
    }
}
</style>