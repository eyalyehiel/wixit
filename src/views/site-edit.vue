<template>
    <section
        v-if="siteToEdit"
        class="site-edit"
        :class="{ open: isCmpsOpen || isColorOpen }"
    >
        <nav class="editor-header">
            <section class="options">
                <button>
                    <img src="../assets/svg/people.svg" alt="" />
                </button>
                <button>
                    <img src="../assets/svg/arrow-90deg-left.svg" alt="" />
                </button>
                <button>
                    <img src="../assets/svg/arrow-90deg-right.svg" alt="" />
                </button>
                <button @click="toggleDisplaySize('desktop')">
                    <img src="../assets/svg/display.svg" alt="" />
                </button>
                <button @click="toggleDisplaySize('tablet')">
                    <img src="../assets/svg/tablet.svg" alt="" />
                </button>
                <button @click="toggleDisplaySize('phone')">
                    <img src="../assets/svg/phone.svg" alt="" />
                </button>
            </section>
            <section class="publish">
                <p>
                    http://127.0.0.1:5173/#/site/<span contenteditable="true"
                        >HamburgerShop</span
                    >
                </p>
                <button>
                    <img
                        style="height: 28px"
                        src="../assets/svg/eye.svg"
                        alt=""
                    />
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

            <section class="section-select" :class="{ open: isCmpsOpen }">
                <h2 class="title">Section</h2>
                <span @click="addCmp('site-header')">Header</span>
                <span @click="addCmp('site-hero')">Hero</span>
                <span @click="addCmp('site-section')">Section</span>
                <span @click="addCmp('site-gallery')">Gallery</span>
                <span @click="addCmp('site-cards')">Cards</span>
                <span @click="addCmp('testimonials')">Testimonials</span>
                <span @click="addCmp('contact')">Contact</span>
                <span @click="addCmp('video')">Video</span>
            </section>

            <section class="cmp-editor" :class="{ open: isColorOpen }">
                <div class="title">
                    <h2>Edit</h2>
                    <img src="../assets/svg/trash.svg" alt="" />
                </div>

                <div class="color-picker">
                    <h4>BACKGROUND COLOR</h4>
                    <section v-for="color in colors" :key="color">
                        <div
                            :style="{ 'background-color': color }"
                            :value="color"
                        ></div>
                    </section>
                </div>
            </section>
        </section>

        <section class="site-display" :class="displaySize">
            <component
                v-if="siteToEdit.cmps.length"
                v-for="cmp in siteToEdit.cmps"
                :is="cmpsToShow[cmp.type]"
                :cmp="cmp"
            />
            <section v-else class="drag-area">
                <h1>Place Element Here</h1>
            </section>
        </section>
    </section>
</template>

<script setup>
import siteContact from "../components/site-templates/site-contact.vue"
import siteFooter from "../components/site-templates/site-footer.vue"
import siteHeader from "../components/site-templates/site-header.vue"
import siteHero from "../components/site-templates/site-hero.vue"
import siteImages from "../components/site-templates/site-images.vue"
import siteSection from "../components/site-templates/site-section.vue"
import siteCards from "../components/site-templates/site-cards.vue"

import { onMounted, computed, ref, reactive, defineComponent } from "vue"
import { useRoute } from "vue-router"
import { siteService } from "../services/site-service.js"
import { utilService } from "../services/utils-service.js"

const cmpsToShow = {
    "site-header": siteHeader,
    "site-hero": siteHero,
    "site-footer": siteFooter,
    "site-section": siteSection,
    "site-contact": siteContact,
    "site-images": siteImages,
    "site-cards": siteCards,
}

let siteToEdit = ref(null)
siteToEdit = ref(siteToEdit)
// let computedSite = computed(() => siteToEdit.value)
let isCmpsOpen = ref(false)
let isColorOpen = ref(false)
let displaySize = ref("desktop")
let colors = ref(utilService.getEditColors())

const route = useRoute()

function toggleDisplaySize(val) {
    displaySize.value = val
}

onMounted(async () => {
    const { id } = route.params
    siteToEdit.value = id
        ? await siteService.getById(id)
        : siteService.getEmptySite()
})

function toggleMenu() {
    isCmpsOpen.value = !isCmpsOpen.value
    if (isCmpsOpen.value) isColorOpen.value = false
}

function toggleColorPicker() {
    isColorOpen.value = !isColorOpen.value
    if (isColorOpen.value) isCmpsOpen.value = false
}

function addCmp(type) {
    let newCmp = siteService.getNewCmp(type)
    siteToEdit.value.cmps.push(newCmp)
}
</script>
