<script lang="ts" setup>
    import { ref, toRefs } from 'vue';

    const props = defineProps<{
        rnNo: number;
    }>();
    const noRef = toRefs(props).rnNo;

    const emit = defineEmits<{
        note: [name: string[]];
    }>();

    const notes = ['Ab', 'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#'];
    const rightNotes = ref(
        Array(4)
            .fill(undefined)
            .map(() => notes[Math.floor(Math.random() * notes.length)])
    );

    const resetNotes = () =>
        (rightNotes.value = Array(4)
            .fill(undefined)
            .map(() => notes[Math.floor(Math.random() * notes.length)]));

    defineExpose({ rightNotes, resetNotes });

    let currNotes: string[] = [];
    const ws = new WebSocket(`ws://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}`);
    ws.onopen = () => console.log('open');
    ws.onmessage = async (event) => {
        const text: string = await event.data;
        if (text.includes('start ')) {
            currNotes.push(text.replace('start ', ''));
        } else {
            currNotes = currNotes.filter((e) => e !== text.replace('stop ', ''));
        }
        emit('note', currNotes);
    };
</script>

<template>
    <div class="flex gap-72">
        <p :class="`font-bold text-[20vmin] ${index < noRef && 'text-green-500'}`" v-for="(note, index) in rightNotes">
            {{ note }}
        </p>
    </div>
</template>
