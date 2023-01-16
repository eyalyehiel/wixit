<template>
    <div class="footer" :style="cmp.info.style">
        <h1>{{ cmp.info.title }}</h1>
        <p>{{ cmp.info.text || 'CoffeRights 2035 by. created with Wixit' }}</p>

    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const { cmp } = defineProps({ cmp: Object })
</script>