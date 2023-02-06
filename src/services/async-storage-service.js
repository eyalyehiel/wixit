export const storageService = {
    query,
    get,
    post,
    put,
    remove,
};

function query(entityType, delay = 300) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || [];
    return new Promise((resolve) => setTimeout(() => resolve(entities), delay));
}

async function get(entityType, entityId) {
    const entities = await query(entityType);
    const entity = entities.find((entity_1) => entity_1._id === entityId);
    if (!entity) throw new Error(`Unknown Entity ${entityId}`);
    return entity;
}

async function post(entityType, newEntity, append = true) {
    newEntity._id = _makeId();
    const entities = await query(entityType);
    append ? entities.unshift(newEntity) : entities.unshift(newEntity);
    _save(entityType, entities);
    return newEntity;
}

async function put(entityType, updatedEntity) {
    const entities = await query(entityType);
    const idx = entities.findIndex(({ _id }) => _id === updatedEntity._id);
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
}

async function remove(entityType, entityId) {
    const entities = await query(entityType);
    const idx = entities.findIndex((entity) => entity._id === entityId);
    if (idx < 0) throw new Error(`Unknown Entity ${entityId}`);
    entities.splice(idx, 1);
    _save(entityType, entities);
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities));
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
