<script lang="ts" setup>
    import { RouterView } from 'vue-router';
    import { onMounted } from 'vue';
    const full = async () => {
        await document.body.requestFullscreen();
    };
</script>

<template>
    <RouterView @click="full" />
</template>
