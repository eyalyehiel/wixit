<template>
    <section class="grapich-designer-cards" :style="cmp.style">
        <article :style="card.style" v-for="card in cmp.info">
            <h4 :style="card.title.style">{{ card.title.text }}</h4>
            <p :style="card.paragraph1.style">{{ card.paragraph1.text }}</p>
            <p :style="card.paragraph2.style">{{ card.paragraph2.text }}</p>
            <p :style="card.paragraph3.style">{{ card.paragraph3.text }}</p>
            <button :style="card.btn.style">{{ card.btn.text }}</button>
        </article>
    </section>
</template>

<script setup>
import { defineProps } from "vue"

const { cmp } = defineProps({ cmp: Object })
</script>
