<template>
    <section class="site-gallery">
        <img v-for="img in cmp.info.imgs" :src="img" alt="">
    </section>
</template>

<script setup>
import { defineProps } from 'vue';

const { cmp, isEdit } = defineProps({ cmp: Object, isEdit: Boolean })
</script>