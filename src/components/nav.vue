<template>
    <div class="nav">
        <div class="title"><router-link to="/">شانس اول</router-link></div>
        <div class="linkNav text-sm">
            <div>ایجاد</div>
            <div>قرعه کشی ها</div>
            <div>گیت هاب</div>
            <div>درباره ما</div>
        </div>
        <router-link to="/" class="login">ورود</router-link>
    </div>
</template>
<style scoped>
.nav{
    @apply container flex items-center gap-2 px-5 py-2 border-b ;
}
.title{
    @apply w-1/12 text-2xl text-brand;
}
.linkNav{
    @apply w-10/12 flex gap-12;
}
.login{
    @apply w-1/12 mr-auto text-center bg-brand rounded-md text-white py-2;
}
</style>