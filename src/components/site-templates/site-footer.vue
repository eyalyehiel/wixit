<template>
    <div class="footer" :style="props.info.style">
        <h1>{{ props.info.title }}</h1>
        <p>{{ props.info.text || 'CoffeRights 2035 by. created with Wixit' }}</p>

    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({ info: Object })
</script>