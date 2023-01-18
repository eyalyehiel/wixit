import { utilService } from './utils-service.js';
import { storageService } from './async-storage-service.js';
import sitesJson from '../../data/site.json' assert { type: 'json' };

let gSites;
const KEY = 'sitesDB';
_createSites();
export const siteService = {
    query,
    getSiteById,
    getCmpBySite,
    remove,
    save,
    getNewCmp,
    getEmptySite,
    getCoffeeSite,
};

async function query(filterBy) {
    gSites = await storageService.query(KEY);
    console.log(gSites);
    let sites = _filter(filterBy);
    console.log(sites);
    return Object.values(sites);
    // return storageService.query(KEY);
}

async function getSiteById(id) {
    return await storageService.get(KEY, id);
}

async function getCmpBySite(cmpId, siteId) {
    let site = await getSiteById(siteId);
    return site.cmps.find((cmp) => cmp._id === cmpId);
}

function getCoffeeSite() {
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
                type: 'site-header',
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
                type: 'site-hero',
                info: {
                    title: 'Unique Craft Cafe in NYC',
                    subtitle:
                        'Our coffee comes straight from the plantations of Brazil and Colombia, freshly picked and ground on site, with a smoky aroma and an intoxicating taste. We love coffee, people and good food.',
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
                type: 'site-section',
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
                type: 'site-footer',
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

function save(site) {
    return site._id
        ? storageService.put(KEY, site)
        : storageService.post(KEY, site);
}

function getEmptySite() {
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

function _add(site) {
    site._id = utilService.makeId();
    site.createdAt = Date.now();
    gSites.push(site);
    return site;
}

function _update(site) {
    const idx = gSites.findIndex((currsite) => currsite._id === site._id);
    gSites.splice(idx, 1, site);
    return site;
}

function getNewCmp(type) {
    if (type === 'site-header') {
        return {
            id: _makeId(3),
            type: 'site-header',
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
    if (type === 'site-hero') {
        return {
            id: _makeId(3),
            type: 'site-hero',
            info: {
                title: 'Unique Craft Cafe in NYC',
                subtitle:
                    'Our coffee comes straight from the plantations of Brazil and Colombia, freshly picked and ground on site, with a smoky aroma and an intoxicating taste. We love coffee, people and good food.',
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
    if (type === 'site-cards') {
        return {
            id: _makeId(3),
            type: 'site-cards',
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

function _createSites() {
    var sites = utilService.loadFromStorage(KEY);
    if (!sites || !sites.length) {
        sites = sitesJson;
        utilService.saveToStorage(KEY, sites.slice(0, 100));
    }
    gSites = sites;
    return sites;
}

function _createSite(title, price) {
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
    let filteredSites = gSites
        .map(({ cmps }) => cmps.filter((cmp) => cmp.type === `site-${cmpName}`))
        .flat();

    return filteredSites;
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
