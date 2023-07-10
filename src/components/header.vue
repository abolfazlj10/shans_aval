<template>
    <div class="getStarted">
        <div class="ContainerHeader">
            <div class="flex flex-col h-full justify-around w-6/12">
                <div class="space-y-4">
                    <div class="text-2xl">شانس اول پلتفرمی  برای مدیریت و کنترل بهینه قرعه کشی</div>
                    <div class="text-[#FFF]/80 text-sm">با پلتفرم شانس اول این امکان فراهم شده است که قرعه کشی های خود را ایجاد کنید و شرکت کننده های خود را مدیریت کنید یا شرایط قرعه کشی را جهت ثبت نام مورد نظر بگیرید.</div>
                </div>
                <div class="flex justify-center gap-3">
                    <button class="btnGetStarted group">
                        <div>راهنما</div>
                        <i class="ri-file-list-2-fill icon"></i>
                    </button>
                    <button class="btnAdd group">
                        <div>ایجاد</div>
                        <i class="ri-add-box-fill icon"></i>
                    </button>
                    
                </div>
            </div>
            <img class="w-[600px]" src="../assets/img/1.png" alt="">
        </div>
    </div>
</template>
<style scoped>
.getStarted{
    @apply bg-brand text-center w-full h-96;
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