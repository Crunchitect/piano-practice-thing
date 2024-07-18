<script setup lang="ts">
    import { ref } from 'vue';

    const color = ref('bg-slate-200');
</script>

<template>
    <div
        :class="[`w-[23.5mm] h-full rounded shadow-inner`, color]"
        @touchstart="color = 'bg-slate-300'"
        @touchend="color = 'bg-slate-200'"
        @touchcancel="color = 'bg-slate-200'"
    ></div>
</template>
