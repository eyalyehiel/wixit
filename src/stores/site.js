import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { siteService } from '../services/site-service';

export const useSiteStore = defineStore('sites', () => {
    const sites = ref(null);

    async function loadTemplates() {
        sites.value = await siteService.query();
    }

    async function getById(id) {
        return { ...(await siteService.getById(id)) };
    }

    function addCmp() {
        sites.value.push(siteService.addCmp);
    }

    const siteToShow = computed(() => sites);

    return { sites, loadTemplates, addCmp, siteToShow, getById };
});
