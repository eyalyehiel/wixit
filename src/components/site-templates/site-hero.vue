<template>
    <section class="hero" :style="cmp.style">
        <div class="main">
            <h1>{{ cmp.info.title }}</h1>
            <p>{{ cmp.info.subtitle }}</p>
            <button>{{ cmp.info.btn }}</button>
        </div>
    </section>
</template>

<script setup>
import { defineProps } from 'vue';

const { cmp } = defineProps({ cmp: Object })
</script>