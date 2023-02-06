<template>
    <section class="editor-sidebar">
        <nav class="editor-nav">
            <button @click="toggleMenu()">
                <!-- <plusBtn class="plus-btn"/> -->
                <!-- <img src="../../../assets/svg/plus-lg.svg" alt="" /> -->
                <blackCircle />
                <plus class="plus-btn" />
                <tooltip-cmp :text="'Add Elements'" />
            </button>
            <button @click="toggleCmpEditor()">
                <img src="../../assets/svg/palette.svg" alt="" />
                <tooltip-cmp :text="'Edit Element'" />
            </button>
            <button @click="toggleThemes()">
                <img src="../../assets/svg/file-richtext.svg" alt="" />
                <tooltip-cmp :text="'Change Theme'" />
            </button>
        </nav>

        <div class="add-section" :class="{ open: isCmpsOpen }">
            <header>
                <h1>Add Section</h1>
            </header>
            <section class="section-select">
                <button
                    v-for="section in templateStore.sectionList"
                    :class="{ active: currentSectionBtn === section }"
                    @click="showCmps(section)"
                >
                    {{ section }}
                </button>
            </section>
            <section class="section-templates">
                <button
                    v-for="cmp in templateStore.filteredCmps"
                    @click="onAddCmp(cmp)"
                >
                    {{ cmp.type }}
                </button>
            </section>
        </div>

        <section class="cmp-editor" :class="{ open: isCmpEditorOpen }">
            <header class="title">
                <h1>Edit {{ "Section" }}</h1>
                <button @click="emit('onRemoveCmp')">
                    <img src="../../assets/svg/trash.svg" alt="" />
                </button>
            </header>

            <section v-if="!cElementFocused" class="color-picker">
                <h1>BACKGROUND COLOR</h1>
                <section class="color-wrapper">
                    <section
                        v-for="color in colors"
                        @click="changeCmpBgColor(color)"
                        :style="{ 'background-color': color }"
                        :key="color"
                    ></section>
                </section>
            </section>
            <section v-if="!cElementFocused" class="upload-img">
                <img src="../../assets/svg/cloud-arrow-up-fill.svg" alt="" />
                <span>Drop file here or</span>
            </section>
            <section v-if="cElementFocused" class="font-color-picker">
                <h1>TEXT COLOR</h1>
                <section class="color-wrapper">
                    <section
                        v-for="color in colors"
                        @click="setValueToKey('color', $event, color)"
                        :style="{ 'background-color': color }"
                        :key="color"
                    ></section>
                </section>
            </section>
            <section v-if="cElementFocused" class="font-style-picker">
                <h1>FONT STYLE</h1>
                <section class="font-wrapper">
                    <section v-for="font in fonts" :key="font.code">
                        {{ font.code }}
                    </section>
                </section>
            </section>
            <section v-if="cElementFocused" class="font-style-picker">
                <h1>FONT SIZE</h1>
                <input
                    type="range"
                    min="2"
                    max="100"
                    @input="setValueToKey('fontSize', $event)"
                />
            </section>
        </section>
        <section class="theme-selector" :class="{ open: isThemesOpen }">
            <header>
                <h1>Choose Theme</h1>
            </header>
            <section
                @click="setTheme(theme)"
                v-for="theme in themes"
                :key="theme"
            >
                <button
                    :style="{ 'background-color': theme['background-color'] }"
                ></button>
                <button :style="{ 'background-color': theme.color }"></button>
                <button :style="{ 'background-color': theme.others }"></button>
            </section>
        </section>
    </section>
</template>

<script setup>
import tooltipCmp from "../tooltip.vue"
import plus from "../../assets/svg/plus.vue"
import blackCircle from "../../assets/svg/black-circle.vue"

import { useTemplateStore } from "../../stores/template"
import { utilService } from "../../services/utils-service"

import { ref, defineEmits, watch, onMounted } from "vue"

const isCmpsOpen = ref(false)
// const isTemplatesOpen = ref(false)
const isCmpEditorOpen = ref(false)
const isThemesOpen = ref(false)
const cElementFocused = ref(false)
const currentSectionBtn = ref("header")

const colors = ref(utilService.getEditColors())
const fonts = ref(utilService.getFonts())
const themes = ref(utilService.getThemes())

const templateStore = useTemplateStore()
const emit = defineEmits([
    "onAddCmp",
    "onToggleMenu",
    "onToggleCmpEditor",
    "onSetTheme",
    "onUpdateElement",
    "onChangeCmpBgColor",
    "onRemoveCmp",
])
const { cmpEditorOpen, selectedElementKey } = defineProps({
    cmpEditorOpen: Object,
    selectedElementKey: String,
})

onMounted(() => {
    templateStore.loadFilteredCmps("header")
})

async function showCmps(cmpName) {
    let prevCurrentSectionBtn = currentSectionBtn.value
    try {
        currentSectionBtn.value = cmpName
        await templateStore.loadFilteredCmps(cmpName)
        // if (isTemplatesOpen.value)
        //     return templateStore.loadFilteredCmps(cmpName)
    } catch (err) {
        currentSectionBtn.value = prevCurrentSectionBtn
        console.log("error", err)
    }
}

function toggleMenu() {
    isCmpsOpen.value = !isCmpsOpen.value
    // isTemplatesOpen.value = false
    isThemesOpen.value = false
    if (isCmpsOpen.value) isCmpEditorOpen.value = false
}

function toggleCmpEditor() {
    isCmpEditorOpen.value = !isCmpEditorOpen.value
    isCmpsOpen.value = false
    // isTemplatesOpen.value = false
    isThemesOpen.value = false
}

function toggleThemes() {
    isThemesOpen.value = !isThemesOpen.value
    isCmpEditorOpen.value = false
    isCmpsOpen.value = false
    // isTemplatesOpen.value = false
}

function onAddCmp(cmp) {
    emit("onAddCmp", cmp)
}

function setValueToKey(key, { target }, value) {
    emit(
        "onUpdateElement",
        key,
        key === "fontSize" ? target.value + "px" : value
    )
}

function changeCmpBgColor(color) {
    emit("onChangeCmpBgColor", color)
}
function setTheme(theme) {
    emit("onSetTheme", theme)
}

watch(selectedElementKey, () => {
    cElementFocused.value = selectedElementKey?.value.includes("site")
        ? false
        : selectedElementKey
    console.log('selectedElementKey',selectedElementKey)
})
watch(cmpEditorOpen, () => {
    toggleCmpEditor()
})
</script>
