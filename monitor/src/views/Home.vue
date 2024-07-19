<script lang="ts" setup>
    import Metronome from '@/components/Metronome.vue';
    import Notes from '@/components/Notes.vue';
    import { ref, computed, onMounted, watch } from 'vue';

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const bpm = ref(60);
    const offset = ref(150);
    const score = ref(0);

    const rightNotesNo = ref(0);
    const notesPlayed = ref<string[]>([]);
    const notes = ref<InstanceType<typeof Notes>>();

    const audio = new Audio('./tock.mp3');
    const spb = computed(() => 60 / bpm.value);
    const rightNotes = computed(() => notes.value!.rightNotes);
    const error = ref('');

    const showError = async (msg: string) => {
        error.value = msg;
        await sleep(2000);
        error.value = '';
    };

    let beatTime = 0;
    onMounted(async () => {
        while (true) {
            await sleep(spb.value * 1000);
            audio.pause();
            audio.currentTime = 0;
            audio.play();
            beatTime = Date.now();
        }
    });

    const equal = (a: string, b: string) => {
        if (a === b) return true;
        switch (a + b) {
            case 'C#Db':
            case 'D#Eb':
            case 'F#Gb':
            case 'G#Ab':
            case 'A#Bb':
                return true;
            default:
                return false;
        }
    };

    watch(notesPlayed, (_, n) => {
        const timing = Date.now() - beatTime;
        if (spb.value - offset.value > timing && timing > offset.value) {
            if (timing < spb.value / 2) showError('Too Early!');
            else showError('Too Late!');
            rightNotesNo.value = 0;
            return;
        }
        if (n.length != 1) {
            showError('More than 1 note!');
            rightNotesNo.value = 0;
            return;
        }
        if (!equal(n[0], rightNotes.value[rightNotesNo.value])) {
            showError(`Wrong Note! You played: ${n[0]} instead of ${rightNotes.value[rightNotesNo.value]}`);
            rightNotesNo.value = 0;
            return;
        }
        rightNotesNo.value++;

        if (rightNotesNo.value == 5) {
            notes.value!.resetNotes();
            score.value++;
            rightNotesNo.value = 0;
        }
    });
</script>

<template>
    <div class="w-screen h-screen overflow-hidden bg-stone-950 text-white">
        <p class="fixed top-0 left-0 p-4 text-8xl font-bold drop-shadow-glow-white">{{ score }}</p>
        <div class="flex flex-wrap flex-col place-content-center h-full">
            <Notes @note="(e) => (notesPlayed = e)" ref="notes" :rn-no="rightNotesNo" />
            <p class="text-center">
                Timing window: ±<input
                    class="bg-transparent border-none outline-none"
                    type="text"
                    v-model.number="offset"
                />ms
            </p>
            <br />
            <p class="text-red-600 animate-shake text-center font-bold">{{ error }}</p>
        </div>
        <Metronome :bpm="bpm" class="fixed bottom-56 right-56">
            <input class="bg-transparent text-4xl text-center outline-none border-none" v-model.number="bpm" />
        </Metronome>
    </div>
</template>
