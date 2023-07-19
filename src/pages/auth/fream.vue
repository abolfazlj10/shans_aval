<script>
export default{
    data(){
        return{
            wEl:null,
            step:0,
            torus:true,
        }
    },
    methods:{
        removePX(el){ // get 1200px => 1200
            return el.slice(0,el.length-2)
        },
        changeStep(inp){
            this.step = inp
        },
        controlSize(){
            const coverEl = this.$refs.cover
            const paddingCover = this.removePX(getComputedStyle(coverEl).paddingRight) * 2
            const widthCover = this.removePX(getComputedStyle(coverEl).width) 
            this.wEl = widthCover - paddingCover
        },
        setTorus(){
            if(window.innerWidth < 1000){
                const form = this.$refs.formMin
                const torus = this.$refs.torus
                const posit = form.getBoundingClientRect().top
                const heightTorus = this.removePX(getComputedStyle(torus).width) / 2 
                this.torus = posit - heightTorus
            }else{
                this.torus = false
            }
        }
    },
    created(){
        window.addEventListener('resize',this.controlSize)
        window.addEventListener('resize',this.setTorus)        
        window.addEventListener('scroll',this.setTorus)        
    },
    mounted(){        
        this.controlSize()
        this.setTorus()
    },
}
</script>
<template>
    <div class="mainContainer">
        <div class="containerLogin">
            <img v-if="torus" class="torus" :style="`top:${torus}px`" id="torus" ref="torus" src="../../assets/img/Torus.svg">
            <img v-else class="torus" src="../../assets/img/Torus.svg">
            <img class="torus2" src="../../assets/img/torus2.svg">
            <div class="form max-[1000px]:!hidden" ref="form">
                <slot :changer="changeStep" :parnt="$refs.form"></slot>
            </div>
            <div class="formMin min-[1000px]:!hidden" ref="formMin">
                <div class="containerFormMin" ref="formMin">
                    <slot :changer="changeStep" :parnt="$refs.formMin"></slot>
                </div>
            </div>
            <div ref="cover" class="cover">
                <div class="flex gap-5 justify-end items-center">
                    <div class="text-lg">
                        <div class="text-left">SA</div>
                        <div>شانس اول</div>
                    </div>
                    <img class="border border-brd w-10" src="../../../public/SA.ico">
                </div>
                <div class="ContainerSVG">
                    <img class="back" src="../../assets/img/Back.svg"> 
                    <img class="art" src="../../assets/img/Art.svg">
                    <!-- shape radious -->
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[90%] top-[0%] bg-[#F86F03]" style="border-radius:0% 100% 0% 100% / 1% 100% 0% 99% ;"></div>
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[10%] top-[10%] bg-[#FFF6F4]" style="border-radius:24% 76% 60% 40% / 30% 49% 51% 70% ;"></div>
                    <div class="shape rounded-3xl w-[25px] h-[25px] -left-[8%] top-[30%] bg-[#FFA41B]" style="border-radius:24% 76% 0% 100% / 30% 100% 0% 70% ;"></div>
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[20%] top-[90%] bg-[#00DFA2]" style="border-radius:51% 49% 38% 62% / 74% 29% 71% 26% ;"></div>
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[75%] top-[90%] bg-[#DB005B]" style="border-radius:100% 0% 36% 64% / 97% 8% 92% 3% ;"></div>
                    <div class="shape rounded-3xl w-[25px] h-[25px] left-[100%] top-[32%] bg-[#DD58D6]" style="border-radius:44% 56% 88% 12% / 56% 24% 76% 44%  ;"></div>
                </div> 
                <div :style="`width:${wEl}px`" class="overflow-hidden">
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
    </div>
</template>
<style scoped>
.mainContainer{
    @apply min-h-screen flex max-[1000px]:block;
}
.containerLogin{
    @apply h-[743px] w-[1218px] m-auto flex relative duration-75;
    @apply max-[1445px]:!w-[1100px] max-[1318px]:!w-[1000px] max-[1219px]:!w-[950px] max-[1179px]:!w-[900px] max-[1083px]:!w-[800px]; /* width */
    @apply max-[1318px]:!h-[700px] max-[1219px]:!h-[670px] max-[1179px]:!h-[640px]  max-[1083px]:!h-[600px]; /* height */
    @apply max-[1000px]:flex-col-reverse max-[1000px]:!my-auto max-[1000px]:items-center max-[1000px]:m-0 max-[1000px]:!w-full max-[1000px]:!min-h-screen max-[1000px]:grid max-[1000px]:grid-rows-[371px_558px] max-[1000px]:bg-brand;
}
.cover{
    @apply flex flex-col justify-around bg-brand w-7/12 text-white px-20 py-14 overflow-hidden;
    @apply max-[1000px]:w-full max-[1000px]:h-full max-[1000px]:py-2 max-[1000px]:flex max-[500px]:px-5;
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
    @media screen and (max-width:1000px){
        border-radius: 0;
    }
}
.form{
    @apply flex flex-col justify-evenly items-center bg-white/50 w-5/12 border px-16 py-8 overflow-hidden max-[1318px]:px-10 max-[1083px]:text-sm;
    @apply  max-[1000px]:order-2 max-[1000px]:w-full max-[1000px]:h-full max-[1000px]:px-[15rem] max-[1000px]:bg-white;
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
    backdrop-filter: blur(10px);
    @media screen and (max-width:1000px){
        border-top-right-radius: 24px;
        border-top-left-radius: 24px;
        border-bottom-right-radius: 0;
    }
}
.formMin{
    @apply flex justify-center bg-white/50 w-5/12 border px-16 py-8 overflow-hidden max-[1318px]:px-10 max-[1083px]:text-sm;
    @apply  max-[1000px]:order-2 max-[1000px]:w-full max-[1000px]:h-full max-[1000px]:bg-white;
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
    backdrop-filter: blur(10px);
    @media screen and (max-width:1000px){
        border-top-right-radius: 24px;
        border-top-left-radius: 24px;
        border-bottom-right-radius: 0;
    }
}
.containerFormMin{
    @apply flex flex-col justify-around items-center w-[400px] ; 
}
.texter{
    @apply flex items-center text-center whitespace-nowrap text-lg space-y-3 overflow-hidden;
    @apply max-[1179px]:text-sm;
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
    @apply absolute max-[1000px]:fixed -left-[84px] top-44;
    @apply max-[1179px]:w-[150px] max-[1179px]:-left-[75px] max-[1000px]:left-2 max-[1000px]:z-10 max-[650px]:w-[150px] max-[500px]:w-[100px] max-[396px]:w-[80px] max-[353px]:w-[50px];
    animation: shape 3s ease infinite;
}
.torus2{
    @apply absolute right-[107px] -bottom-24 -z-10;
    @apply max-[1179px]:max-w-[180px] max-[1000px]:bottom-0 max-[1000px]:hidden; 
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
.back{
    @apply absolute left-14 top-20 w-[250px];
    @apply max-[1083px]:left-16 max-[1083px]:top-20 max-[1083px]:w-[190px] max-[1000px]:top-9 max-[1000px]:w-[210px] max-[1000px]:left-5 max-[500px]:w-[160px] max-[500px]:left-6;
}
.art{
    @apply z-10 relative max-[1000px]:w-40 max-[500px]:w-[120px];
}
.ContainerSVG{
    @apply m-auto relative p-20 max-[1000px]:p-10;
}
</style>