<template>
    <header class="graphic-designer-header">
        <h1>{{ cmp?.info?.title }}</h1>
        <nav>
            <a href="#" v-for="link in cmp?.info?.links">{{ link }}</a>
        </nav>
    </header>
</template>

<script setup>
import { onMounted, defineProps } from 'vue';

const { cmp } = defineProps({ cmp: Object })

onMounted(() => {
    console.log('hi')
})
console.log(cmp)
</script>