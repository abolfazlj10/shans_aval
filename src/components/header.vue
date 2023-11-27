<script>
export default{
    data(){
        return{
            titr:'شانس اول پلتفرمی  برای ',
            words:[
                "کنترل",
                "ایجاد",
                "شرکت در",
                "سرمایه گذاری در",
                "مدیریت"
            ],
            word:0,
        }
    },
    methods:{
        changeWord(){
            setInterval(() => {
                try{
                    this.$refs.text.style.maxWidth = '0%'
                }catch{}
                setTimeout(() => {
                    this.word++
                    try {
                        this.$refs.text.style.maxWidth = '100%'
                    } catch{}
                    if(this.word == this.words.length)
                    this.word = 0
                }, 1500);
            }, 4000);
        }
    },
    created(){
        this.changeWord()
    }
}
</script>
<template>
    <div class="getStarted">
        <div class="ContainerHeader">
            <div class="flex flex-col h-full justify-around w-6/12 max-md:ml-auto max-md:w-8/12 max-md:gap-7 max-sm:w-9/12 max-sm:gap-12 max-[539px]:w-full">
                <div class="space-y-10 text-right max-[500px]:text-center">
                    <div class="text-2xl max-lg:text-lg flex gap-1  max-[500px]:justify-center max-[416px]:text-[17px] max-[395px]:text-[16px] max-[376px]:text-[15px]"><div ref="text" class="text">{{ titr}}{{ words[word] }}</div><div class="typer"></div><div>قرعه کشی</div></div>
                    <div class="text-[#FFF]/80 text-sm max-sm:text-[13px] max-[376px]:text-[12px]">با پلتفرم شانس اول این امکان فراهم شده است که قرعه کشی های خود را ایجاد کنید و شرکت کننده های خود را مدیریت کنید یا شرایط قرعه کشی را جهت ثبت نام مورد نظر بگیرید.</div>
                </div>
                <div class="flex justify-end gap-3 max-[500px]:justify-center">
                    <button class="btnGetStarted group">
                        <div title="راهنمای شانس اول">راهنما</div>
                        <i class="ri-file-list-2-fill icon"></i>
                    </button>
                    <router-link to="/New" class="btnAdd group">
                        <div title="اگر ثبت نام نکرده اید ثبت نام کنید.">ایجاد</div>
                        <i class="ri-add-box-fill icon"></i>
                    </router-link>
                    
                </div>
            </div>
            <img class="w-[600px] max-xl:w-[500px] max-lg:w-[360px] max-md:mr-auto max-md:w-[300px] max-[539px]:ml-auto" src="../assets/img/1.png" alt="vector">
        </div>
    </div>
</template>
<style scoped>
.getStarted{
    @apply bg-brand text-center w-full h-[500px] max-lg:h-[450px] max-md:h-fit max-md:p-5;
}
.ContainerHeader{
    @apply h-full container flex items-center justify-between text-white max-xl:gap-5 max-md:flex-col max-md:gap-9 max-sm:gap-14;
}
.btnGetStarted{
    @apply flex flex-row-reverse gap-2 border px-5 py-1 rounded-2xl duration-100 hover:-translate-y-1 shadow-lg hover:shadow-xl max-sm:text-sm;
}
.btnAdd{
    @apply flex flex-row-reverse gap-2  border px-5 py-1 rounded-2xl bg-white text-brand duration-100 hover:-translate-y-1 shadow-lg hover:shadow-xl max-sm:text-sm;
}
.icon{
    @apply duration-75 group-hover:animate-spin;
}
.text{
    @apply inline-block overflow-hidden whitespace-nowrap;
    transition: 1.4s all ease;
    max-width: 100%;
}
.typer{
    @apply w-1 border-r;
    animation: type 1s ease infinite;
}
@keyframes type {
    0%{
        border-right: 1px solid white;
    }
    50%{
        border-right: 1px solid rgba(255, 255, 255, 0.2);
    }
    100%{
        border-right: 1px solid white;
    }
}
@keyframes spin {
    0%{
        transform: rotate(-10deg);
    }
    50%{
        transform: rotate(10deg);
    }
    100%{
        transform: rotate(-10deg);
    }
}
</style>