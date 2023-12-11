<script>
import Nav from '../components/nav.vue';
import persianDate from 'persian-date';
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
            maxWidthMonth:null,
            isShow:false,
            showCleander:[]
        }
    },
    methods:{
        async SendReq(){
            const url = this.url + '/GetLotterys'
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
                    day:day
                })
                monthStart++
                if(monthStart == 13){
                    year++   
                    monthStart = 1
                }
            }
            return monthLottery
        },
        isLeapYear(year){
            return new persianDate([year]).isLeapYear()
        },
        getHeightMonth(){
            this.$nextTick(()=>{
                const elem = this.$refs.monthCleander[1]
                let heightElem = window.getComputedStyle(elem).height
                this.maxWidthMonth = Math.floor(heightElem.substr(0,heightElem.length-2) * 5)
            })
        },
        showHideClenader(month){
            const isShow = this.showCleander.includes(month)
            if(!isShow){
                this.showCleander.push(month)
            }else{
                const index = this.showCleander.indexOf(month)
                this.showCleander.splice(index,1)
            }
        }
    },
    async created(){
        await this.SendReq()
        await this.dateStartAndEnd()
        this.isShow = true
        this.getHeightMonth()
    },
    components:{Nav}
}
</script>
<template>
    <Nav/>
    <div class="container mt-10" v-if="isShow">
        <div class="boxDesc">
            <div class="contentDesc">
                <div class="text-2xl">قرعه کشی ها</div>
                <div>لیست تمامی قرعه کشی های پلفترم شانس اول</div>
                <div>
                    <div class="text-right mb-4">جدیدترین ها</div>
                    <ul class="recumendedLottery">
                        <div v-for="(item,i) in lotterys" v-show="(lotterys.length-3) <= i">
                            <li class="cursor-pointer">{{ i +1 }}) {{ item.name }}</li>
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
            <div v-for="lottery in lotterys" class="boxLottery">
                <div class="flex justify-between">
                    <div class="text-xl">{{ lottery.name }}</div>
                    <div class="flex gap-1 border border-white/30 p-1 rounded">
                        <div>{{ lottery.owner }}</div>
                        <i class="ri-account-circle-line"></i>
                    </div>
                </div>
                <div class="cleander" :style="!showCleander.includes('month_'+lottery.id) ? `max-height:${maxWidthMonth}px` : `max-height:${maxWidthMonth*lottery.month.length}px`">
                    <div class="monthCleander" v-for="(month,index) in lottery.month" :class="lottery.month.length == (index+1) && 'border-none'"  ref="monthCleander">
                        <div class="grid grid-cols-[80px_40px_1fr] items-center">
                            <div>{{ month.month }}</div>
                            <sub class="mr-1 text-[11px]"> {{ month.year }} </sub>:
                        </div>
                        <div class="w-full grid grid-cols-[repeat(31,1fr)] text-center">
                            <div v-for="i in month.day" class="p-2" :class="[(lottery.date == i && 'markDate'),((!isLeapYear(month.year) && month.month == 'اسفند' && lottery.date == 30 && i == 29) && 'markDate')]">{{ i }}</div>
                        </div>
                    </div>
                    <div class="blurHide" v-if="lottery.month.length >= 5">
                        <i @click="showHideClenader('month_'+lottery.id)" class="ri-arrow-up-s-line btnShow" :class="!showCleander.includes('month_'+lottery.id) && 'rotate-180'"></i>
                    </div>
                </div>
                <div>data</div>
                <div>start :{{ lottery.start }}</div>
                <div>End :{{ lottery.end }}</div>
            </div>
        </div>
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
    @apply border border-white/50 my-2 flex flex-col gap-2 rounded-lg overflow-y-scroll;
    transition: all 1s ease-in;
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
    @apply sticky -bottom-1 pt-4 pb-1 bg-gradient-to-t from-black/70 to-black/0 text-center text-3xl rounded-t-lg;
}
.btnShow{
    @apply cursor-pointer block;
    transition: all .8s ease;
}
</style>