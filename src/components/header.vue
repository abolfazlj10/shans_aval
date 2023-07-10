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
                this.$refs.text.style.maxWidth = '0%'
                setTimeout(() => {
                    this.word++
                    this.$refs.text.style.maxWidth = '100%'
                    if(this.word == this.words.length)
                    this.word = 0
                }, 1500);
            }, 5000);
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
            <div class="flex flex-col h-full justify-around w-6/12">
                <div class="space-y-10 text-right">
                    <div class="text-2xl flex gap-1"><div ref="text" class="text">{{ titr}}{{ words[word] }}</div><div class="typer"></div><div>قرعه کشی</div></div>
                    <div class="text-[#FFF]/80 text-sm">با پلتفرم شانس اول این امکان فراهم شده است که قرعه کشی های خود را ایجاد کنید و شرکت کننده های خود را مدیریت کنید یا شرایط قرعه کشی را جهت ثبت نام مورد نظر بگیرید.</div>
                </div>
                <div class="flex justify-end gap-3">
                    <button class="btnGetStarted group">
                        <div title="راهنمای شانس اول">راهنما</div>
                        <i class="ri-file-list-2-fill icon"></i>
                    </button>
                    <button class="btnAdd group">
                        <div title="ایجاد قرعه کشی">ایجاد</div>
                        <i class="ri-add-box-fill icon"></i>
                    </button>
                    
                </div>
            </div>
            <img class="w-[600px]" src="../assets/img/1.png" alt="vector">
        </div>
    </div>
</template>
<style scoped>
.getStarted{
    @apply bg-brand text-center w-full h-[500px];
}
.ContainerHeader{
    @apply h-full container flex items-center justify-between text-white;
}
.btnGetStarted{
    @apply flex flex-row-reverse gap-2 border px-5 py-1 rounded-2xl duration-100 hover:-translate-y-1 shadow-lg hover:shadow-xl;
}
.btnAdd{
    @apply flex flex-row-reverse gap-2  border px-5 py-1 rounded-2xl bg-white text-brand duration-100 hover:-translate-y-1 shadow-lg hover:shadow-xl;
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