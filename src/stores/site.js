import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { siteService } from '../services/site-service';

export const useSiteStore = defineStore('counter', () => {
    const sites = ref(null);

    function loadTemplates() {
        sites = siteService.query();
    }

    function addCmp() {
        sites.push(siteService.addCmp);
    }

    return { count, loadTemplates, addCmp };
});
