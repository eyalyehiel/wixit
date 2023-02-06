import { utilService } from './utils-service.js';
import { storageService } from './async-storage-service.js';
import sitesJson from '../../data/site.json' assert { type: 'json' };

let gSites;
const KEY = 'sitesDB';
_createSites();

// export const siteService = {
//     query,
//     getById,
//     remove,
//     save,
// };

export const siteService = {
    query: (filterBy) => storageService.query(KEY),
    getById: (id) => storageService.get(KEY, id),
    remove: (id) => storageService.remove(KEY, id),
    save: (site) =>
        site._id
            ? storageService.put(KEY, site)
            : storageService.post(KEY, site),
};

// async function query(filterBy) {
//     return await storageService.query(KEY);
// }

// async function getById(id) {
//     return await storageService.get(KEY, id);
// }

// async function remove(id) {
//     return await storageService.remove(KEY, id);
// }

// async function save(site) {
//     return site._id
//         ? await storageService.put(KEY, site)
//         : await storageService.post(KEY, site);
// }

// function _add(site) {
//     site._id = utilService.makeId();
//     site.createdAt = Date.now();
//     gSites.push(site);
//     return site;
// }

// function _update(site) {
//     const idx = gSites.findIndex((currsite) => currsite._id === site._id);
//     gSites.splice(idx, 1, site);
//     return site;
// }

function _createSites() {
    var sites = utilService.loadFromStorage(KEY);
    if (!sites || !sites.length) {
        sites = sitesJson;
        utilService.saveToStorage(KEY, sites.slice(0, 100));
    }
    gSites = sites;
    return sites;
}

// function _filter(filterBy) {
//     const { cmpName } = filterBy;
//     // const regex = new RegExp(cmpName, 'i');
//     let filteredSites = gSites
//         .map(({ cmps }) => cmps.filter((cmp) => cmp.type === `site-${cmpName}`))
//         .flat();

//     return filteredSites;
// }
