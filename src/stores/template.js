import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { templateService } from '../services/template-service';

export const useTemplateStore = defineStore('template', () => {
    const templates = ref(null);
    const filteredCmps = ref(null);
    const sectionList = ref([
        'header',
        'hero',
        'section',
        'gallery',
        'cards',
        'testimonials',
        'contact',
        'video',
    ]);

    async function loadFilteredCmps(cmpName) {
        filteredCmps.value = await templateService.query({ cmpName });
    }

    async function loadTemplates() {
        templates.value = await templateService.query();
    }

    async function getById(id) {
        return { ...(await templateService.getTemplateById(id)) };
    }

    function getEmptySite(id) {
        return { ...templateService.getEmptyTemplate() };
    }

    async function getCmpByTemplate(cmpId, templateId) {
        return {
            ...(await templateService.getCmpByTemplate(cmpId, templateId)),
        };
    }

    const templateToShow = computed(() => templates);

    return {
        sectionList,
        templates,
        filteredCmps,
        getById,
        getEmptySite,
        loadTemplates,
        loadFilteredCmps,
        getCmpByTemplate,
        templateToShow,
    };
});
