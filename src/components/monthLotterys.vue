<script>
import persianDate from 'persian-date';
import dayMonthLottery from './dayMonthLottery.vue';
export default{
    props:["lottery","month"],
    data(){
        return{
            date:{
                year:new persianDate().year(),
                month:new persianDate().month(),
                day:new persianDate().date(),
            },
            isToday:0,
            months:["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
            test:null,
        }
    },
    methods:{
        isLeapYear(year){
            return new persianDate([year]).isLeapYear()
        },
    },
    created(){
        this.$nextTick(()=>{ 
            for (let i = 1; i <= 31; i++) {
                const elem = this.$refs['num'+i]
                if (this.lottery.date == i && !this.lottery.month.justShow && this.month.day >= i)
                    elem.$el.className += ' markDate'
                if(this.date.day == i && this.month.month == this.months[this.date.month-1] && this.date.year == this.month.year && this.month.day >= i){
                    elem.$el.className += ' today'
                    this.isToday = i
                }
                if(!this.isLeapYear(this.month.year) && this.month.month == 'اسفند' && this.lottery.date == 30 && this.month.day == 29 && !this.month.justShow && i == 29)
                    elem.$el.className += ' markDate'
            }
        })
    },
    components:{dayMonthLottery}
}
</script>
<template>
    <div class="w-full grid grid-cols-[repeat(31,1fr)] text-center">
        <dayMonthLottery class="day" ref="num1" num="1" :today="isToday" />
        <dayMonthLottery class="day" ref="num2" num="2" :today="isToday" />
        <dayMonthLottery class="day" ref="num3" num="3" :today="isToday" />
        <dayMonthLottery class="day" ref="num4" num="4" :today="isToday" />
        <dayMonthLottery class="day" ref="num5" num="5" :today="isToday" />
        <dayMonthLottery class="day" ref="num6" num="6" :today="isToday" />
        <dayMonthLottery class="day" ref="num7" num="7" :today="isToday" />
        <dayMonthLottery class="day" ref="num8" num="8" :today="isToday" />
        <dayMonthLottery class="day" ref="num9" num="9" :today="isToday" />
        <dayMonthLottery class="day" ref="num10" num="10" :today="isToday" />
        <dayMonthLottery class="day" ref="num11" num="11" :today="isToday" />
        <dayMonthLottery class="day" ref="num12" num="12" :today="isToday" />
        <dayMonthLottery class="day" ref="num13" num="13" :today="isToday" />
        <dayMonthLottery class="day" ref="num14" num="14" :today="isToday" />
        <dayMonthLottery class="day" ref="num15" num="15" :today="isToday" />
        <dayMonthLottery class="day" ref="num16" num="16" :today="isToday" />
        <dayMonthLottery class="day" ref="num17" num="17" :today="isToday" />
        <dayMonthLottery class="day" ref="num18" num="18" :today="isToday" />
        <dayMonthLottery class="day" ref="num19" num="19" :today="isToday" />
        <dayMonthLottery class="day" ref="num20" num="20" :today="isToday" />
        <dayMonthLottery class="day" ref="num21" num="21" :today="isToday" />
        <dayMonthLottery class="day" ref="num22" num="22" :today="isToday" />
        <dayMonthLottery class="day" ref="num23" num="23" :today="isToday" />
        <dayMonthLottery class="day" ref="num24" num="24" :today="isToday" />
        <dayMonthLottery class="day" ref="num25" num="25" :today="isToday" />
        <dayMonthLottery class="day" ref="num26" num="26" :today="isToday" />
        <dayMonthLottery class="day" ref="num27" num="27" :today="isToday" />
        <dayMonthLottery class="day" ref="num28" num="28" :today="isToday" />
        <dayMonthLottery v-if="month.day >= 29" class="day" ref="num29" num="29" :today="isToday" />
        <dayMonthLottery v-if="month.day >= 30" class="day" ref="num30" num="30" :today="isToday" />
        <dayMonthLottery v-if="month.day >= 31" class="day" ref="num31" num="31" :today="isToday" />
    </div>
</template>
<style>
.markDate{
    @apply bg-white text-brand rounded-full;
}
.day{
    @apply py-2 px-2 flex justify-center gap-1;
}
.today{
    @apply border border-green-300 rounded-full relative;
}
</style>