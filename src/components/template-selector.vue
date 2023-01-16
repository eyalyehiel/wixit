<template>
    <h2>Choose a template for your website</h2>
    <section class="template-selector">
        <article>
            <section class="article-cover">
                <div>
                    <button class="edit-btn" @click="createSite()">Edit</button>
                </div>
            </section>
            Empty
        </article>
        <article v-for="x in 5">
            <section class="article-cover">
                <div>
                    <button class="preview-btn">Preview</button>
                    <button class="edit-btn">Edit</button>
                </div>
            </section>
            template #{{ x }}
        </article>
    </section>
</template>

<script setup>
import { reactive, toRefs } from "vue"
import { useRouter } from 'vue-router'
import { siteService } from "../services/stay-service-local.js"

const router = useRouter()

async function createSite() {
    try {
        let newSite = siteService.getEmptySite()
        newSite = await siteService.save(newSite)
        router.push({name: 'edit', query:{ id: newSite._id} })
    } catch (err) {
        console.log('cannot create site',err)
    }
}
</script>
