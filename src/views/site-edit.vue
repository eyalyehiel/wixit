<template>
    <section v-if="siteStore.siteToShow" class="site-edit">
        <site-edit-header @onChangeDisplay="toggleDisplaySize" />

        <site-edit-sidebar :cmpEditorOpen="cmpEditorOpen" :isElementFocused="isElementFocused"
            @onToggleCmpEditor="toggleCmpEditor" @onChangeCmpBgColor="changeCmpBgColor" @onSetTheme="setTheme"
            @onAddCmp="addCmp" @onUpdateElement="updateElement" @onRemoveCmp="removeCmp" />

        <section class="site-display" :class="displaySize">
            <component v-if="siteStore.siteToShow?.cmps?.length" v-for="cmp in siteStore.siteToShow.cmps"
                :is="cmpsToShow[cmp.type]" :cmp="cmp" :class="{ 'cmp-selected': cmpToEdit?._id === cmp._id }"
                :isEdit="true" @click="setCmpToEdit(cmp)" @editElement="editElement" @onChangeText="changeText">
            </component>
            <section v-else class="drag-area">
                <h1>Place Element Here</h1>
            </section>
        </section>
    </section>
</template>

<script setup>
import siteEditHeader from "../components/site-edit/site-edit-header.vue"
import siteEditSidebar from "../components/site-edit/site-edit-sidebar.vue"

import siteHeader from "../components/site-templates/site-header.vue"
import siteHero from "../components/site-templates/site-hero.vue"
import siteSection from "../components/site-templates/site-section.vue"
import siteCards from "../components/site-templates/site-cards.vue"
import siteGallery from "../components/site-templates/site-gallery.vue"
import siteContact from "../components/site-templates/site-contact.vue"
import siteFooter from "../components/site-templates/site-footer.vue"

import { onMounted, onUpdated, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useTemplateStore } from "../stores/template.js";
import { useSiteStore } from "../stores/site.js";

const cmpsToShow = {
    "site-header": siteHeader,
    "site-hero": siteHero,
    "site-section": siteSection,
    "site-cards": siteCards,
    "site-gallery": siteGallery,
    "site-contact": siteContact,
    "site-footer": siteFooter,
}
const cmpToEdit = ref(null)
const isCmpEditorOpen = ref(false)
const focusedElement = ref(false)
const displaySize = ref("desktop")

const isElementFocused = computed(() => focusedElement)
const cmpEditorOpen = computed(() => isCmpEditorOpen)

const templateStore = useTemplateStore();
const siteStore = useSiteStore();
const route = useRoute();

onMounted(async () => {
    const { id } = route.params;
    let site = id
        ? await templateStore.getById(id)
        : templateStore.getEmptySite();
    siteStore.setSite(site);
});

function toggleDisplaySize(val) {
    displaySize.value = val;
}

function toggleCmpEditor(val) {
    if (isCmpEditorOpen.value === val) return;
    isCmpEditorOpen.value = val;
    if (!isCmpEditorOpen.value) return (cmpToEdit.value = null);
}

function addCmp(cmp) {
    siteStore.addCmp(cmp);
}

function updateElement(key, value) {
    cmpToEdit.value.info[focusedElement.value].style[key] = value
}

function removeCmp() {
    console.log(cmpToEdit.value._id)
    siteStore.removeCmp(cmpToEdit.value._id)
}

function changeText(text, key, idx) {
    typeof cmpToEdit.value.info[key] === Array
        ? (cmpToEdit.value.info[key][idx].text = text)
        : (cmpToEdit.value.info[key].text = text);
    updateCmp();
}

function setCmpToEdit(cmp) {
    cmpToEdit.value = cmp;
    isCmpEditorOpen.value = !isCmpEditorOpen.value;
    console.log(cmpToEdit.value._id)
}

function updateCmp() {
    siteStore.updateCmp(cmpToEdit.value);
}

function editElement(key, idx) {
    focusedElement.value = key;
}

function SetColorTxt(color) {

    cmpToEdit.value.info[focusedElement.value].style.color = color
    updateCmp()
}


function changeCmpBgColor(color) {
    cmpToEdit.value.style["background-color"] = color
    updateCmp()
}

function setTheme(theme) {
    cmpToEdit.value.style["background-color"] = theme["background-color"]
    for (const key in cmpToEdit.value.info) {

        if (key === 'links') cmpToEdit.value.info.links.forEach((link, idx) => cmpToEdit.value.info.links[idx].style.color = theme.color)
        else if (key === 'btn' || key === 'card') cmpToEdit.value.info[key].style["background-color"] = theme.others
        else cmpToEdit.value.info[key].style["color"] = theme.color
    }
    updateCmp()
}

// function setBgColor(val) {
//     cmpToEdit.value.style["background-color"] = val
//     updateCmp()
// }

// function changeFontSize(ev) {
//     const { value } = ev.target
//     cmpToEdit.value.info[focusedElement.value].style["font-size"] = value + "px"
//     updateCmp()
// }
</script>
