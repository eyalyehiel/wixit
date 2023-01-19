import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { siteService } from '../services/site-service';

export const useSiteStore = defineStore('sites', () => {
    const sites = ref(null);
    const site = ref(null);

    function setSite(newSite) {
        site.value = newSite;
    }

    async function loadSites() {
        sites.value = await siteService.query();
    }

    async function getById(id) {
        return { ...(await siteService.getById(id)) };
    }

    async function addCmp(cmp) {
        // await siteService.addCmp(cmp);
        site.value.cmps.push(cmp);
    }

    async function removeCmp(id) {
        // await siteService.remove(id);
        const idx = site.value.cmps.findIndex((cmp) => cmp.id === id);
        sites.value.splice(idx, 1);
    }

    const siteToShow = computed(() => site.value);

    return {
        sites,
        site,
        loadSites,
        addCmp,
        removeCmp,
        getById,
        setSite,
        siteToShow,
    };
});
