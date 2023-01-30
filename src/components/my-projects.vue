<template>
    <section class="my-sites">
        <header>
            <div class="title">
                <h1>My Sites</h1>
                <h4>Select a site to edit, view and open its dashboard.</h4>
            </div>
            <div class="action">
                <button class="btn-pill-blue">Create New Site</button>
            </div>
        </header>
        <main class="main-content">
            <div class="site-filter">
                <input type="text" placeholder="Search for a website">
            </div>
            <site-list :sites="siteStore.sites" />
        </main>
    </section>
</template>

<script setup>
import SiteList from './my-sites/site-list.vue';

import { useSiteStore } from "../stores/site.js";
import { onMounted } from 'vue';

const siteStore = useSiteStore()

onMounted(() => {
    siteStore.loadSites()
})
</script>
