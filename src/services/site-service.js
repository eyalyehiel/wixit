import { utilService } from './utils-service.js';
import { storageService } from './async-storage-service.js';
import sitesJson from '../../data/site.json' assert { type: 'json' };

let gSites;
const KEY = 'sitesDB';
export const siteService = {
    query,
    getById,
    remove,
    save,
    getNewCmp,
    getEmptySite,
    getCoffeeSite,
};

async function query(filterBy) {
    gSites = await storageService.query(KEY);
    // let sites = _filter(filterBy);
    return Object.values(gSites);
    // return storageService.query(KEY);
}

function getById(id) {
    return storageService.get(KEY, id);
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
                    background: 'url()',
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

function getEmptySite() {
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
                id: 'wc02',
                type: 'site-header',
                info: {
                    title: 'HairDresser Baluta',
                    subtitle: 'Your Hair is !(Who you Are)',
                    btn: { label: 'Schedule Today!', link: '#wc03' },
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
    // return site._id ? storageService.put(KEY, site)  : storageService.post(KEY, site);
    if (site._id) {
        return storageService.put(KEY, site);
    } else {
        return storageService.post(KEY, site);
    }
}

function getNewCmp(type) {
    if (type === 'site-header') {
        return {
            id: _makeId(3),
            type: 'site-header',
            info: {
                title: 'HairDresser Baluta',
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
                color: 'red',
            },
        };
    }
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
    const {
        name,
        labels,
        Amenities,
        type,
        maxPrice,
        minPrice,
        destination,
        guests,
    } = filterBy;
    const regex = new RegExp(name, 'i');
    let filteredSites = gSites.filter((site) => {
        return regex.test(site.name);
    });

    if (labels && labels.length) {
        filteredSites = filteredSites.filter((site) => {
            return labels.some((l) => site.labels.includes(l));
        });
    }

    if (Amenities && Amenities.length) {
        filteredSites = filteredSites.filter((site) => {
            return Amenities.some((a) => site.amenities.includes(a));
        });
    }

    if (type && type.length) {
        filteredSites = filteredSites.filter((site) => {
            return type.some((t) => site.type.includes(t));
        });
    }

    if (destination && destination.length) {
        filteredSites = filteredSites.filter(
            (site) => site.loc.country === destination
        );
    }

    if (guests) {
        filteredSites = filteredSites.filter((site) => site.capacity >= guests);
    }

    const searchMin = minPrice ? minPrice : 0;
    filteredSites = filteredSites.filter((site) => {
        return site.price > searchMin;
    });

    const searchMax = maxPrice ? maxPrice : Infinity;
    filteredSites = filteredSites.filter((site) => {
        return site.price < searchMax;
    });

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
