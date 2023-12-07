<script>
import Nav from '../components/nav.vue';
import persianDate from 'persian-date';
export default{
    data(){
        return{
            lotterys:[],
            unixNow:Math.floor(Date.now() / 1000),
            date:{
                year:new persianDate().year(),
                month:new persianDate().month(),
                day:new persianDate().date()
            },
        }
    },
    methods:{
        async SendReq(){
            const url = this.url + '/GetLotterys'
            const req = await fetch(url)
            const res = await req.json()
            this.lotterys = res.data
        },
        async dateStartAndEnd(){
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
                
                this.lotterys[index].start = new persianDate(StartLotUnixTimestamp).toLocale('en').format('L')

                this.lotterys[index].End = new persianDate(StartLotUnixTimestamp).add('month',people).toLocale('en').format('L')
            }
        },
    },
    async created(){
        await this.SendReq()
        this.dateStartAndEnd()
    },
    components:{Nav}
}
</script>
<template>
    <Nav/>
    <div class="container mt-10">
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
            <div v-for="item in lotterys" class="boxLottery">
                <div class="flex justify-between">
                    <div class="text-xl">{{ item.name }}</div>
                    <div class="flex gap-1 border border-white/30 p-1 rounded">
                        <div>{{ item.owner }}</div>
                        <i class="ri-account-circle-line"></i>
                    </div>
                </div>
                <div>cleander</div>
                <div>data</div>
                <div>start :{{ item.start }}</div>
                <div>End :{{ item.End }}</div>
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
</style>