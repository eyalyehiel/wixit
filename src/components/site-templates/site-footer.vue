<template>
    <footer class="site-footer" :style="cmp.info.style">
        <h1 :style="cmp.info.title.style">{{ cmp.info.title.text }}</h1>
        <p :style="cmp.info.subtitle.style">
            {{
                cmp.info.subtitle.text ||
                "CoffeRights 2035 by. created with Wixit"
            }}
        </p>
    </footer>
</template>

<script setup>
import { defineProps } from "vue"

const { cmp } = defineProps({ cmp: Object })
</script>
