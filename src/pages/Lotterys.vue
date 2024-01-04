<script>
import monthLotterys from '../components/monthLotterys.vue'
import Nav from '../components/nav.vue';
import Num2persian from 'num2persian'
import persianDate from 'persian-date';
import loader from '../components/loader.vue'
export default{
    data(){
        return{
                lotterys:[],
                date:{
                    year:new persianDate().year(),
                    month:new persianDate().month(),
                    day:new persianDate().date()
                },
                months:["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
                isShow:false,
                showCleander:[],
                SDSMC:{gapCleander:null,maxWidthMonth:null,heightBlurHider:null}, // name = style display show month of cleander
                tooltip:{show:false,position:0,status:null,date:null},
                iconDown:0,
            }
    },
    methods:{
        async SendReq(){
            const url = this.url + '/Lotterys'
            const req = await fetch(url)
            const res = await req.json()
            this.lotterys = await res.data
        },
        dateStartAndEnd(){
            for (const [index,lottery] of this.lotterys.entries()) {
                let people = lottery.people
                people--
                let startDate;

                if(this.date.day > lottery.date){
                    startDate = {
                        year : this.date.year,
                        month :this.date.month + 1,
                        day :lottery.date,
                    }
                    if(startDate.month == 13){
                        startDate = {
                            year : this.date.year + 1,
                            month :1 ,
                            day :lottery.date,
                        }
                    }
                }else{
                    startDate = {
                        year : this.date.year,
                        month :this.date.month,
                        day :lottery.date,
                    }
                }
                const formatStartLot = new persianDate([startDate.year, startDate.month, startDate.day]);
                const StartLotUnixTimestamp = Math.floor(formatStartLot.valueOf())
                
                this.lotterys[index].start = new persianDate(StartLotUnixTimestamp).toLocale('en').toArray()

                this.lotterys[index].end = new persianDate(StartLotUnixTimestamp).add('month',people).toLocale('en').toArray()


                this.lotterys[index].month = this.monthLottery(this.lotterys[index].start , lottery.people,startDate.year)
            }
        },
        monthLottery(s,people,year){
            const monthLottery = []
            let monthStart = s[1]
            for (let month = 0; month < people; month++) {
                const day = new persianDate([year,monthStart]).daysInMonth()
                monthLottery.push({
                    year:year,
                    month:this.months[monthStart-1],
                    day:day,
                    justShow:false
                })
                monthStart++
                if(monthStart == 13){
                    year++   
                    monthStart = 1
                }
            }
            if(monthLottery[0].month != this.months[this.date.month-1]){
                let day = new persianDate([this.date.year,this.date.month]).daysInMonth()
                monthLottery.unshift({
                        year:this.date.year,
                        month:this.months[this.date.month-1],
                        day:day,
                        justShow:true
                })
            }
            return monthLottery
        },
        getHeightMonth(){
            this.$nextTick(()=>{
                const cleanderElem = this.$refs.cleander[0]
                this.SDSMC.gapCleander = this.removerPX(window.getComputedStyle(cleanderElem).gap)                
    
                const monthElem = this.$refs.monthCleander[0]
                let heightElem = this.removerPX(window.getComputedStyle(monthElem).height)
                let PaddingElem = this.removerPX(window.getComputedStyle(monthElem).padding)
                this.SDSMC.maxWidthMonth = heightElem + PaddingElem
    
                const blurHideElem = this.$refs.blurHide[0]
                const blurHideHeight = this.removerPX(window.getComputedStyle(blurHideElem).height)
                const blurHidePadding = this.removerPX(window.getComputedStyle(blurHideElem).paddingTop)
                this.SDSMC.heightBlurHider = blurHideHeight + blurHidePadding
            })
        },
        showHideClenader(month){
            const isShowCleander = this.showCleander.includes(month)
            if(!isShowCleander){
                this.showCleander.push(month)
            }else{
                const index = this.showCleander.indexOf(month)
                this.showCleander.splice(index,1)
            }
        },
        removerPX(str){
            const convert = str.substr(0,str.length-2)
            return Number(convert)
        },
        isCleanderShow(cleanderID){
            return this.showCleander.includes('Cleander_'+cleanderID)
        },
        scrollBookMark(ID){
            const elem = this.$refs.lottery[ID-1]
            const positionY = elem.getBoundingClientRect().y
            window.scrollTo({
                top:positionY-10,
                left:0,
                behavior:'smooth'
            })
        },
        arrayToDate(arr){
            const date = arr[0]+'/'+ arr[1]+'/'+arr[2]
            return date
        },
        priceChar(num){
            const price = Num2persian(num) + ' تومان'
            return price
        },
        isLeapYear(year){
            return new persianDate([year]).isLeapYear()
        },
        tooltipSet($event,status,date){
            const top = ($event.target.offsetTop + $event.target.scrollTop) - (status != 'today' ? 130 : 130) 
            const left = ($event.target.offsetLeft + $event.target.scrollLeft) - this.iconDown
            
            this.tooltip.status = status
            this.tooltip.date = date
            this.tooltip.position = {y:top,x:left}
            this.tooltip.show = true
            this.$nextTick(()=>{
                this.widthTooltip()
            })
        },
        hideTooltip(){
            this.tooltip.show = false
        },
        widthTooltip(){
            const iconDown = this.$refs.iconDown
            const styleID = window.getComputedStyle(iconDown)
            const widthID = this.removerPX(styleID.width)/2

            const elemTooltip = this.$refs.tooltip
            const styleT = window.getComputedStyle(elemTooltip)
            const width = this.removerPX(styleT.width)

            this.iconDown = (width / 2) - widthID
        }
    },
    async created(){
        this.isShow = await false
        await this.SendReq()
        await this.dateStartAndEnd() // date start and end lottery 
        this.isShow = await true
        await this.getHeightMonth()
    },
    components:{Nav,loader,monthLotterys}
}
</script>
<template>
    <loader v-if="!isShow"/>
    <div v-else>
        <Nav /> 
        <div class="container mt-10">
            <div class="boxDesc">
                <div class="contentDesc">
                    <div class="text-2xl">قرعه کشی ها</div>
                    <div>لیست تمامی قرعه کشی های پلفترم شانس اول</div>
                    <div>
                        <div class="text-right mb-4">جدیدترین ها</div>
                        <ul class="recumendedLottery">
                            <div v-for="(item,i) in lotterys" v-show="(lotterys.length-3) <= i" :key="item.id">
                                <li @click="scrollBookMark(item.id)" class="cursor-pointer">{{ i +1 }}) {{ item.name }}</li>
                                <div class="text-xs opacity-80 mr-4">مدیر: {{ item.owner }}</div>
                            </div>
                        </ul>
                    </div>
                    <router-link to="/New" class="btnAdd group">
                        <div title="اگر ثبت نام نکرده اید ثبت نام کنید.">ایجاد</div>
                        <i class="ri-add-box-fill icon"></i>
                    </router-link>
                </div>
                <img class="imageDesc" src="../../public/wheel of luck.jpg">
            </div>
            <div class="lotterys">
                <div v-for="(lottery,i) in lotterys" class="boxLottery" ref="lottery" :key="lottery.id">
                    <div class="flex justify-center py-2">
                        <router-link :to="'/lottery/'+(i+1)" class="text-2xl">{{ lottery.name }}</router-link>
                    </div>
                    <div class="cleander" ref="cleander"
                    :class="lottery.month.length >= 5 && 'overflow-y-scroll'" :style="[((!isCleanderShow(lottery.id) && lottery.month.length >= 5) && `height:${SDSMC.maxWidthMonth*5}px;`),
                    ((isCleanderShow(lottery.id) && lottery.month.length >= 5) && `height:${(SDSMC.maxWidthMonth*lottery.month.length)+SDSMC.heightBlurHider-SDSMC.gapCleander}px`)]"
                    >
                    <div class="monthCleander" v-for="(month,index) in lottery.month" :class="lottery.month.length == (index+1) && 'border-none'"  ref="monthCleander" :key="index">
                        <div class="grid grid-cols-[80px_40px_1fr] items-center">
                            <div>{{ month.month }}</div>
                            <sub class="mr-1 text-[11px]"> {{ month.year }} </sub>:
                        </div>
                        <monthLotterys @setTooltip="tooltipSet" @hideTooltip="hideTooltip" :lottery="lottery" :month="month" class="py-2 px-3 flex justify-center gap-1"/>
                        </div> 
                        <div class="blurHide" ref="blurHide" v-if="lottery.month.length >= 5">
                            <i @click="showHideClenader('Cleander_'+lottery.id)" class="ri-arrow-up-s-line btnShow" :class="!isCleanderShow(lottery.id) && 'rotate-180'"></i>
                        </div>
                    </div>
                    <div class="flex gap-[100px] text-xs">
                        <div class="flex gap-2">
                            <div class="bg-white status"></div>
                            <div>قرعه کشی انجام نشده</div>
                        </div>
                        <div class="flex gap-2">
                            <div class="bg-green-300 status"></div>
                            <div>قرعه کشی انجام شده</div>
                        </div>
                        <div class="flex gap-2">
                            <div class="border border-green-300 status">
                            </div>
                            <div>امروز</div>
                        </div>
                    </div>
                    <div class="Information">
                        <div class="itemInfo">
                            <div class="dataInfo">
                                <div>شروع :</div><div>{{ arrayToDate(lottery.start) }}</div>
                            </div>
                            <div class="dataInfo justify-end">
                                <div>پایان : </div><div>{{ arrayToDate(lottery.end) }}</div>
                            </div>
                        </div>
                        <div class="itemInfo !flex justify-between">
                            <div class="dataInfo">
                                <div>قرعه ها : </div><div>1 از {{ lottery.people }}</div>
                            </div>
                            <div class="dataInfo">
                                <div class="chartFinish">
                                    <div class="itemChartFinish" v-for="(box,index) in lottery.people" :class="[(index+1 != lottery.people ? 'border-r border-r-white/10' : 'border-none'),(index <= 0 && 'bg-green-400 border-r-green-400')]">{{ box }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="itemInfo">
                            <div class="dataInfo">
                                <div>شرکت کنندگان :</div><div>{{ lottery.people }} نفر</div>
                            </div>
                            <div class="dataInfo justify-end !gap-5">
                                <div class="flex gap-2">
                                    <div v-for="user in lottery.people" v-show="user <= 3" class="w-14 h-14 bg-cover" style="background-image: url(../../public/User.png);"></div>
                                </div>
                                <div class="flex flex-row-reverse items-center justify-center"> <i class="ri-arrow-left-s-line text-3xl"></i><i class="ri-add-line"></i><div>{{ lottery.people - 3 }}</div></div>
                            </div>
                        </div>
                        <div class="itemInfo">
                            <div class="dataInfo">
                                <div>تاریخ قرعه کشی :</div><div>{{ lottery.date }}ام</div>
                            </div>
                            <div v-if="lottery.date == 1" class="dataInfo justify-end !gap-3">
                                <div class="boxDate bg-[#EF476F]">{{ lottery.date }}</div>
                                <div class="boxDate">{{ lottery.date +1 }}</div>
                                <div class="boxDate">{{ lottery.date +2 }}</div>
                            </div>
                            <div v-else-if="lottery.date == 30" class="dataInfo justify-end !gap-3">
                                <div class="boxDate">{{ lottery.date-2 }}</div>
                                <div class="boxDate">{{ lottery.date -1 }}</div>
                                <div class="boxDate bg-[#EF476F]">{{ lottery.date }}</div>
                            </div>
                            <div v-else class="dataInfo justify-end !gap-3">
                                <div class="boxDate">{{ lottery.date -1 }}</div>
                                <div class="boxDate bg-[#EF476F]">{{ lottery.date }}</div>
                                <div class="boxDate">{{ lottery.date +1 }}</div>
                            </div>
                        </div>
                        <div class="itemInfo">
                            <div class="dataInfo">
                                <div>شماره موبایل :</div><div>0{{ lottery.phone }}</div>
                            </div>
                            <a :href="'tel:+'+lottery.phone" class="dataInfo justify-end text-xl">
                                <div class="widthBox flex flex-row-reverse justify-around items-center rounded-md px-4 py-4 gap-3 bg-[#7AE582]">
                                    <div class="">0{{ lottery.phone }}</div>
                                    <i class="ri-phone-line text-2xl border-l border-white/50 pl-5"></i>
                                </div>
                            </a>
                        </div>
                        <div class="itemInfo">
                            <div class="dataInfo">
                                <div>مبلغ کل :</div><div>{{ priceChar(lottery.price) }}</div>
                            </div>
                            <div class="dataInfo justify-end text-xl">
                                <div class="widthBox flex flex-row-reverse justify-around items-center rounded-md px-4 py-4 gap-3 bg-[#9BB1FF]">
                                    <div class="">{{ (lottery.price).toLocaleString('en-US') }}</div>
                                    <i class="ri-money-dollar-circle-line text-2xl border-l border-white/50 pl-5"></i>
                                </div>
                            </div>
                        </div>
                        <div class="itemInfo">
                            <div class="dataInfo">
                                <div> مبلغ هر قسط :</div><div>{{ priceChar(Math.floor(lottery.price / lottery.people)) }}</div>
                            </div>
                            <div class="dataInfo justify-end text-xl">
                                <div class="widthBox flex flex-row-reverse justify-around items-center rounded-md px-4 py-4 gap-3 bg-[#1E96FC]">
                                    <div>{{ (Math.floor(lottery.price / lottery.people)).toLocaleString('en-US') }}</div>
                                    <i class="ri-money-dollar-circle-line text-2xl border-l border-white/50 pl-5"></i>
                                </div>
                            </div>
                        </div>
                        <div class="text-center text-white/90">ایجاد شده توسط {{ lottery.owner }}</div>
                    </div>
                </div>
            </div>
        </div>
        <Transition name="fade">
            <div ref="tooltip" v-show="tooltip.show" :style="'top:'+(tooltip.position.y)+'px;left:'+(tooltip.position.x)+'px;'" class="tooltip">
                <div v-if="tooltip.status == 'dayLottery'" class="flex flex-col gap-3">
                    <div class="text-red-500 text-center">انجام نشده</div>
                    <div>{{ tooltip.date[0] + ' ' + tooltip.date[1] + ' ' + tooltip.date[2] }}</div>
                </div>
                <div v-else class="flex flex-col gap-3">
                    <div class="text-green-500 text-center">تاریخ امروز</div>
                    <div>{{ date.day + ' ' + months[date.month-1] + ' ' + date.year }}</div>
                </div>
                <i ref="iconDown" class="ri-arrow-down-s-fill downIcon" :style="'left:'+iconDown+'px'"></i>
            </div>
        </Transition>
    </div>
</template>
<style scoped>
.boxDesc{
    @apply bg-brand h-[580px] rounded-lg flex text-[#fff] px-5 py-7 shadow-lg;
}
.contentDesc{
    @apply flex-grow flex flex-col gap-10 text-center px-8;
}
.imageDesc{
    @apply w-9/12 object-cover rounded-lg;
}
.recumendedLottery{
    @apply text-right space-y-5;
}
.btnAdd{
    @apply flex flex-row-reverse text-lg gap-2 mt-auto justify-center border p-2 mx-2 rounded-xl bg-white text-brand duration-100 hover:mx-0 hover:scale-105 shadow-lg hover:shadow-xl max-sm:text-sm;
}
.icon{
    @apply duration-75 group-hover:animate-spin;
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
.lotterys{
    @apply flex flex-col gap-10 mt-10;
}
.boxLottery{
    @apply bg-brand text-white rounded-lg p-2;
}
.cleander{
    @apply border border-white/50 my-2 flex flex-col gap-2 rounded-lg;
    transition: all .5s ease;
}
.cleander::-webkit-scrollbar{
    width: 10px;
    background-color: rgb(255, 255, 255);
    border-radius: 50px;
}
.cleander::-webkit-scrollbar-track {
    background-color: #1900ffbe 0.298;
}
.cleander::-webkit-scrollbar-thumb {
    @apply bg-black/75 rounded-full;
}
.monthCleander{
    @apply border-b border-white/40 p-2 grid grid-cols-[130px_1fr] mx-2;
}
.markDate{
    @apply bg-white text-brand rounded-full;
}
.blurHide{
    @apply sticky -bottom-1 pt-1 pb-1 bg-gradient-to-t from-brand/90 via-brand/80 to-brand/10 text-center text-3xl rounded-t-lg;
}
.btnShow{
    @apply cursor-pointer block;
    transition: all .5s ease;
}
.Information{
    @apply m-2 text-lg space-y-4 my-6;
}
.itemInfo{
    @apply grid grid-cols-2;
}
.dataInfo{
    @apply flex gap-1 items-center;
}
.chartFinish{
    @apply min-w-[400px] flex flex-row-reverse justify-around text-lg rounded border;
}
.itemChartFinish{
    @apply flex-grow flex justify-center p-2;
}
.boxDate{
    @apply flex justify-center items-center border rounded-full w-16 py-4;
}
.widthBox{
    @apply w-60;
}
.dayMonth{
    @apply py-2 px-3 flex justify-center gap-1;
}
.tooltip{
    @apply bg-white/40 backdrop-blur-xl shadow-xl py-5 px-8 absolute top-1 rounded-lg;

}
.downIcon{
    @apply absolute -bottom-[30px] text-5xl text-white/50 z-[-1];
}
.fade-enter-active {
    animation : fade-in .4s ease 
}
.fade-leave-active {
    animation : fade-out .4s ease 
}
@keyframes fade-in {
    from {
        opacity : 0;
        transform: translateY(30px);
        z-index: -1;
    }
    to {
        transform: translateY(0);
        opacity : 1;
    }
}
@keyframes fade-out {
    from {
        opacity : 1;
    }
    to {
        opacity : 0;
        z-index: -1;
        transform: translateY(30px);
    }
}
.status{
    @apply py-1 px-2 rounded-sm;
}
</style>