<template>
    
    <section class="graphic-designer-hero" :style="cmp.style" style="background-size: cover;">
        <main>
            <h1>{{ cmp.info.title }}</h1>
            <p>{{ cmp.info.subtitle }}</p>
            <button>{{ cmp.info.btn }}</button>
        </main>
    </section>

</template>

<script setup>
import { defineProps } from 'vue';

const { cmp } = defineProps({ cmp: Object })
</script>