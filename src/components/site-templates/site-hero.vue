<template>
    <section class="hero" :style="info.style">
        <div class="main">
            <h1>{{ info.title }}</h1>
            <p>{{ info.subtitle }}</p>
            <button>{{ info.btn }}</button>
        </div>
    </section>
</template>

<script setup>
import { defineProps } from 'vue';

const { info } = defineProps({ info: Object })
</script>