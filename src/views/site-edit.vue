<template>
    <section class="site-edit">
        <section class="editor-nav"></section>
        <section class="editor-tools"></section>
        <section class="site-display">
            {{ siteToEdit }}
        </section>
    </section>
</template>

<script setup>
import { onMounted, reactive } from "vue"
import { useRoute } from "vue-router"
import { siteService } from "../services/stay-service-local.js"

let siteToEdit = reactive({ site: "" })
const route = useRoute()

onMounted(async () => {
    const { id } = route.query
    siteToEdit = await siteService.getById(id)
    console.log("siteToEdit", siteToEdit)
})
</script>
