<script lang="ts" setup>
    import { ref } from 'vue';

    const color = ref('bg-slate-800');
</script>

<template>
    <div
        :class="`w-[13.7mm] h-2/4 ${color} rounded shadow-inner`"
        @touchstart="color = 'bg-black'"
        @touchend="color = 'bg-slate-800'"
        @touchcancel="color = 'bg-slate-800'"
    ></div>
</template>
