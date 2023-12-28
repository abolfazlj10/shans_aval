<script>
import persianDate from 'persian-date';
import dayMonthLottery from './daymonthlottery.vue';
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
        showTooltip($event){
            this.$emit('setTooltip',$event)
        },
        hideTooltip(){
            this.$emit('hideTooltip')
        }
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
        <dayMonthLottery class="day" @mouseenter="lottery.date == 1 && showTooltip($event)" @mouseleave="lottery.date == 1 && hideTooltip()" ref="num1" num="1" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 2 && showTooltip($event)" @mouseleave="lottery.date == 2 && hideTooltip()" ref="num2" num="2" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 3 && showTooltip($event)" @mouseleave="lottery.date == 3 && hideTooltip()" ref="num3" num="3" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 4 && showTooltip($event)" @mouseleave="lottery.date == 4 && hideTooltip()" ref="num4" num="4" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 5 && showTooltip($event)" @mouseleave="lottery.date == 5 && hideTooltip()" ref="num5" num="5" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 6 && showTooltip($event)" @mouseleave="lottery.date == 6 && hideTooltip()" ref="num6" num="6" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 7 && showTooltip($event)" @mouseleave="lottery.date == 7 && hideTooltip()" ref="num7" num="7" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 8 && showTooltip($event)" @mouseleave="lottery.date == 8 && hideTooltip()" ref="num8" num="8" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 9 && showTooltip($event)" @mouseleave="lottery.date == 9 && hideTooltip()" ref="num9" num="9" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 10 && showTooltip($event)" @mouseleave="lottery.date == 10 && hideTooltip()" ref="num10" num="10" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 11 && showTooltip($event)" @mouseleave="lottery.date == 11 && hideTooltip()" ref="num11" num="11" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 12 && showTooltip($event)" @mouseleave="lottery.date == 12 && hideTooltip()" ref="num12" num="12" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 13 && showTooltip($event)" @mouseleave="lottery.date == 13 && hideTooltip()" ref="num13" num="13" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 14 && showTooltip($event)" @mouseleave="lottery.date == 14 && hideTooltip()" ref="num14" num="14" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 15 && showTooltip($event)" @mouseleave="lottery.date == 15 && hideTooltip()" ref="num15" num="15" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 16 && showTooltip($event)" @mouseleave="lottery.date == 16 && hideTooltip()" ref="num16" num="16" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 17 && showTooltip($event)" @mouseleave="lottery.date == 17 && hideTooltip()" ref="num17" num="17" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 18 && showTooltip($event)" @mouseleave="lottery.date == 18 && hideTooltip()" ref="num18" num="18" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 19 && showTooltip($event)" @mouseleave="lottery.date == 19 && hideTooltip()" ref="num19" num="19" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 20 && showTooltip($event)" @mouseleave="lottery.date == 20 && hideTooltip()" ref="num20" num="20" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 21 && showTooltip($event)" @mouseleave="lottery.date == 21 && hideTooltip()" ref="num21" num="21" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 22 && showTooltip($event)" @mouseleave="lottery.date == 22 && hideTooltip()" ref="num22" num="22" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 23 && showTooltip($event)" @mouseleave="lottery.date == 23 && hideTooltip()" ref="num23" num="23" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 24 && showTooltip($event)" @mouseleave="lottery.date == 24 && hideTooltip()" ref="num24" num="24" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 25 && showTooltip($event)" @mouseleave="lottery.date == 25 && hideTooltip()" ref="num25" num="25" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 26 && showTooltip($event)" @mouseleave="lottery.date == 26 && hideTooltip()" ref="num26" num="26" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 27 && showTooltip($event)" @mouseleave="lottery.date == 27 && hideTooltip()" ref="num27" num="27" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="lottery.date == 28 && showTooltip($event)" @mouseleave="lottery.date == 28 && hideTooltip()" ref="num28" num="28" :today="isToday" />
        <dayMonthLottery v-if="month.day >= 29" class="day" @mouseenter="lottery.date == 29 && showTooltip($event)" @mouseleave="lottery.date == 29 && hideTooltip()" ref="num29" num="29" :today="isToday" />
        <dayMonthLottery v-if="month.day >= 30" class="day" @mouseenter="lottery.date == 30 && showTooltip($event)" @mouseleave="lottery.date == 30 && hideTooltip()" ref="num30" num="30" :today="isToday" />
        <dayMonthLottery v-if="month.day >= 31" class="day" @mouseenter="lottery.date == 31 && showTooltip($event)" @mouseleave="lottery.date == 31 && hideTooltip()" ref="num31" num="31" :today="isToday" />
    </div>
</template>
<style>
.markDate{
    @apply bg-white text-brand rounded-full cursor-pointer;
}
.day{
    @apply py-2 px-2 flex justify-center gap-1;
}
.today{
    @apply border border-green-300 rounded-full relative;
}
</style>