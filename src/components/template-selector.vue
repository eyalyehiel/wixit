<template>
    <section class="template-selector">
        <article>Empty</article>
        <article v-for="x in 9">
            template #{{x}}
        </article>
    </section>
</template>

<script setup>
import { reactive, toRefs } from 'vue'

</script>

<style lang="scss" scoped>

</style>

