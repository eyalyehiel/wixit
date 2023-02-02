import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { siteService } from '../services/site-service';
import { utilService } from '../services/utils-service';

export const useSiteStore = defineStore('sites', () => {
    const sites = ref(null);
    const site = ref(null);

    function setSite(newSite) {
        newSite.cmps.forEach((cmp) => (cmp._id = utilService.makeId()));
        site.value = newSite;
    }

    async function loadSites() {
        sites.value = await siteService.query();
    }

    async function getById(id) {
        return { ...(await siteService.getById(id)) };
    }

    function addCmp(cmp) {
        cmp._id = utilService.makeId();
        site.value.cmps.push(cmp);
    }

    function updateCmp(cmp) {
        const idx = site.value.cmps.findIndex(({ _id }) => _id === cmp._id);
        site.value.cmps.splice(idx, 1, cmp);
    }

    function removeCmp(id) {
        const idx = site.value.cmps.findIndex((cmp) => cmp._id === id);
        site.value.cmps.splice(idx, 1);
    }

    const siteToShow = computed(() => site.value);

    return {
        sites,
        site,
        loadSites,
        addCmp,
        removeCmp,
        updateCmp,
        getById,
        setSite,
        siteToShow,
    };
});
