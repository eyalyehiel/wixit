import { utilService } from './utils-service.js';
import { storageService } from './async-storage-service.js';
import templatesJson from '../../data/site.json' assert { type: 'json' };

let gTemplates;
const KEY = 'templatesDB';
_createTemplates();

export const templateService = {
    query,
    getTemplateById,
    getCmpByTemplate,
    getEmptyTemplate,
};

async function query(filterBy = { cmpName: '' }) {
    gTemplates = await storageService.query(KEY);
    let templates = _filter(filterBy);
    console.log(templates);
    return templates || gTemplates;
}

async function getTemplateById(id) {
    return await storageService.get(KEY, id);
}

async function getCmpByTemplate(cmpId, templateId) {
    let { cmps } = await getTemplateById(templateId);
    return cmps.find(({ id }) => id === cmpId);
}

function getEmptyTemplate() {
    return {
        name: '',
        imgUrls: [],
        createdBy: {
            _id: '',
            fullname: '',
            imgUrl: '',
        },
        cmps: [],
        isPublic: true,
    };
}

function _createTemplates() {
    var templates = utilService.loadFromStorage(KEY);
    if (!templates || !templates.length) {
        templates = templatesJson;
        utilService.saveToStorage(KEY, templates);
    }
    gTemplates = templates;
    return templates;
}

function _filter(filterBy) {
    const { cmpName } = filterBy;
    if (cmpName) {
        return gTemplates
            .map(({ cmps }) =>
                cmps.filter((cmp) => cmp.type === `site-${cmpName}`)
            )
            .flat();
    }
}
