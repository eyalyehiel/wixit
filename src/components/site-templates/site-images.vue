<template>
    <div class="images">
        <img v-for="img in cmp.info.imgs" :src="img" alt="">
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const { cmp } = defineProps({ cmp: Object })
</script>