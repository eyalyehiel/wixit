import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { templateService } from '../services/template-service';

export const useSiteStore = defineStore('sites', () => {
    const templates = ref(null);
    const filteredCmps = ref(null);

    async function loadFilteredCmps(cmpName) {
        filteredCmps.value = await templateService.query({ cmpName });
    }

    async function loadTemplates() {
        templates.value = await templateService.query();
    }

    async function getById(id) {
        return { ...(await templateService.getById(id)) };
    }

    async function getCmpByTemplate(cmpId, templateId) {
        return {
            ...(await templateService.getCmpByTemplate(cmpId, templateId)),
        };
    }

    const templateToShow = computed(() => templates);

    return {
        templates,
        filteredCmps,
        getById,
        loadTemplates,
        loadFilteredCmps,
        getCmpByTemplate,
        templateToShow,
    };
});
