import { utilService } from './utils-service.js';
import { storageService } from './async-storage-service.js';
import sitesJson from '../../data/site.json' assert { type: 'json' };
// import { showSuccessMsg, showErrorMsg } from "./event-bus-service"

let gSites;
const KEY = 'sitesDB';
// _createSites();
export const siteService = {
    query,
    getById,
    remove,
    save,
    getEmptySite,
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
                type: 'wap-header',
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
