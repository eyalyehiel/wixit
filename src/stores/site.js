import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { siteService } from '../services/site-service';

export const useSiteStore = defineStore('sites', () => {
    const sites = ref(null);
    const filteredCmps = ref(null);

    async function loadFilteredCmps(cmpName) {
        filteredCmps.value = await siteService.query({ cmpName });
    }

    async function loadTemplates() {
        sites.value = await siteService.query();
    }

    async function getById(id) {
        return { ...(await siteService.getById(id)) };
    }

    async function addCmp(type) {
        let newCmp = siteService.getNewCmp(type);
        await siteService.addCmp(newCmp);
        // sites.value.push(siteService.addCmp);
    }

    async function removeCmp(id) {
        await siteService.remove(id);
        const idx = sites.value.findIndex(({ cmps }) => cmps.find());
        sites.value.push(siteService.addCmp);
    }

    const siteToShow = computed(() => sites);

    return {
        sites,
        filteredCmps,
        loadTemplates,
        loadFilteredCmps,
        addCmp,
        removeCmp,
        siteToShow,
        getById,
    };
});
