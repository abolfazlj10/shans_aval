<script>
export default{
    props:['num','today']
}
</script>
<template>
    <div>
        <i v-if="num == today" class="ri-bookmark-fill text-green-300 absolute -right-1 bottom-5"></i>
        <div>{{ num }}</div>
    </div>
</template>