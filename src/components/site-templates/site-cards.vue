<template>
    <section class="grapich-designer-cards" :style="cmp.style">
        <article v-for="card in cmp.info">
            <h4>{{ card.title }}</h4>
            <p>{{ card.paragraph1 }}</p>
            <p>{{ card.paragraph2 }}</p>
            <p>{{ card.paragraph3 }}</p>
            <button>{{ card.btn }}</button>
        </article>
    </section>
</template>

<script setup>
import { defineProps } from "vue"

const { cmp } = defineProps({ cmp: Object })
</script>
