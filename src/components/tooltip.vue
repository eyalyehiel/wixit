<template>
    <section class="tooltip">{{ text }}</section>
</template>

<script setup>
import { defineProps } from "vue"

const { text } = defineProps({ text: String })
</script>
