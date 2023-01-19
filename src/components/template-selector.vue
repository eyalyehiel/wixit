<template>
    <h2>Choose a template for your website</h2>
    <section v-if="templateStore.templates" class="template-selector">
        <article>
            <section class="article-cover" style="background-color: antiquewhite;">
                <div>
                    <button class="edit-btn" @click="() => router.push(`site/edit`)">Edit</button>
                </div>
            </section>
            Empty
        </article>
        <article v-for="template in templateStore.templateToShow.value"
            :style="{ 'background-image': `url( ${template.background})` }">
            <section class="article-cover">
                <div>
                    <button @click="() => router.push(`site/${template._id}`)" class="preview-btn">Preview</button>
                    <button @click="() => router.push(`site/edit/${template._id}`)" class="edit-btn">Edit</button>
                </div>
            </section>
            {{ template.name || 'coffee shop' }}
        </article>
    </section>
</template>

<script setup>
import { onMounted } from "vue"
import { useRouter } from 'vue-router'
import { siteService } from "../services/site-service.js"
import { useTemplateStore } from '../stores/template.js'

const router = useRouter()

const templateStore = useTemplateStore()

onMounted(() => {
    templateStore.loadTemplates()
})
</script>
