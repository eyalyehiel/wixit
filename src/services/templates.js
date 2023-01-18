import { utilService } from './utils-service.js';
import { storageService } from './async-storage-service.js';
import templatesJson from '../../data/template.json' assert { type: 'json' };

let gTemplates;
const KEY = 'templatesDB';
_createTemplates();

export const templateService = {
    query,
    getTemplateById,
    getCmpByTemplate,
    remove,
    save,
    getNewCmp,
    getEmptyTemplate,
    getCoffeeTemplate,
};

async function query(filterBy = { cmpName: '' }) {
    gTemplates = await storageService.query(KEY);
    console.log(gTemplates);
    // let templates = _filter(filterBy)
    // console.log(templates)
    return Object.values(gTemplates);
    // return storageService.query(KEY);
}

async function getTemplateById(id) {
    return await storageService.get(KEY, id);
}

async function getCmpByTemplate(cmpId, templateId) {
    let template = await getTemplateById(templateId);
    return template.cmps.find((cmp) => cmp._id === cmpId);
}

function getCoffeeTemplate() {
    return {
        name: '',
        imgUrls: [],
        createdBy: {
            _id: '',
            fullname: '',
            imgUrl: '',
        },
        cmps: [
            {
                id: _makeId(3),
                type: 'template-header',
                info: {
                    title: 'HairDresser Baluta',
                    links: [
                        { text: 'Home', href: '#' },
                        { text: 'Shop', href: '#' },
                        { text: 'About', href: '#' },
                    ],
                },
                theme: 'theme-header-happy',
                style: {
                    background: 'url()',
                    'background-color': 'red',
                    font: 'Fontush',
                    color: 'red',
                },
            },
            {
                id: 'wc03',
                type: 'template-hero',
                info: {
                    title: 'Unique Craft Cafe in NYC',
                    subtitle:
                        'Our coffee comes straight from the plantations of Brazil and Colombia, freshly picked and ground on template, with a smoky aroma and an intoxicating taste. We love coffee, people and good food.',
                    btn: 'View Menu',
                },
                theme: 'theme-header-happy',
                style: {
                    background:
                        'url(https://res.cloudinary.com/airbxb/image/upload/v1670857731/photo5_oqy4lr.jpg) no-repeat',
                    'background-size': 'cover',
                    font: 'Fontush',
                    color: 'red',
                },
            },
            {
                id: 'wc04',
                type: 'template-section',
                info: {
                    title: 'Coffee & Cakes',
                    paragraph1:
                        'Our coffee is rich in flavor and the espresso is a perfect balance of sweetness and acidity that functions well in milk drinks.',
                    paragraph2:
                        'Quick can manor smart money hopes worth too. Comfort produce husband boy her had hearing. Law others theirs passed but wishes. You day real less till dear read. Considered use dispatched melancholy sympathize discretion led. Oh feel if up to till like.',
                    images: [
                        'https://robohash.org/1?set=set5',
                        'https://robohash.org/2?set=set5',
                    ],
                },
                theme: 'theme-header-happy',
                style: {
                    background: 'url()',
                    font: 'Fontush',
                    color: 'red',
                },
            },
            {
                id: 'wc05',
                type: 'template-footer',
                info: {
                    title: 'COFFEE',
                    subtitle:
                        'CoffeRights 2035 by Pucoffe. Proudly created with Wicks.in',
                },
                theme: 'theme-header-happy',
                style: {
                    background: 'url()',
                    font: 'Fontush',
                    color: 'red',
                },
            },
        ],
        isPublic: true,
    };
}

function remove(id) {
    return storageService.remove(KEY, id);
}

function save(template) {
    return template._id
        ? storageService.put(KEY, template)
        : storageService.post(KEY, template);
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

function _add(template) {
    template._id = utilService.makeId();
    template.createdAt = Date.now();
    gTemplates.push(template);
    return template;
}

function _update(template) {
    const idx = gTemplates.findIndex(
        (currtemplate) => currtemplate._id === template._id
    );
    gTemplates.splice(idx, 1, template);
    return template;
}

function getNewCmp(type) {
    if (type === 'template-header') {
        return {
            id: _makeId(3),
            type: 'template-header',
            info: {
                title: 'Cafe Baluta',
                links: [
                    { text: 'Home', href: '#' },
                    { text: 'Shop', href: '#' },
                    { text: 'About', href: '#' },
                ],
                btn: { label: 'Schedule Today!', link: '#wc03' },
            },
            theme: 'theme-header-happy',
            style: {
                background: 'url()',
                font: 'Fontush',
                color: '#fff',
                'background-color': 'rgba(20, 2, 0, 0.8)',
            },
        };
    }
    if (type === 'template-hero') {
        return {
            id: _makeId(3),
            type: 'template-hero',
            info: {
                title: 'Unique Craft Cafe in NYC',
                subtitle:
                    'Our coffee comes straight from the plantations of Brazil and Colombia, freshly picked and ground on template, with a smoky aroma and an intoxicating taste. We love coffee, people and good food.',
                btn: 'View Menu',
            },
            theme: 'theme-header-happy',
            style: {
                background:
                    'url(https://res.cloudinary.com/dirvusyaz/image/upload/v1674042414/header-bg.jpg_ajhisz.webp)',
                font: 'Fontush',
                color: '#fff',
            },
        };
    }
    if (type === 'template-cards') {
        return {
            id: _makeId(3),
            type: 'template-cards',
            info: [
                {
                    title: 'Card Header',
                    paragraph1: 'Some text here 1',
                    paragraph2: 'Some text here 1',
                    paragraph3: 'Some text here 1',
                    btn: 'Click Here',
                },
                {
                    title: 'Card Header',
                    paragraph1: 'Some text here 2',
                    paragraph2: 'Some text here 2',
                    paragraph3: 'Some text here 2',
                    btn: 'Click Here',
                },
                {
                    title: 'Card Header',
                    paragraph1: 'Some text here 3',
                    paragraph2: 'Some text here 3',
                    paragraph3: 'Some text here 3',
                    btn: 'Click Here',
                },
            ],
            theme: 'theme-header-happy',
            style: {
                background: 'url()',
                font: 'Fontush',
                color: 'red',
            },
        };
    }
}

function _createTemplates() {
    var templates = utilService.loadFromStorage(KEY);
    if (!templates || !templates.length) {
        templates = templatesJson;
        utilService.saveToStorage(KEY, templates.slice(0, 100));
    }
    gTemplates = templates;
    return templates;
}

function _createTemplate(title, price) {
    return {
        _id: utilService.makeId(),
        title,
        createdAt: Date.now(),
        price,
    };
}

function _filter(filterBy) {
    const { cmpName } = filterBy;
    // const regex = new RegExp(cmpName, 'i');
    let filteredTemplates = gTemplates
        .map(({ cmps }) =>
            cmps.filter((cmp) => cmp.type === `template-${cmpName}`)
        )
        .flat();

    return filteredTemplates;
}

function _makeId(length = 5) {
    var text = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
