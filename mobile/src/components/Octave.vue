<script lang="ts" setup>
    import { ref } from 'vue';
    import WhiteKey from './WhiteKey.vue';
    import BlackKey from './BlackKey.vue';

    const whiteNotes = ref(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
    const blackNotes = ref(['C#', 'D#', null, 'F#', 'G#', 'A#']);

    const ws = new WebSocket(`ws://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}`);

    const noteStart = (note: string) => ws.send('start ' + note);
    const noteStop = (note: string) => ws.send('stop ' + note);
</script>

<template>
    <div class="relative h-full drop-shadow-[0_100px_100px_rgb(255,255,255)]">
        <div class="absolute flex h-full">
            <WhiteKey
                v-for="note in whiteNotes"
                @touchstart="noteStart(note)"
                @touchend="noteStop(note)"
                @touchcancel="noteStop(note)"
            />
        </div>
        <div class="absolute flex h-full gap-[11.75mm] ml-[16.65mm] pointer-events-none">
            <div v-for="note in blackNotes" class="flex-1 pointer-events-auto">
                <BlackKey
                    v-if="note"
                    @touchstart="noteStart(note)"
                    @touchend="noteStop(note)"
                    @touchcancel="noteStop(note)"
                />
                <div class="w-[6mm]" v-else></div>
            </div>
        </div>
    </div>
</template>
