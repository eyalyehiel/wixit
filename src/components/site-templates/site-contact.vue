<template>
    <section class="site-contact">
        <img :src="cmp.info.img" alt="">
        <form action="">
            <label :contenteditable="isEdit">
                {{ cmp.info.name }}
                <input type="text" placeholder="Enter your name">
            </label>
            <label :contenteditable="isEdit">
                {{ cmp.info.name }}
                <input type="text" placeholder="Enter your email">
            </label>
            <label :contenteditable="isEdit">
                {{ cmp.info.name }}
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </label>
        </form>
    </section>
</template>

<script setup>
import { defineProps } from 'vue';

const { cmp, isEdit } = defineProps({ cmp: Object, isEdit: Boolean })
</script>