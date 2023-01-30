<template>
    <section class="graphic-designer-hero" @click.stop="onEditElement($event, 'site-hero')" :style="cmp.style"
        style="background-size: cover; background-position: center;">
        <main>
            <h1 :style="cmp.info.title.style" @click.stop="onEditElement($event, 'title')"
                @input="changeText($event, 'title')" contenteditable="true">
                {{ cmp.info.title.text }}
            </h1>
            <p :style="cmp.info.subtitle.style" @click.stop="onEditElement($event, 'subtitle')"
                @input="changeText($event, 'subtitle')" contenteditable="true">
                {{ cmp.info.subtitle.text }}
            </p>
            <button :style="cmp.info.btn.style" @click.stop="onEditElement($event, 'btn')"
                @input="changeText($event, 'btn')" contenteditable="true">
                {{ cmp.info.btn.text }}
            </button>
        </main>
    </section>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"

const { cmp } = defineProps({ cmp: Object })

const emit = defineEmits(["onChangeText", "editElement"])
function onEditElement(ev, key) {
    emit("editElement", key)
}

function changeText(ev, key) {
    emit("onChangeText", ev.target.innerText, key)
}
</script>
