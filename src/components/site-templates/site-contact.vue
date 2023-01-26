<template>
    <section class="graphic-designer-contact">
        <img :src="cmp.info.img" alt="">
        <form action="">
            <label>
                {{ cmp.info.name }}
                <input type="text" placeholder="Enter your name">
            </label>
            <label>
                {{ cmp.info.name }}
                <input type="text" placeholder="Enter your email">
            </label>
            <label>
                {{ cmp.info.name }}
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </label>
        </form>
    </section>
</template>

<script setup>
import { defineProps } from 'vue';

const { cmp } = defineProps({ cmp: Object })
</script>