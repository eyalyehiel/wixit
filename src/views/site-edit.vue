<template>
    <section class="site-edit" :class="{ open: isOpen.value }">
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
                <button>Preview</button>
                <button>Publish</button>
            </section>
        </nav>

        <section class="editor-sidebar">
            <nav class="editor-nav">
                <button @click="toggleMenu()">
                    <img src="../assets/svg/plus-lg.svg" alt="" />
                </button>
                <button>
                    <img src="../assets/svg/palette.svg" alt="" />
                </button>
                <button>
                    <img src="../assets/svg/file-richtext.svg" alt="" />
                </button>
            </nav>

            <section class="section-select" :class="{ open: isOpen.value }">
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
        </section>

        <section class="site-display" :class="displaySize">
            <pre>
              {{ siteToEdit.cmps }}
        </pre
            >
        </section>
    </section>
</template>

<script setup>
import { onMounted, reactive, computed, watch, ref } from "vue"
import { useRoute } from "vue-router"
import { siteService } from "../services/site-service.js"

let siteToEdit = ref({})
let isOpen = reactive({ value: false })
let displaySize = ref("desktop")

function toggleDisplaySize(val) {
    displaySize.value = val
}
const route = useRoute()

onMounted(async () => {
    const { id } = route.params
    siteToEdit.value = id
        ? await siteService.getById(id)
        : siteService.getEmptySite()
    console.log("this.siteToEdit", siteToEdit)
})

function toggleMenu() {
    isOpen.value = !isOpen.value
    console.log(isOpen)
}
</script>
