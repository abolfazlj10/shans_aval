<script>
export default{
    data(){
        return{
            wEl:null,
            step:0
        }
    },
    methods:{
        removePX(el){ // get 1200px => 1200
            return el.slice(0,el.length-2)
        },
        changeStep(inp){
            this.step = inp
        }
    },
    mounted(){        
        const coverEl = this.$refs.cover
        const paddingCover = this.removePX(getComputedStyle(coverEl).paddingRight) * 2
        const widthCover = this.removePX(getComputedStyle(coverEl).width) 
        this.wEl = widthCover - paddingCover
    }
}
</script>
<template>
    <div class="h-screen flex">
        <div class="containerLogin relative">
            <img class="torus" src="../../assets/img/torus.svg">
            <img class="torus2" src="../../assets/img/torus2.svg">
            <div class="form" ref="form">
                <slot :changer="changeStep" :parnt="$refs.form"></slot>
            </div>
            <div ref="cover" class="cover">
                <div class="flex gap-5 justify-end items-center">
                    <div class="text-lg">
                        <div class="text-left">SA</div>
                        <div>شانس اول</div>
                    </div>
                    <img class="border border-brd w-10" src="../../../public/SA.ico">
                </div>
                <div class="m-auto relative">
                    <img class="absolute right-16 top-14" src="../../assets/img/Back.svg"> 
                    <img class="z-10 relative" src="../../assets/img/Art.svg">
                    <!-- shape radious -->
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[90%] top-[0%] bg-[#F86F03]" style="border-radius:0% 100% 0% 100% / 1% 100% 0% 99% ;"></div>
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[10%] top-[10%] bg-[#FFF6F4]" style="border-radius:24% 76% 60% 40% / 30% 49% 51% 70% ;"></div>
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[0%] top-[30%] bg-[#FFA41B]" style="border-radius:24% 76% 0% 100% / 30% 100% 0% 70% ;"></div>
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[20%] top-[90%] bg-[#00DFA2]" style="border-radius:51% 49% 38% 62% / 74% 29% 71% 26% ;"></div>
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[75%] top-[90%] bg-[#DB005B]" style="border-radius:100% 0% 36% 64% / 97% 8% 92% 3% ;"></div>
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[85%] top-[32%] bg-[#DD58D6]" style="border-radius:44% 56% 88% 12% / 56% 24% 76% 44%  ;"></div>
                </div> 
                <div :style="`width:${wEl * 7}px;transform: translate3d(${wEl*step}px, 0, 0);`" class="texter">
                    <div :style="`width:${wEl}px`">برای ورود باید ایمیل و رمز خود را وارد کنید.</div>
                    <div :style="`width:${wEl}px`">لطفا ایمیل خود را وارد کنید.</div>
                    <div :style="`width:${wEl}px`">رمز شما باید حداقل شامل 8 کارکتر باشد.</div>
                    <div :style="`width:${wEl}px`">برای بازیابی رمز ایمیل خود را وارد کنید.</div>
                    <div :style="`width:${wEl}px`">فیلد ها را کامل کنید.</div>
                    <div :style="`width:${wEl}px`">نام کاربری خود را وارد کنید.</div>
                    <div :style="`width:${wEl}px`">کد 6 رقمی به ایمیل شما ارسال شد.</div>
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
    @apply flex flex-col justify-around bg-brand w-7/12 text-white px-20 py-14 overflow-hidden;
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
}
.form{
    @apply flex flex-col justify-evenly items-center bg-white/50 w-5/12 border px-16 py-8 overflow-hidden;
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
    backdrop-filter: blur(10px);
}
.texter{
    @apply flex items-center text-center whitespace-nowrap text-xl space-y-3 overflow-hidden;
    transition: .1s all ease;
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
.torus{
    @apply absolute -left-[107px] top-44;
    animation: shape 3s ease infinite;
}
.torus2{
    @apply absolute right-[107px] -bottom-24 -z-10;
    animation: T1 3s ease infinite;
}
@keyframes T1 {
    0%{
        transform: rotate(0);
    }
    50%{
        transform: rotate(-3deg);
    }
    100%{
        transform: rotate(0);
    }
}
</style>