<script lang="ts" setup>
    import { computed, onMounted, toRefs, ref } from 'vue';
    const props = defineProps<{
        bpm: number;
    }>();
    const bpmRef = toRefs(props).bpm;

    const spb = computed(() => 60 / bpmRef.value);
</script>

<template>
    <div class="">
        <div class="statica absolute w-[10vw] aspect-square rounded-full flex flex-wrap place-content-center text-4xl">
            <slot></slot>
        </div>
        <div
            class="absolute w-[10vw] aspect-square rounded-full flex flex-wrap place-content-center text-4xl pointer-events-none blink"
        ></div>
    </div>
</template>

<style lang="css" scoped>
    .blink {
        animation: ping calc(v-bind(spb) * 1s) infinite;
    }

    .blink,
    .statica {
        background-color: hsl(calc(v-bind(spb) * 10deg), 100%, 70%);
    }
</style>
