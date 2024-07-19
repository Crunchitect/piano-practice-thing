<script lang="ts" setup>
    import Metronome from '@/components/Metronome.vue';
    import Notes from '@/components/Notes.vue';
    import { ref, computed, onMounted, watch } from 'vue';

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const bpm = ref(60);
    const offset = ref(150);

    const rightNotesNo = ref(0);
    const notesPlayed = ref<string[]>([]);
    const notes = ref<InstanceType<typeof Notes>>();

    const audio = new Audio('./tock.mp3');
    const spb = computed(() => 60 / bpm.value);
    const rightNotes = computed(() => notes.value!.rightNotes);
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
        if (Math.abs(timing) >= offset.value) rightNotesNo.value = 0;
        else if (n.length != 1) rightNotesNo.value = 0;
        else if (!equal(n[0], rightNotes.value[rightNotesNo.value])) rightNotesNo.value = 0;
        else rightNotesNo.value++;

        if (rightNotesNo.value == 5) {
            notes.value!.resetNotes();
            rightNotesNo.value = 0;
        }
    });
</script>

<template>
    <div class="w-screen h-screen overflow-hidden bg-stone-950 text-white">
        <div class="flex flex-wrap justify-center">
            <Notes @note="(e) => (notesPlayed = e)" ref="notes" :rn-no="rightNotesNo" />
            <p>
                Timing window: ±<input
                    class="bg-transparent border-none outline-none"
                    type="text"
                    v-model.number="offset"
                />ms
            </p>
        </div>
        <Metronome :bpm="bpm" class="fixed bottom-56 right-56">
            <input class="bg-transparent text-4xl text-center outline-none border-none" v-model.number="bpm" />
        </Metronome>
    </div>
</template>
