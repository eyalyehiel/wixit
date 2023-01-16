<template>
    <section v-if="siteToEdit" class="site-edit" :class="{ open: isOpen || isColorOpen }">
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
                    http://127.0.0.1:5173/#/site/<span contenteditable="true">HamburgerShop</span>
                </p>
                <button>
                    <img style="height: 28px;" src="../assets/svg/eye.svg" alt="">
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

            <section class="section-select" :class="{ open: isOpen }">
                <h2 class="title">Section</h2>
                <span>Header</span>
                <span>Hero</span>
                <span>Section</span>
                <span>Gallery</span>
                <span>Cards</span>
                <span>Testimonials</span>
                <span>Contact</span>
                <span>Video</span>
            </section>

            <section class="cmp-editor" :class="{ open: isColorOpen }">
                <div class="title">
                    <h2>Edit</h2>
                    <img src="../assets/svg/trash.svg" alt="" />
                </div>

                <div class="color-picker">
                    <h4>BACKGROUND COLOR</h4>
                    <section v-for="color in colors" :key="color">
                        <div :style="{ 'background-color': color }" :value="color"></div>
                    </section>
                </div>

            </section>

        </section>

        <section class="site-display" :class="displaySize">
            <pre>{{ siteToEdit.cmps[0] }}</pre>

            <!-- <component v-for="cmp in siteToEdit?.cmps" :is="cmp.type" :cmp="cmp" /> -->

            <component :is="siteToEdit.cmps[0].type" :cmp="siteToEdit.cmps[0]" />
            <!-- <site-header :cmp="siteToEdit.cmps?.[0]" /> -->
        </section>
    </section>
</template>

<script setup>
import SiteContact from '../components/site-templates/site-contact.vue';
import SiteFooter from '../components/site-templates/site-footer.vue';
import SiteHeader from '../components/site-templates/site-header.vue';
import SiteHero from '../components/site-templates/site-hero.vue';
import SiteImages from '../components/site-templates/site-images.vue';

import { onMounted, computed, ref, defineComponent } from "vue"
import { useRoute } from "vue-router"
import { siteService } from "../services/site-service.js"

let siteToEdit = ref(null)
let isOpen = ref(false)
let displaySize = ref("desktop")
let isColorOpen = ref(false);
let colors = ref(getEditColors());

const route = useRoute()

function toggleDisplaySize(val) {
    displaySize.value = val
}

onMounted(async () => {
    const { id } = route.params
    siteToEdit.value = id
        ? await siteService.getById(id)
        : siteService.getCoffeeSite()
})

function toggleMenu() {
    isOpen.value = !isOpen.value;
    console.log(isOpen);
}

function toggleColorPicker() {
    isColorOpen.value = !isColorOpen.value;
    console.log(isColorOpen);
}

function getEditColors() {
    return ['#0400ff', '#0064ff', '#00ca84', '#c400ff', '#864d01', '#ff9202', '#ef032a', '#263140', '#faebd7']
}
</script>
