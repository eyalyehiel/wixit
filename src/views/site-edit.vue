<template>
    <section class="site-edit">
        <section class="editor-nav"></section>
        <section class="editor-tools"></section>
        <section class="site-display">
            <pre>

                {{ siteToEdit }}
            </pre>
        </section>
    </section>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue"
import { useRoute } from "vue-router"
import { siteService } from "../services/stay-service-local.js"

let siteToEdit = ref({})
const route = useRoute()

onMounted(async () => {
    const { id } = route.params
    const newSite = await siteService.getById(id)
    siteToEdit.value = newSite
})

</script>
