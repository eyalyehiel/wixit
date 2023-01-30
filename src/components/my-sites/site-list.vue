<template>
    <section class="site-list">
        <site-preview v-for="site in sites" :site="site" :key="site._id" />
    </section>
</template>

<script setup>
import SitePreview from './site-preview.vue';
import { defineProps } from 'vue';

const { sites } = defineProps({ sites: Array })
</script>