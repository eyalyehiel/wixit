<template>
    <section class="grapich-designer-cards" :style="cmp.style" @click.stop="onEditElement($event, 'site-cards')">
        <article @click.stop="onEditElement($event, 'card')" :style="card.style" v-for="card in cmp.info">
            <h4 :style="card.title.style" @click.stop="onEditElement($event, 'title')">{{ card.title.text }}</h4>
            <p :style="card.paragraph1.style" @click.stop="onEditElement($event, 'paragraph1')">{{ card.paragraph1.text }}</p>
            <p :style="card.paragraph2.style" @click.stop="onEditElement($event, 'paragraph2')">{{ card.paragraph2.text }}</p>
            <p :style="card.paragraph3.style" @click.stop="onEditElement($event, 'paragraph3')">{{ card.paragraph3.text }}</p>
            <button :style="card.btn.style" @click.stop="onEditElement($event, 'btn')">{{ card.btn.text }}</button>
        </article>
    </section>
</template>

<script setup>
import { defineProps } from "vue"

const { cmp } = defineProps({ cmp: Object })
const emit = defineEmits(["onChangeText", "editElement"])
function onEditElement(ev, key) {
    emit("editElement", key)
}
</script>
