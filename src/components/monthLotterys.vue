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
        }
    },
    methods:{
        isLeapYear(year){
            return new persianDate([year]).isLeapYear()
        },
        showTooltip($event,status,date){
            this.$emit('setTooltip',$event,status,date)
        },
        hideTooltip(){
            this.$emit('hideTooltip')
        },
        checkLeapTooltip(){
            return !this.isLeapYear(this.month.year) && this.lottery.date == 30 && this.month.month == 'اسفند' && this.month.day == 29 && !this.month.justShow
        },
        showTooltipCondition(day,$event){
            if(this.date.year == this.month.year && this.months[this.date.month-1] == this.month.month && day == this.date.day)
                this.$emit('setTooltip',$event,'today')
            if(this.lottery.date == day)
                this.$emit('setTooltip',$event,'dayLottery',[day,this.month.month,this.month.year])

        },
        hideTooltipCondition(day){
            (this.lottery.date == day || (this.date.year == this.month.year && this.months[this.date.month-1] == this.month.month && day == this.date.day )) && this.hideTooltip()
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
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(1,$event)" @mouseleave="hideTooltipCondition(1)" ref="num1" num="1" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(2,$event)" @mouseleave="hideTooltipCondition(2)" ref="num2" num="2" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(3,$event)" @mouseleave="hideTooltipCondition(3)" ref="num3" num="3" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(4,$event)" @mouseleave="hideTooltipCondition(4)" ref="num4" num="4" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(5,$event)" @mouseleave="hideTooltipCondition(5)" ref="num5" num="5" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(6,$event)" @mouseleave="hideTooltipCondition(6)" ref="num6" num="6" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(7,$event)" @mouseleave="hideTooltipCondition(7)" ref="num7" num="7" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(8,$event)" @mouseleave="hideTooltipCondition(8)" ref="num8" num="8" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(9,$event)" @mouseleave="hideTooltipCondition(9)" ref="num9" num="9" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(10,$event)" @mouseleave="hideTooltipCondition(10)" ref="num10" num="10" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(11,$event)" @mouseleave="hideTooltipCondition(11)" ref="num11" num="11" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(12,$event)" @mouseleave="hideTooltipCondition(12)" ref="num12" num="12" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(13,$event)" @mouseleave="hideTooltipCondition(13)" ref="num13" num="13" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(14,$event)" @mouseleave="hideTooltipCondition(14)" ref="num14" num="14" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(15,$event)" @mouseleave="hideTooltipCondition(15)" ref="num15" num="15" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(16,$event)" @mouseleave="hideTooltipCondition(16)" ref="num16" num="16" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(17,$event)" @mouseleave="hideTooltipCondition(17)" ref="num17" num="17" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(18,$event)" @mouseleave="hideTooltipCondition(18)" ref="num18" num="18" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(19,$event)" @mouseleave="hideTooltipCondition(19)" ref="num19" num="19" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(20,$event)" @mouseleave="hideTooltipCondition(20)" ref="num20" num="20" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(21,$event)" @mouseleave="hideTooltipCondition(21)" ref="num21" num="21" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(22,$event)" @mouseleave="hideTooltipCondition(22)" ref="num22" num="22" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(23,$event)" @mouseleave="hideTooltipCondition(23)" ref="num23" num="23" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(24,$event)" @mouseleave="hideTooltipCondition(24)" ref="num24" num="24" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(25,$event)" @mouseleave="hideTooltipCondition(25)" ref="num25" num="25" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(26,$event)" @mouseleave="hideTooltipCondition(26)" ref="num26" num="26" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(27,$event)" @mouseleave="hideTooltipCondition(27)" ref="num27" num="27" :today="isToday" />
        <dayMonthLottery class="day" @mouseenter="showTooltipCondition(28,$event)" @mouseleave="hideTooltipCondition(28)" ref="num28" num="28" :today="isToday" />
        <dayMonthLottery v-if="month.day >= 29" class="day" @mouseenter="showTooltipCondition(29,$event); checkLeapTooltip() && showTooltip($event)" @mouseleave="hideTooltipCondition(29); checkLeapTooltip() && hideTooltip()" ref="num29" num="29" :today="isToday" />
        <dayMonthLottery v-if="month.day >= 30" class="day" @mouseenter="showTooltipCondition(30,$event)" @mouseleave="hideTooltipCondition(30)" ref="num30" num="30" :today="isToday" />
        <dayMonthLottery v-if="month.day >= 31" class="day" @mouseenter="showTooltipCondition(31,$event)" @mouseleave="hideTooltipCondition(31)" ref="num31" num="31" :today="isToday" />
    </div>
</template>
<style>
.markDate{
    @apply bg-white text-brand rounded-full cursor-pointer;
}
.day{
    @apply py-2 px-2 flex justify-center gap-1 cursor-pointer ;
}
.today{
    @apply border border-green-300 rounded-full relative;
}
</style>