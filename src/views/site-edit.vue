<template>
    <section v-if="siteStore.siteToShow" class="site-edit">
        <site-edit-header @onChangeDisplay="toggleDisplaySize" />

        <!-- <section class="editor-sidebar">
            <nav class="editor-nav">
                <button @click="toggleMenu()">
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
            <section
                class="section-select section-templates"
                :class="{ open: isTemplatesOpen }"
            >
                <span
                    v-for="cmp in templateStore.filteredCmps"
                    @click="onAddCmp(cmp)"
                    >{{ cmp.type }}</span
                >
            </section>

            <section class="cmp-editor" :class="{ open: isCmpEditorOpen }">
                <section class="title">
                    <h2>Edit</h2>
                    <img src="../assets/svg/trash.svg" alt="" />
                </section>

                <section class="color-picker">
                    <h1>BACKGROUND COLOR</h1>
                    <section class="color-wrapper">
                        <section
                            v-for="color in colors"
                            @click="setBgColor(color)"
                            :style="{ 'background-color': color }"
                            :key="color"
                        ></section>
                    </section>
                </section>
                <section v-if="focusedElement" class="text-editor">
                    <input
                        @change="changeFontSize"
                        type="range"
                        min="0"
                        value="16"
                        max="100"
                        id=""
                    />
                </section>
                <section class="upload-img">
                    <img src="../assets/svg/cloud-arrow-up-fill.svg" alt="" />
                    <span>Drop file here or</span>
                </section>
            </section>
        </section> -->

        <site-edit-sidebar :cmpEditorOpen="cmpEditorOpen" @onToggleCmpEditor="toggleCmpEditor"
            @onToggleMenu="toggleMenu" @onAddCmp="addCmp" />

        <section class="site-display" :class="displaySize">
            <component v-if="siteStore.siteToShow?.cmps?.length" v-for="cmp in siteStore.siteToShow.cmps"
                :is="cmpsToShow[cmp.type]" :cmp="cmp" :class="{ 'cmp-selected': cmpToEdit?._id === cmp._id }"
                @click="setCmpToEdit(cmp)" @editElement="editElement" @onSetTxtColor="TxtColor"
                @onChangeText="changeText">
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

import { onMounted, ref, computed } from "vue"
import { useRoute } from "vue-router"
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
let isCmpEditorOpen = ref(false)
let focusedElement = ref(false)
let changeColor = ref(false)
let displaySize = ref("desktop")

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

function toggleCmpEditor(val) {
    console.log(isCmpEditorOpen.value, val)
    if (isCmpEditorOpen.value === val) return
    isCmpEditorOpen.value = val
    if (!isCmpEditorOpen.value) return (cmpToEdit.value = null)
    // isCmpsOpen.value = false
    // isTemplatesOpen.value = false
}

function addCmp(cmp) {
    siteStore.addCmp(cmp)
}

function changeText(text, key, idx) {
    typeof cmpToEdit.value.info[key] === Array
        ? (cmpToEdit.value.info[key][idx].text = text)
        : (cmpToEdit.value.info[key].text = text)
    updateCmp()
}

function setBgColor(val) {
    cmpToEdit.value.style["background-color"] = val
    updateCmp()
}

function setCmpToEdit(cmp) {
    cmpToEdit.value = cmp
    // if (isCmpEditorOpen.value) return
    isCmpEditorOpen.value = !isCmpEditorOpen.value
    // if (isCmpEditorOpen.value) return
    // toggleCmpEditor()
}

function updateCmp() {
    siteStore.updateCmp(cmpToEdit.value)
}
function editElement(key) {
    focusedElement.value = key
}

const cmpEditorOpen = computed(() => isCmpEditorOpen)

function changeFontSize(ev) {
    const { value } = ev.target
    cmpToEdit.value.info[focusedElement.value].style["font-size"] = value + 'px'
    updateCmp()
}

function TxtColor(el) { }
</script>
