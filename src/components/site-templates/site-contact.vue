<template>
    <div class="contact">
        <img :src="cpm.info.img" alt="">
        <form action="">
            <label>
                {{ cpm.info.name }}
                <input type="text" placeholder="Enter your name">
            </label>
            <label>
                {{ cpm.info.name }}
                <input type="text" placeholder="Enter your email">
            </label>
            <label>
                {{ cpm.info.name }}
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </label>
        </form>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const { cmp } = defineProps({ cmp: Object })
</script>