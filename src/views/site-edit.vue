<template>
    <section
        v-if="siteStore.siteToShow"
        class="site-edit"
        :class="{
            'cmp-editor-open': isCmpEditorOpen,
            'cmps-open': isCmpsOpen,
            'templates-open': isTemplatesOpen,
        }"
    >
        <nav class="editor-header">
            <section class="options">
                <button :class="{ selected: displaySize === 'desktop' }" @click="toggleDisplaySize('desktop')">
                    <desktopBtn class="action-btn" />
                </button>
                <button :class="{ selected: displaySize === 'phone' }" @click="toggleDisplaySize('phone')">
                    <phoneBtn class="action-btn" />
                </button>
            </section>
            <section class="url">
                <p>
                    http://127.0.0.1:5173/#/site/<span contenteditable="true">HamburgerShop</span>
                    <tooltip :text="'Change the name of your site'" />
                </p>
            </section>
            <section class="actions">
                <button>
                    <redoBtn class="action-btn" />
                    <tooltip :text="'Undo'" />
                </button>
                <button>
                    <undoBtn class="action-btn" />
                    <tooltip :text="'Redo'" />
                </button>
                <button @click="toggleScale" class="scaling">100%</button>
            </section>
            <section class="publish">
                <button>Preview</button>
                <button>Publish</button>
            </section>
        </nav>

        <section class="editor-sidebar">
            <nav class="editor-nav">
                <button @click="toggleMenu()">
                    <!-- <plusBtn class="plus-btn"/> -->
                    <img src="../assets/svg/plus-lg.svg" alt="" />
                    <tooltip :text="'Add Elements'" />
                </button>
                <button @click="toggleCmpEditor()">
                    <img src="../assets/svg/palette.svg" alt="" />
                    <tooltip :text="'Edit Element'" />
                </button>
                <button>
                    <img src="../assets/svg/file-richtext.svg" alt="" />
                    <tooltip :text="'Change Theme'" />
                </button>
            </nav>
            <section class="section-select" :class="{ open: isCmpsOpen }">
                <h2 class="title">Section</h2>
                <span @click="showCmps('header')">Header</span>
                <span @click="showCmps('hero')">Hero</span>
                <span @click="showCmps('section')">Section</span>
                <span @click="showCmps('gallery')">Gallery</span>
                <span @click="showCmps('cards')">Cards</span>
                <span @click="showCmps('testimonials')">Testimonials</span>
                <span @click="showCmps('contact')">Contact</span>
                <span @click="showCmps('video')">Video</span>
            </section>
            <section class="section-select section-templates" :class="{ open: isTemplatesOpen }">
                <span v-for="cmp in templateStore.filteredCmps" @click="onAddCmp(cmp)">{{ cmp.type }}</span>
            </section>

            <section class="cmp-editor" :class="{ open: isCmpEditorOpen }">
                <section class="title">
                    <h2>Edit</h2>
                    <img src="../assets/svg/trash.svg" alt="" />
                </section>

                <section class="color-picker">
                    <h1>BACKGROUND COLOR</h1>
                    <section class="color-wrapper">
                        <section v-for="color in colors" @click="setColor(color)" :style="{ 'background-color': color }"
                            :key="color"></section>
                    </section>
                </section>
                <section class="upload-img">
                    <img src="../assets/svg/cloud-arrow-up-fill.svg" alt="" />
                    <span>Drop file here or</span>
                </section>
            </section>
        </section>

        <section class="site-display" :class="displaySize">
            <component v-if="siteStore.siteToShow?.cmps?.length" v-for="cmp in siteStore.siteToShow.cmps"
                :is="cmpsToShow[cmp.type]" :cmp="cmp" :class="{ 'cmp-selected': cmpToEdit?._id === cmp._id }"
                @click="setCmpToEdit(cmp)" @onSetTxtColor="TxtColor" @onChangeText="changeText">

            </component>
            <section v-else class="drag-area">
                <h1>Place Element Here</h1>
            </section>
        </section>
    </section>
</template>

<script setup>
import siteHeader from "../components/site-templates/site-header.vue"
import siteHero from "../components/site-templates/site-hero.vue"
import siteSection from "../components/site-templates/site-section.vue"
import siteCards from "../components/site-templates/site-cards.vue"
import siteGallery from "../components/site-templates/site-gallery.vue"
import siteContact from "../components/site-templates/site-contact.vue"
import siteFooter from "../components/site-templates/site-footer.vue"
import tooltip from "../components/tooltip.vue"
import undoBtn from "../assets/svg/redo.vue"
import redoBtn from "../assets/svg/undo.vue"
import desktopBtn from "../assets/svg/desktop.vue"
import phoneBtn from "../assets/svg/phone.vue"
import plusBtn from "../assets/svg/plus.vue"

import { onMounted, ref,computed } from "vue"
import { useRoute } from "vue-router"
import { utilService } from "../services/utils-service.js"
import { useTemplateStore } from "../stores/template.js"
import { useSiteStore } from "../stores/site.js"

const cmpsToShow = {
    "site-header": siteHeader,
    "site-hero": siteHero,
    "site-section": siteSection,
    "site-cards": siteCards,
    "site-gallery": siteGallery,
    "site-contact": siteContact,
    "site-footer": siteFooter,
}

let cmpToEdit = ref(null)
let isCmpsOpen = ref(false)
let isTemplatesOpen = ref(false)
let isCmpEditorOpen = ref(false)
let changeColor = ref(false)
let displaySize = ref("desktop")
let colors = ref(utilService.getEditColors())

const templateStore = useTemplateStore()
const siteStore = useSiteStore()
const route = useRoute()

onMounted(async () => {
    const { id } = route.params
    let site = id
        ? await templateStore.getById(id)
        : templateStore.getEmptySite()
    siteStore.setSite(site)
})

function toggleDisplaySize(val) {
    displaySize.value = val
}

async function showCmps(cmpName) {
    await templateStore.loadFilteredCmps(cmpName)
    if (isTemplatesOpen.value) return templateStore.loadFilteredCmps(cmpName)
    isTemplatesOpen.value = !isTemplatesOpen.value
}

function toggleMenu() {
    isCmpsOpen.value = !isCmpsOpen.value
    isTemplatesOpen.value = false
    if (isCmpsOpen.value) isCmpEditorOpen.value = false
}

function toggleCmpEditor() {
    isCmpEditorOpen.value = !isCmpEditorOpen.value
    if (!isCmpEditorOpen.value) return (cmpToEdit.value = null)
    isCmpsOpen.value = false
    isTemplatesOpen.value = false
}

function onAddCmp(cmp) {
    siteStore.addCmp(cmp)
}

function changeText(text, key, idx) {
    typeof cmpToEdit.value.info[key] === Array
        ? (cmpToEdit.value.info[key][idx].text = text)
        : (cmpToEdit.value.info[key].text = text)
        updateCmp()
}

function setColor(val) {
    console.log(cmpToEdit.value);
    cmpToEdit.value.style["background-color"] = val
    updateCmp()
}

function setCmpToEdit(cmp) {
    cmpToEdit.value = cmp
    if (isCmpEditorOpen.value) return
    toggleCmpEditor()
}

function updateCmp() {
    siteStore.updateCmp(cmpToEdit.value)
}

function TxtColor(el) {
    // console.log('el', el.style)
    changeColor.value = !changeColor.value
    // console.log('changeColor.value', changeColor.value)
}
</script>
