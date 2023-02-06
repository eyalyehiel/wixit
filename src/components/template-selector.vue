<template>
    <section class="template-selector">
        <header class="template-selector-header">
            <div>
                <h2>Pick the Website Template You Love</h2>
                <button class="btn-pill-blue" @click="navigate('sites')">Already have a site?</button>
            </div>
            <input type="text" placeholder="Search all templates..." v-model="filterByName">
        </header>

        <div class="results">
            <h3 v-if="filterByName">Results for ‘{{ filterByName }}’</h3>
            <h3 v-else>All Website Templates</h3>
            <!-- <p>Sort by</p> -->
        </div>

        <section v-if="templateStore.templates" class="template-list">
            <article class="template-preview">
                <div class="preview-top">
                    <threeDots />
                </div>
                <img src="https://res.cloudinary.com/dirvusyaz/image/upload/v1675331709/without_limits_xigo1z.png"
                    alt="">
                <section class="article-cover">
                    <div class="actions">
                        <button class="btn-edit btn-pill-blue" @click="() => router.push(`/site/edit`)">Edit</button>
                    </div>
                </section>
                Empty
            </article>
            <article class="template-preview"
                v-for="template in templateStore.templates.filter(template => template.name.toLowerCase().includes(filterByName.toLowerCase()))">
                <div class="preview-top">
                    <threeDots />
                </div>
                <img :src="template.background" alt="">
                <p>{{ template.name || 'coffee shop' }}</p>
                <section class="article-cover">
                    <div class="actions">
                        <button @click="() => router.push(`/site/edit/${template._id}`)"
                            class="btn-edit btn-pill-blue">Edit</button>
                        <button @click="() => router.push(`/site/${template._id}`)"
                            class="btn-view btn-pill-blue">View</button>
                    </div>
                </section>
            </article>
        </section>
    </section>
</template>

<script setup>
import threeDots from "../assets/svg/three-dots.vue";

import { ref, onMounted } from "vue"
import { useRouter } from 'vue-router'
import { useTemplateStore } from '../stores/template.js'

const router = useRouter()

const templateStore = useTemplateStore()

const filterByName = ref('')

onMounted(() => {
    templateStore.loadTemplates()
})

function navigate(to) {
    router.push(to)
}
</script>
