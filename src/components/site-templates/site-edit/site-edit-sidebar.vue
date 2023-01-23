<template>
    <section class="editor-sidebar">
        <nav class="editor-nav">
            <button @click="toggleMenu()">
                <!-- <plusBtn class="plus-btn"/> -->
                <img src="../../../assets/svg/plus-lg.svg" alt="" />
                <tooltip :text="'Add Elements'" />
            </button>
            <button @click="toggleCmpEditor()">
                <img src="../../../assets/svg/palette.svg" alt="" />
                <tooltip :text="'Edit Element'" />
            </button>
            <button>
                <img src="../../../assets/svg/file-richtext.svg" alt="" />
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
                <img src="../../../assets/svg/trash.svg" alt="" />
            </section>

            <section class="color-picker">
                <h1>BACKGROUND COLOR</h1>
                <section class="color-wrapper">
                    <section v-for="color in colors" @click="setColor(color)" :style="{ 'background-color': color }"
                        :key="color"></section>
                </section>
            </section>
            <section class="upload-img">
                <img src="../../../assets/svg/cloud-arrow-up-fill.svg" alt="" />
                <span>Drop file here or</span>
            </section>
        </section>
    </section>
</template>

<script setup>
import tooltip from "../../tooltip.vue";

import { useTemplateStore } from "../../../stores/template";
import { utilService } from "../../../services/utils-service";

import { ref, defineEmits, onMounted, onUpdated, watch } from "vue";

let isCmpsOpen = ref(false)
let isTemplatesOpen = ref(false)
let isCmpEditorOpen = ref(false)
let colors = ref(utilService.getEditColors())

const templateStore = useTemplateStore()
const emit = defineEmits(['onAddCmp', 'onToggleMenu', 'onToggleCmpEditor'])
const { cmpEditorOpen } = defineProps({ cmpEditorOpen: Boolean })

async function showCmps(cmpName) {
    await templateStore.loadFilteredCmps(cmpName)
    if (isTemplatesOpen.value) return templateStore.loadFilteredCmps(cmpName)
    isTemplatesOpen.value = !isTemplatesOpen.value
}

onUpdated(() => {
    console.log(cmpEditorOpen)
})

function toggleMenu() {
    // emit('onToggleMenu')
    isCmpsOpen.value = !isCmpsOpen.value
    isTemplatesOpen.value = false
    if (isCmpsOpen.value) isCmpEditorOpen.value = false
}

function toggleCmpEditor() {
    isCmpEditorOpen.value = !isCmpEditorOpen.value
    // if (!isCmpEditorOpen.value) return (cmpToEdit.value = null)
    isCmpsOpen.value = false
    isTemplatesOpen.value = false
}

function onAddCmp(cmp) {
    emit('onAddCmp', cmp)
}

watch(cmpEditorOpen, () => {
    toggleCmpEditor()
})

// watch(isCmpEditorOpen.value, () => {
//     emit('onToggleCmpEditor', isCmpEditorOpen.value)
// })
</script>