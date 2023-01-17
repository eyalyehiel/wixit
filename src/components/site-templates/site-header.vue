<template>
    <header class="graphic-designer-header">
        <h1>{{ cmp.info.title }}</h1>
        <nav>
            <a :href="href" v-for="{ text, href } in cmp.info.links">{{ text }}</a>
        </nav>
    </header>
</template>

<script setup>
import { onMounted, defineProps } from 'vue';

const { cmp } = defineProps({ cmp: Object })

onMounted(() => {
    console.log(cmp)
})
</script>