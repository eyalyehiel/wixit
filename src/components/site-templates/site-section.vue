<template>
    <section class="graphic-designer-section" :style="cmp.style" style="background-size: cover;">
        <h2 :style="cmp.info.title.style">{{cmp.info.title.text}}</h2>
        <p :style="cmp.info.paragraph1.style">{{cmp.info.paragraph1.text}}</p>
        <p :style="cmp.info.paragraph2.style">{{cmp.info.paragraph2.text}}</p>
        <img v-for="img in cmp.info.images" :src="img" alt="">
    </section>
</template>

<script setup>
import { defineProps } from "vue"

const { cmp } = defineProps({ cmp: Object })
</script>
