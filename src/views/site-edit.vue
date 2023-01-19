<template>
    <section v-if="siteStore.siteToShow" class="site-edit" :class="{
        'colors-open': isColorOpen,
        'cmps-open': isCmpsOpen,
        'templates-open': isTemplatesOpen
    }">
        <nav class="editor-header">
            <section class="options">
                <!-- <button>
                    <img src="../assets/svg/people.svg" alt="" />
                </button> -->
                <button @click="toggleDisplaySize('desktop')">
                    <img src="../assets/svg/display.svg" alt="" />
                </button>
                <!-- <button @click="toggleDisplaySize('tablet')">
                    <img src="../assets/svg/tablet.svg" alt="" />
                </button> -->
                <button @click="toggleDisplaySize('phone')">
                    <img src="../assets/svg/phone.svg" alt="" />
                </button>
            </section>
            <section class="url">
                <p>
                    http://127.0.0.1:5173/#/site/<span contenteditable="true">HamburgerShop</span>
                </p>
            </section>
            <section class="actions">
                <button>
                    <img src="../assets/svg/arrow-90deg-left.svg" alt="" />
                </button>
                <button>
                    <img src="../assets/svg/arrow-90deg-right.svg" alt="" />
                </button>
            </section>
            <section class="publish">
                <button>
                    <img style="height: 16px" src="../assets/svg/eye.svg" alt="" />
                </button>
                <button>Publish</button>
            </section>
        </nav>

        <section class="editor-sidebar">
            <nav class="editor-nav">
                <button @click="toggleMenu()">
                    <img src="../assets/svg/plus-lg.svg" alt="" />
                </button>
                <button @click="toggleColorPicker()">
                    <img src="../assets/svg/palette.svg" alt="" />
                </button>
                <button>
                    <img src="../assets/svg/file-richtext.svg" alt="" />
                </button>
            </nav>

            <!-- <section class="section-select" :class="{ open: isCmpsOpen }">
                <h2 class="title">Section</h2>
                <span @click="addCmp('site-header')">Header</span>
                <span @click="addCmp('site-hero')">Hero</span>
                <span @click="addCmp('site-section')">Section</span>
                <span @click="addCmp('site-gallery')">Gallery</span>
                <span @click="addCmp('site-cards')">Cards</span>
                <span @click="addCmp('testimonials')">Testimonials</span>
                <span @click="addCmp('contact')">Contact</span>
                <span @click="addCmp('video')">Video</span>
            </section> -->

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
                <!-- <h2 class="title">Choose </h2> -->
                <span v-for="cmp in templateStore.filteredCmps" @click="onAddCmp(cmp)">{{ cmp.type }}</span>
            </section>

            <section class="cmp-editor" :class="{ open: isColorOpen }">
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
                    <!-- <section
                            :style="{ 'background-color': color }"
                            :value="color"
                            @click="setColor(color)"
                        ></section> -->
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
                @click="setCmpToEdit(cmp)" @onSetTxtColor="TxtColor" @onChangeText="changeText" />
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

import { onMounted, ref } from "vue"
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
let isColorOpen = ref(false)
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
    if (isCmpsOpen.value) isColorOpen.value = false
}

function toggleColorPicker() {
    isColorOpen.value = !isColorOpen.value
    if (!isColorOpen.value) return cmpToEdit.value = null
    isCmpsOpen.value = false
    isTemplatesOpen.value = false

}

function onAddCmp(cmp) {
    siteStore.addCmp(cmp)
}

function changeText(text, key, idx) {
    (typeof (cmpToEdit.value.info[key]) === Array)
        ? cmpToEdit.value.info[key][idx] = text
        : cmpToEdit.value.info[key] = text
}

function setColor(val) {
    if (changeColor.value) {
        cmpToEdit.style["background-color"] = val
    } else {
        cmpToEdit.style["color"] = val
    }
    // updateCmp()
}

function setCmpToEdit(cmp) {
    cmpToEdit.value = cmp
    if (isColorOpen.value) return
    toggleColorPicker()
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
