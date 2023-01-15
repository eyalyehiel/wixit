import { utilService } from './utils-service.js';
import { storageService } from './async-storage-service.js';
import staysJson from '../../data/stay.json' assert { type: 'json' };
import { showSuccessMsg, showErrorMsg, wishlistMsg } from './event-bus-service';
let gStays;
const KEY = 'staysDB';
// _createStays();
export const stayService = {
    query,
    getById,
    remove,
    save,
    getEmptyStay,
    btnsAryy,
};

async function query(filterBy) {
    gStays = await storageService.query(KEY);
    let stays = _filter(filterBy);
    return Object.values(stays);
    // return storageService.query(KEY);
}

function getById(id) {
    return storageService.get(KEY, id);
}

function getEmptyStay() {
    return {
        name: '',
        imgUrls: [],
        price: 0,
        summary: '',
        capacity: 0,
        amenities: [],
        bedrooms: 0,
        Bathrooms: 0,
        labels: [],
        type: [],
        loc: {
            country: '',
            countryCode: '',
            city: '',
            address: '',
            lat: 0,
            lng: 0,
        },
        host: {},
        reviews: [],
        likedByUsers: [],
    };
}

function remove(id) {
    return storageService.remove(KEY, id);
}

function save(stay) {
    // return stay._id ? storageService.put(KEY, stay)  : storageService.post(KEY, stay);
    if (stay._id) {
        storageService.put(KEY, stay);
        showSuccessMsg(`"${stay.name}" updated successfully`);
    } else {
        storageService.post(KEY, stay);
        showSuccessMsg(`"${stay.name}" added successfully`);
    }
}

function _add(stay) {
    stay._id = utilService.makeId();
    stay.createdAt = Date.now();
    gStays.push(stay);
    return stay;
}

function _update(stay) {
    const idx = gStays.findIndex((currstay) => currstay._id === stay._id);
    gStays.splice(idx, 1, stay);
    return stay;
}

function _createStays() {
    var stays = utilService.loadFromStorage(KEY);
    if (!stays || !stays.length) {
        stays = staysJson;
        utilService.saveToStorage(KEY, stays.slice(0, 100));
    }
    gStays = stays;
    return stays;
}

function _createStay(title, price) {
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
    let filteredStays = gStays.filter((stay) => {
        return regex.test(stay.name);
    });

    if (labels && labels.length) {
        filteredStays = filteredStays.filter((stay) => {
            return labels.some((l) => stay.labels.includes(l));
        });
    }

    if (Amenities && Amenities.length) {
        filteredStays = filteredStays.filter((stay) => {
            return Amenities.some((a) => stay.amenities.includes(a));
        });
    }

    if (type && type.length) {
        filteredStays = filteredStays.filter((stay) => {
            return type.some((t) => stay.type.includes(t));
        });
    }

    if (destination && destination.length) {
        filteredStays = filteredStays.filter(
            (stay) => stay.loc.country === destination
        );
    }

    if (guests) {
        filteredStays = filteredStays.filter((stay) => stay.capacity >= guests);
    }

    const searchMin = minPrice ? minPrice : 0;
    filteredStays = filteredStays.filter((stay) => {
        return stay.price > searchMin;
    });

    const searchMax = maxPrice ? maxPrice : Infinity;
    filteredStays = filteredStays.filter((stay) => {
        return stay.price < searchMax;
    });

    return filteredStays;
}

function btnsAryy() {
    return [
        
        {
            key: 'Trending',
            url: 'https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg',
        },
        {
            key: 'Adapted',
            url: 'https://a0.muscache.com/pictures/e22b0816-f0f3-42a0-a5db-e0f1fa93292b.jpg',
        },
        {
            key: 'Hanoks',
            url: 'https://a0.muscache.com/pictures/eb7ba4c0-ea38-4cbb-9db6-bdcc8baad585.jpg',
        },
        {
            key: 'Private',
            url: 'https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg',
        },
        {
            key: 'Skiing',
            url: 'https://a0.muscache.com/pictures/c8bba3ed-34c0-464a-8e6e-27574d20e4d2.jpg',
        },
        {
            key: 'Private',
            url: 'https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg',
        },
        {
            key: 'Tropical',
            url: 'https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg',
        },
        {
            key: 'Iconic cities',
            url: 'https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg',
        },
        {
            key: 'Beachfront',
            url: 'https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg',
        },
        {
            key: 'Off-the-grid',
            url: 'https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg',
        },
        {
            key: 'Caves',
            url: 'https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg',
        },
        {
            key: 'Boats',
            url: 'https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg',
        },
        {
            key: 'Campers',
            url: 'https://a0.muscache.com/pictures/31c1d523-cc46-45b3-957a-da76c30c85f9.jpg',
        },
        {
            key: 'Ryokans',
            url: 'https://a0.muscache.com/pictures/827c5623-d182-474a-823c-db3894490896.jpg',
        },
        {
            key: 'Minsus',
            url: 'https://a0.muscache.com/pictures/48b55f09-f51c-4ff5-b2c6-7f6bd4d1e049.jpg',
        },
        {
            key: 'Casas particulares',
            url: 'https://a0.muscache.com/pictures/251c0635-cc91-4ef7-bb13-1084d5229446.jpg',
        },
        {
            key: 'Golfing',
            url: 'https://a0.muscache.com/pictures/6b639c8d-cf9b-41fb-91a0-91af9d7677cc.jpg',
        },
        {
            key: 'Earth homes',
            url: 'https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg',
        },
        {
            key: 'Countryside',
            url: 'https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg',
        },
        {
            key: 'new',
            url: 'https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg',
        },
        {
            key: 'top',
            url: 'https://a0.muscache.com/pictures/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4.jpg',
        },
        {
            key: 'Play',
            url: 'https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg',
        },
        {
            key: 'OMG!',
            url: 'https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg',
        },
        {
            key: 'Luxe',
            url: 'https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg',
        },
    ];
}
