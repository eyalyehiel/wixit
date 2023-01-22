<template>
    <section
        class="graphic-designer-hero"
        :style="cmp.style"
        style="background-size: cover"
    >
        <main>
            <h1 @input="changeText($event, 'title')" contenteditable="true">
                {{ cmp.info.title.text }}
            </h1>
            <p @input="changeText($event, 'subtitle')" contenteditable="true">
                {{ cmp.info.subtitle.text }}
            </p>
            <button @input="changeText($event, 'btn')" contenteditable="true">
                {{ cmp.info.btn.text }}
            </button>
        </main>
    </section>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"
const emit = defineEmits(["onChangeText"])

const { cmp } = defineProps({ cmp: Object })

function changeText(ev, key) {
    emit("onChangeText", ev, key)
}
</script>
