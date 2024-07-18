<script lang="ts" setup>
    const ws = new WebSocket(`ws://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}`);
    const decoder = new TextDecoder();
    ws.onopen = () => console.log('open');
    ws.onmessage = async (event) => {
        console.log(await event.data.text());
    };
</script>

<template></template>
