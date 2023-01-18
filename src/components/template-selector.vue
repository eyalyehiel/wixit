<template>
    <h2>Choose a template for your website</h2>
    <section v-if="storeSite.sites" class="template-selector">
        <article>
            <section class="article-cover" style="background-color: antiquewhite;">
                <div>
                    <button class="edit-btn" @click="createSite()">Edit</button>
                </div>
            </section>
            Empty
        </article>
        <article v-for="site in storeSite.siteToShow.value" :style="{'background-image': `url( ${site.background})`}">
            <section class="article-cover">
                <div>
                    <button @click="() => router.push(`site/${site._id}`)" class="preview-btn">Preview</button>
                    <button @click="() => router.push(`site/edit/${site._id}`)" class="edit-btn">Edit</button>
                </div>
            </section>
            {{ site.name || 'coffee shop' }}
        </article>
    </section>
</template>

<script setup>
import { onMounted } from "vue"
import { useRouter } from 'vue-router'
import { siteService } from "../services/site-service.js"
import { useSiteStore } from '../stores/site.js'

const router = useRouter()

const storeSite = useSiteStore()

onMounted(() => {
    storeSite.loadTemplates()
})

async function createSite() {
    try {
        let newSite = siteService.getEmptySite()
        newSite = await siteService.save(newSite)
        router.push({ name: 'edit', query: { id: newSite._id } })
    } catch (err) {
        console.log('cannot create site', err)
    }
}
</script>
