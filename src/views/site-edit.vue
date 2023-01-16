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
import { siteService } from "../services/site-service.js"

let siteToEdit = ref({})
const route = useRoute()

onMounted(async () => {
    
    const { id } = route.params
    siteToEdit.value = id ? await siteService.getById(id) : siteService.getEmptySite()
    console.log('this.siteToEdit', siteToEdit )
})

</script>
