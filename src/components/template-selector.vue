<template>
    <h2>Choose a template for your website</h2>
    <section v-if="templateStore.templates" class="template-list">
        <article class="template-preview">
            <section class="article-cover">
                <div class="actions">
                    <button class="btn-edit btn-pill-blue" @click="() => router.push(`site/edit`)">Edit</button>
                </div>
            </section>
            Empty
        </article>
        <!-- :style="{ 'background-image': `url( ${template.background})` }" -->
        <article class="template-preview" v-for="template in templateStore.templateToShow.value">
            <img :src="template.background" alt="">
            <p>{{ template.name || 'coffee shop' }}</p>
            <section class="article-cover">
                <div class="actions">
                    <button @click="() => router.push(`site/edit/${template._id}`)"
                        class="btn-edit btn-pill-blue">Edit</button>
                    <button @click="() => router.push(`site/${template._id}`)"
                        class="btn-view btn-pill-blue">View</button>
                </div>
            </section>
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
