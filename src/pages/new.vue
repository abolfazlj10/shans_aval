<script>
import Num2persian from 'num2persian';
export default{
    data(){
        return{
            level:1,
            notValid:[],
            banksNum:[
                {bank:'ملی ایران',code:603799},
                {bank:'سپه',code:589210},
                {bank:'توسعه صادرات',code:627648},
                {bank:'صنعت و معدن',code:627961},
                {bank:'کشاورزی',code:603770},
                {bank:'مسکن',code:628023},
                {bank:'پست بانک ایران',code:627760},
                {bank:'توسعه تعاون',code:502908},
                {bank:'اقتصاد نوین',code:627412},
                {bank:'پارسیان',code:622106},
                {bank:'پاسارگاد',code:502229},
                {bank:'کارآفرین',code:627488},
                {bank:'سامان',code:621986},
                {bank:'سینا',code:639346},
                {bank:'سرمایه',code:639607},
                {bank:'تات',code:636214},
                {bank:'شهر',code:502806},
                {bank:'دی',code:502938},
                {bank:'صادرات',code:603769},
                {bank:'ملت',code:610433},
                {bank:'تجارت',code:627353},
                {bank:'رفاه',code:589463},
                {bank:'انصار',code:627381},
                {bank:'مهر اقتصاد',code:639370},
            ],
            bankUser:{bank:null,code:null},
            priceChar:null,
            nameMain:null,
            numPhone:{phone1:null,phone2:null,phone3:null},
            nameManager:null,
            numCard:{card1:null,card2:null,card3:null,card4:null},
            managerCard:null,
            people:0,
            price:null,
            date:null,
            description:null,
            activeUser:1,
            emptyUser:[],
            normalLottery:true,
        }
    },
    methods:{
        validatData(){
            this.notValid = []
            if(this.level == 2){
                const one = this.$refs.nameMain.value
                const phone1 = this.$refs.phone1.value
                const phone2 = this.$refs.phone2.value
                const phone3 = this.$refs.phone3.value
                const lengthPhone = phone1.length + phone2.length + phone3.length
                const nameManager = this.$refs.managerInp.value
                const card1 = this.$refs.card1.value
                const card2 = this.$refs.card2.value
                const card3 = this.$refs.card3.value
                const card4 = this.$refs.card4.value
                const lengthCard = card1.length + card2.length + card3.length + card4.length
                const nameManagerCard = this.$refs.managerCard.value
                const lengthUsers = this.$refs.lengthUsers.value.match(/^\d+$/);
                const isLengthUsers = this.$refs.lengthUsers.value
                const price = this.$refs.priceAll.value.match(/^\d+$/);
                const isPrice = this.$refs.priceAll.value
                const isDate = this.$refs.date.value
                
                if(one == '')  this.notValid.push(1)
                if(lengthPhone != 11) this.notValid.push(2)
                if(!phone1.includes('09') && !this.notValid.includes(2)) this.notValid.push(3)
                if(nameManager == '')  this.notValid.push(4)
                if(lengthCard != 16) this.notValid.push(5)
                if(nameManagerCard == '')  this.notValid.push(6)
                if(lengthUsers == null)  this.notValid.push(7)
                if(price == null)  this.notValid.push(8)
                if(isLengthUsers == '')  this.notValid.push(9)
                if(isPrice == '')  this.notValid.push(10)
                if(isDate == '')  this.notValid.push(11)
                if(isLengthUsers != '' && (isLengthUsers >= 100 || isLengthUsers <= 0)) this.notValid.push(12)
                if(isDate != '' && (isDate >= 30 || isDate <= 0)) this.notValid.push(13)

            }
        },
        beforeNumCard(){
            const card1 = this.$refs.card1.value
            const card2 = this.$refs.card2.value
            const sumNum = card1 + card2.substring(0,2)
            this.bankUser = this.banksNum.find(item=> sumNum == item.code)
            if(!this.bankUser) this.bankUser = {bank:'notFound',code:sumNum}
        },
        convertPriceToChar($event){
            const val = $event.target.value
            if(val.length > 3)
                this.priceChar = Num2persian(val) + ' تومان'
            else
                this.priceChar = null
        },
        unblueInpPhone(i){
            document.getElementById('phone_'+i).focus()
        },
        unblueInpName(i){
            document.getElementById('name_'+i).focus()
            this.activeUser++
        },
        checkUsers(){
            this.emptyUser = []
            for (let i = 1; i <= this.people; i++) {
                const elName = document.getElementById('name_'+i).value
                const elPhone= document.getElementById('phone_'+i).value
                if(elName == '' || elPhone == '')
                    this.emptyUser.push('user_'+i)
            }
        },
        btnNext(){
            if(this.level == 3)
                this.checkUsers
            else 
                this.validatData()
            this.notValid.length == 0 && this.level++
            
        }
    }
}
</script>
<template>
    <div class="containerMain">
        <div style="background-image: url(../../public/BG.png);" class="bg-cover">1</div>
        <div class="containerSlides">
            <div class="titleSlided">
                <div>
                    <div class="mainTitle">شانس اول</div>
                    <div class="subTitle">پلتفرم نوین قرعه کشی</div>
                </div>
                <img class="imgBrand" src="../../public/SA.ico" alt="icon shans aval">
            </div>
            <div class="slider">
                <Transition name="slide-fade">
                    <div v-if="level == 1" class="slide1">
                        <div class="itemGetstarted">
                            <div>من میخواهم یک قرعه کشی جدید را ایجاد کنم</div>
                            <input class="cursor-pointer" @click="normalLottery = true" :checked="normalLottery" type="radio" name="test">
                        </div>
                        <div class="itemGetstarted">
                            <div>قرعه کشی من در حال اجرا است ولی میخواهم آن را به صورت نوین و با پلتفرم شانس اول مدیریت کنم</div>
                            <input class="cursor-pointer" @click="normalLottery = false" :checked="!normalLottery"  type="radio" name="test">
                        </div>
                    </div>
                    <div v-else-if="level == 2" class="slide2">
                        <div>
                            <div class="containerInputs">
                                <div class="labelInput">نام قرعه کشی:</div>
                                <input :class="notValid.includes(1) && '!border-red-500'" v-model="nameMain" class="inps text-center sizeInp widthFull900px" @input="notValid.includes(1) && validatData()" placeholder="مثال : خانگی" @keyup.enter="$refs.phone1.focus()" ref="nameMain" type="text" maxlength="40">
                                <div v-if="notValid.includes(1)" class="fildErr">فیلد بالا را پر کنید.</div>
                            </div>
                        </div>
                        <div class="twoInpt">
                            <div class="containerInputs">
                                <div class="labelInput">شماره تماس:</div>
                                <div :class="(notValid.includes(2) || notValid.includes(3)) ? '!border-red-500' : 'focus-within:!border-white'" class="inps widthFull900px w-52 grid grid-cols-3 " dir="ltr">
                                    <input type="text" v-model="numPhone.phone1" ref="phone1" @input="$event.target.value.length == 4 && $refs.phone2.focus() ; (notValid.includes(2) || notValid.includes(3)) && validatData();" class="inps phoneInp" placeholder="09××">
                                    <input type="text" v-model="numPhone.phone2" ref="phone2" @input="$event.target.value.length == 3 && $refs.phone3.focus() ; (notValid.includes(2) || notValid.includes(3)) && validatData();" @keydown.backspace="$event.target.value == '' && $refs.phone1.focus()" class="inps phoneInp" placeholder="×××">
                                    <input type="text" v-model="numPhone.phone3" ref="phone3" @input="$event.target.value.length == 4 && $refs.managerInp.focus() ; (notValid.includes(2) || notValid.includes(3)) && validatData();" @keydown.backspace="$event.target.value == '' && $refs.phone2.focus()" class="inps phoneInp" placeholder="××××">
                                </div>
                                <div v-if="notValid.includes(2) || notValid.includes(3)" class="fildErr">شماره تماس معتبر نمی باشد.</div>
                            </div>
                            <div class="containerInputs">
                                <div class="labelInput">نام مدیر قرعه کشی:</div>
                                <input type="text" v-model="nameManager" :class="notValid.includes(4) && '!border-red-500'" ref="managerInp" @input="notValid.includes(4) && validatData()" class="inps widthFull900px h-min" @keyup.enter="$refs.card1.focus()" placeholder="مثال : ابوالفضل جمشیدی" maxlength="40">
                                <div v-if="notValid.includes(4)" class="fildErr">فیلد بالا را پر کنید.</div>
                            </div>
                        </div>
                        <div class="twoInpt">
                            <div class="containerInputs">
                                <div class="labelInput">شماره کارت:</div>
                                <div :class="notValid.includes(5) ? '!border-red-500' : 'focus-within:!border-white'" class="inps widthFull900px w-52 grid grid-cols-4" dir="ltr">
                                    <input type="text" v-model="numCard.card1" ref="card1" @input="$event.target.value.length == 4 && $refs.card2.focus();notValid.includes(5) && validatData(); beforeNumCard()" class="inps phoneInp" placeholder="××××">
                                    <input type="text" v-model="numCard.card2" ref="card2" @input="$event.target.value.length == 4 && $refs.card3.focus();notValid.includes(5) && validatData(); beforeNumCard()" @keydown.backspace="$event.target.value == '' && $refs.card1.focus()" class="inps phoneInp" placeholder="××××">
                                    <input type="text" v-model="numCard.card3" ref="card3" @input="$event.target.value.length == 4 && $refs.card4.focus();notValid.includes(5) && validatData(); beforeNumCard()" @keydown.backspace="$event.target.value == '' && $refs.card2.focus()" class="inps phoneInp" placeholder="××××">
                                    <input type="text" v-model="numCard.card4" ref="card4" @input="$event.target.value.length == 4 && $refs.managerCard.focus();notValid.includes(5) && validatData(); beforeNumCard()" @keydown.backspace="$event.target.value == '' && $refs.card3.focus()" class="inps phoneInp" placeholder="××××">
                                </div>
                                <div v-if="notValid.includes(5)" class="fildErr">شماره کارت معتبر نمی باشد.</div>
                                <div v-else-if="bankUser.bank != 'notFound' && bankUser.bank != null" class="fildErr !text-green-400">{{  ('بانک ' + bankUser.bank) }}</div>
                                <div v-else-if="bankUser.bank != null" class="fildErr">شماره کارت معتبر نمی باشد.</div>
                            </div>
                            <div class="containerInputs">
                                <div class="labelInput">نام مالک کارت:</div>
                                <input type="text" v-model="managerCard" :class="notValid.includes(6) ? '!border-red-500' : 'focus-within:!border-white'" ref="managerCard" @input="notValid.includes(6) && validatData()" class="inps widthFull900px h-min" @keyup.enter="$refs.lengthUsers.focus()" maxlength="40" placeholder="مثال : ابوالفضل جمشیدی">
                                <div v-if="notValid.includes(6)" class="fildErr">فیلد بالا را پر کنید.</div>
                            </div>
                        </div>
                        <div class="twoInpt">
                            <div class="containerInputs !w-full">
                                <div class="labelInput w-full">تعدا شرکت کنندگان:</div>
                                <input type="number" :class="(notValid.includes(9) || notValid.includes(7) || notValid.includes(12)) ? '!border-red-500' : 'focus-within:!border-white'" v-model="people" ref="lengthUsers" @input="(notValid.includes(9) || notValid.includes(7) || notValid.includes(12)) && validatData()" @keyup.enter="$refs.priceAll.focus()" min="0" max="99" maxlength="2" class="inps widthFull900px h-min w-full" placeholder="بین 1 تا 99">
                                <div v-if="notValid.includes(9)" class="fildErr">فیلد بالا را پر کنید.</div>
                                <div v-else-if="notValid.includes(7)" class="fildErr">معتبر نمی باشد.</div>
                                <div v-else-if="notValid.includes(12)" class="fildErr">عدد ورودی باید بین 1 تا 99 باشد.</div>
                                <div v-else-if="people" class="fildErr !text-green-400">{{ people }} نفر</div>
                            </div>
                            <div class="containerInputs">
                                <div class="labelInput">مبلغ قرعه کشی:</div>
                                <input type="text" v-model="price" :class="(notValid.includes(10) || notValid.includes(8)) ? '!border-red-500' : 'focus-within:!border-white'" @input=" (notValid.includes(8) || notValid.includes(10))  && validatData();convertPriceToChar($event);" @keyup.enter="$refs.date.focus()" ref="priceAll" maxlength="12" class="inps widthFull900px h-min" placeholder="مثال : 20000">
                                <div v-if="notValid.includes(10)" class="fildErr">فیلد بالا را پر کنید.</div>
                                <div v-else-if="notValid.includes(8)" class="fildErr">معتبر نمی باشد.</div>
                                <div v-else class="fildErr !text-green-400">{{ priceChar }}</div>
                            </div>
                        </div>
                        <div>
                            <div class="containerInputs">
                                <div class="labelInput">تاریخ قرعه کشی :</div>
                                <input type="number" :class="(notValid.includes(11) || notValid.includes(13)) ? '!border-red-500' : 'focus-within:!border-white'" v-model="date" ref="date" @input="(notValid.includes(11) || notValid.includes(13)) && validatData()" @keyup.enter="$refs.description.focus()" class="inps widthFull900px w-full text-center sizeInp" min="0" max="29" placeholder="بین 1 تا 29">
                                <div v-if="notValid.includes(11)" class="fildErr">فیلد بالا را پر کنید.</div>
                                <div v-else-if="notValid.includes(13)" class="fildErr">عدد ورودی باید بین 1 تا 29 باشد.</div>
                                <div v-else-if="date" class="fildErr !text-green-400">{{ date }} ام</div>
                            </div>
                        </div>
                        <div>
                            <div class="containerInputs !w-auto">
                                <div class="labelInput">توضیحات:</div>
                                <textarea ref="description" v-model="description" class="inps widthFull900px w-full resize-none" placeholder="مثال : قوانین و نکته های قرعه کشی"></textarea>
                            </div>
                        </div>
                    </div>
                    <div v-else class="slide3">
                        <div v-for="i in people" class="grid grid-rows-[1fr_20px] gap-1">
                            <div :class="activeUser == i && '!opacity-100'" @click="activeUser = i" class="userBox">
                                <div class="idPic">
                                    <div class="flex-grow"><img class="w-10" src="../../public/User.png" alt=""></div>
                                    <div class="flex-grow text-2xl">{{ i }}</div>
                                </div>    
                                <div class="dataInfoUser">
                                    <i class="ri-user-6-line"></i>
                                    <input type="text" :id="`name_${i}`" @keydown.enter="unblueInpPhone(i)" class="w-full h-2 text-xs placeholder:text-xs inps" placeholder="نام">
                                </div>                            
                                <div class="dataInfoUser">
                                    <i class="ri-phone-line"></i>
                                    <input type="text" :id="`phone_${i}`" @keydown.enter="i+1 <= people && unblueInpName(i+1)" class="w-full h-2 text-xs placeholder:text-xs inps" placeholder="شماره تماس">
                                </div>  
                                <div v-if="!normalLottery" class="dataInfoUser">
                                    <input type="checkbox">
                                    <div class="text-xs mr-1">قبلا برنده شده است.</div>
                                </div>  
                            </div>
                            <div v-if="emptyUser.includes('user_'+i)" class="fildErr">فیلد های بالا را کامل کنید.</div>                          
                        </div>
                    </div>
                </Transition>
            </div>
            <div class="containerNavigator">
                <div @click="btnNext" class="btnNav group">
                    <div class="group-hover:scale-125"><i class="ri-arrow-right-s-line"></i></div>
                    <div>بعدی</div>
                </div>
                <div class="grid grid-cols-3 rounded gap-4">
                    <div class="navigateSlide" :class="[(level == 3 && 'activeLevel'),(level > 3 && 'doneItem')]">3</div>
                    <div class="navigateSlide" :class="[(level == 2 && 'activeLevel'),(level > 2 && 'doneItem')]">2</div>
                    <div class="navigateSlide" :class="[(level == 1 && 'activeLevel'),(level > 1 && 'doneItem')]">1</div>
                </div>
                <div @click="level != 1 && level--" class="btnNav group">
                    <div>قبلی</div>
                    <div class="group-hover:scale-125"><i class="ri-arrow-left-s-line"></i></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.containerMain{
    @apply text-white max-h-screen grid grid-cols-2 gap-3 max-[600px]:grid-cols-none max-[600px]:gap-0 max-[600px]:grid-rows-[100px_1fr] max-[600px]:h-screen;
}
.containerSlides{
    @apply bg-brand p-2 max-h-screen min-h-screen grid grid-rows-[auto_1fr_auto] max-[600px]:rounded-t-[50px] max-[600px]:max-h-screen max-[600px]:min-h-0 max-[600px]:-mt-10;
}
.slider{
    @apply flex-grow flex items-center justify-center overflow-y-auto mb-3;
}
.activeLevel{
    @apply border-b border-brand;
}
.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
.containerInputs{
    @apply w-fit m-auto grid grid-rows-[auto_1fr_5px] max-[900px]:w-full;
}
.labelInput{
    @apply text-right mr-2 bg-brand -mb-3 z-20 relative w-fit px-1;
}
.inps{
    @apply bg-inherit border duration-200 pl-5 pr-3 py-3 rounded-lg border-white/50 outline-none placeholder:text-white/70 focus:placeholder:text-white/80 max-[600px]:placeholder:text-xs;
}
.phoneInp{
    border: none;
    border-bottom:1px solid rgb(255, 255, 255 , 0.5);
    @apply rounded-none mx-1 !px-0 !py-0 h-min text-center;
}
.navigateSlide{
    @apply px-4 duration-200 select-none;
}
.slide1{
    @apply flex flex-col gap-3 max-[1300px]:gap-7 max-[900px]:text-sm;
}
.slide2{
    @apply text-sm text-center grid grid-rows-6 mb-auto gap-2 max-[900px]:grid-rows-none max-[900px]:w-full max-[900px]:px-10 max-[900px]:gap-4 max-[600px]:grid-rows-6 max-[600px]:mx-10 max-[500px]:mx-5 max-[400px]:grid-rows-none;
}
.slide3{
    @apply flex-grow h-full grid grid-cols-5 auto-rows-min gap-3 px-3 items-start max-[1760px]:grid-cols-4 max-[1760px]:gap-1 max-[1760px]:gap-x-5 max-[1400px]:grid-cols-3 max-[1100px]:grid-cols-2 max-[700px]:grid-cols-1 max-[700px]:px-10 max-[600px]:grid-cols-2 max-[400px]:grid-cols-1;
}
.itemGetstarted{
    @apply flex flex-row-reverse justify-end gap-3;
}
.titleSlided{
    @apply my-10 flex justify-center gap-5;
}
.mainTitle{
    @apply text-3xl;
}
.subTitle{
    @apply text-xs text-white/80 mt-1;
}
.imgBrand{
    @apply w-14 border border-white/50;
}
.containerNavigator{
    @apply bg-white/90 text-brand py-2 px-3 flex rounded justify-between items-center max-[900px]:text-sm;
}
.btnNav{
    @apply flex cursor-pointer select-none;
}
.doneItem{
    @apply bg-brand text-white rounded;
}
.fildErr{
    @apply text-xs text-red-500 mt-2 text-right mr-3 max-[1760px]:mt-0;
}
.twoInpt{
    @apply grid grid-cols-2 gap-4 max-[900px]:grid-cols-1 max-[600px]:grid-cols-2 max-[400px]:grid-cols-1;
}
.sizeInp{
    @apply w-48
}
.userBox{
    @apply text-sm border border-white/50 px-3 py-2 rounded-md flex flex-col gap-4 opacity-50 duration-100 ;
}
.idPic{
    @apply flex items-center;
}
.dataInfoUser{
    @apply flex gap-2 items-center;
}
.widthFull900px{
    @apply max-[900px]:w-full;
}
</style>