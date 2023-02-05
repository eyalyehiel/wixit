<template>
    <section class="my-sites">
        <header>
            <div class="title">
                <h1>My Sites</h1>
                <h4>Select a site to edit, view and open its dashboard.</h4>
            </div>
            <div class="action">
                <button class="btn-pill-blue" @click="navigate('templates')">Create New Site</button>
            </div>
        </header>
        <main class="main-content">
            <div class="site-filter">
                <p v-if="filterByName">
                    Search results for "{{ filterByName }}"
                </p>
                <input type="text" placeholder="Search for a website" v-model="filterByName" />
            </div>
            <site-list :sites="
    siteStore.sites?.filter((site) =>
        site.name
            .toLowerCase()
            .includes(filterByName.toLowerCase())
    )
            " />
        </main>
    </section>
</template>

<script setup>
import SiteList from "./my-sites/site-list.vue"

import { useSiteStore } from "../stores/site.js"
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router";

const siteStore = useSiteStore()
const router = useRouter()

const filterByName = ref("")

onMounted(() => {
    siteStore.loadSites()
})

function navigate(to) {
    router.push(to);
}
</script>
