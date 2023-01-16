import { utilService } from "./utils-service.js"
import { storageService } from "./async-storage-service.js"
import sitesJson from "../../data/site.json" assert { type: "json" }
import { showSuccessMsg, showErrorMsg } from "./event-bus-service"
let gSites
const KEY = "sitesDB"
// _createSites();
export const siteService = {
    query,
    getById,
    remove,
    save,
    getEmptySite,
}

async function query(filterBy) {
    gSites = await storageService.query(KEY)
    // let sites = _filter(filterBy);
    return Object.values(gSites)
    // return storageService.query(KEY);
}

function getById(id) {
    return storageService.get(KEY, id)
}

function getEmptySite() {
    return {
        name: "",
        imgUrl: "",
        cmps: [],
        isPublic: false,
        // createdBy: {
        //     _id: "5e26e0b718a0891d4c995527",
        //     fullname: "Hekro Special",
        //     imgUrl: "img.jpg",
        // },
        // usersData: {
        //     contacts: [
        //         {
        //             email: "user@user.com",
        //             msg: "Please send me stuff",
        //             at: 123,
        //         },
        //     ],
        //     subscriptions: [{ email: "user@user.com", at: 123 }],
        // },
    }
}

function remove(id) {
    return storageService.remove(KEY, id)
}

function save(site) {
    // return site._id ? storageService.put(KEY, site)  : storageService.post(KEY, site);
    if (site._id) {
        return storageService.put(KEY, site)
    } else {
        return storageService.post(KEY, site)
    }
}

function _add(site) {
    site._id = utilService.makeId()
    site.createdAt = Date.now()
    gSites.push(site)
    return site
}

function _update(site) {
    const idx = gSites.findIndex((currsite) => currsite._id === site._id)
    gSites.splice(idx, 1, site)
    return site
}

function _createSites() {
    var sites = utilService.loadFromStorage(KEY)
    if (!sites || !sites.length) {
        sites = sitesJson
        utilService.saveToStorage(KEY, sites.slice(0, 100))
    }
    gSites = sites
    return sites
}

function _createSite(title, price) {
    return {
        _id: utilService.makeId(),
        title,
        createdAt: Date.now(),
        price,
    }
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
    } = filterBy
    const regex = new RegExp(name, "i")
    let filteredSites = gSites.filter((site) => {
        return regex.test(site.name)
    })

    if (labels && labels.length) {
        filteredSites = filteredSites.filter((site) => {
            return labels.some((l) => site.labels.includes(l))
        })
    }

    if (Amenities && Amenities.length) {
        filteredSites = filteredSites.filter((site) => {
            return Amenities.some((a) => site.amenities.includes(a))
        })
    }

    if (type && type.length) {
        filteredSites = filteredSites.filter((site) => {
            return type.some((t) => site.type.includes(t))
        })
    }

    if (destination && destination.length) {
        filteredSites = filteredSites.filter(
            (site) => site.loc.country === destination
        )
    }

    if (guests) {
        filteredSites = filteredSites.filter((site) => site.capacity >= guests)
    }

    const searchMin = minPrice ? minPrice : 0
    filteredSites = filteredSites.filter((site) => {
        return site.price > searchMin
    })

    const searchMax = maxPrice ? maxPrice : Infinity
    filteredSites = filteredSites.filter((site) => {
        return site.price < searchMax
    })

    return filteredSites
}
