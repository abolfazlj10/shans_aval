<script>
import fream from './fream.vue';
export default{
    components:{fream}
}
</script>
<template>
    <fream v-slot="propsParent">
        {{ propsParent.changer(3) }}
        forgot
    </fream>
</template>