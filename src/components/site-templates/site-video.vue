<template>
    <section class="graphic-designer-video">
        <h1>Check out our last video</h1>
        <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
            aspernatur libero non voluptatum? Error fugiat temporibus cumque
            quaerat, iure corporis enim impedit corrupti labore. Atque
            aspernatur minima rerum magnam dolore?
        </p>
        <iframe :src="cmp.info.videoUrl" frameborder="0"></iframe>
    </section>
</template>

<script setup>
import { defineProps } from "vue";

const { cmp } = defineProps({ cmp: Object });
</script>
