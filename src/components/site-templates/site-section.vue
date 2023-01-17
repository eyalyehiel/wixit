<template>
    <section class="graphic-designer-section">
        <h2>{{cmp.info.title}}</h2>
        <p>{{cmp.info.paragraph1}}</p>
        <p>{{cmp.info.paragraph2}}</p>
        <img v-for="img in cmp.info.images" :src="img" alt="">
    </section>
</template>

<script setup>
import { defineProps } from "vue"

const { cmp } = defineProps({ cmp: Object })
</script>
