<template>
    <header class="site-header" @click.stop="onEditElement($event, 'site-header')" :style="cmp.style">
        <div class="logo-title">
            <img v-if="cmp.info.title.logo" :src="cmp.info.title.logo">
            <h1 :style="cmp.info.title.style" :contenteditable="isEdit" @click.stop="onEditElement($event, 'title')"
                @input="changeText($event, 'title')">
                {{ cmp.info.title.text }}
            </h1>
        </div>
        <nav>
            <a v-for="({ text, style, href }, idx) in cmp.info.links" :style="style" :href="href"
                :contenteditable="isEdit" @click.stop="onEditElement($event, 'links', idx)"
                @input="changeText($event, 'links', idx)">
                {{ text }}
            </a>
        </nav>
        <div @click="toggleMenu" class="menu-btn" :class="{ open: isOpen }">
            <div class="icon"></div>
        </div>
    </header>
</template>

<script setup>
import { watch, ref, defineProps, defineEmits, onMounted } from "vue";

const { cmp, isEdit } = defineProps({
    cmp: Object,
    isEdit: Boolean,
});
const emit = defineEmits(['onSetTxtColor', 'onChangeText', 'editElement'])

let isOpen = ref(false);

function onEditElement(ev, key, idx) {
    emit("editElement", key, idx)
}

function toggleMenu() {
    isOpen.value = !isOpen.value;
}

function changeText(ev, key, idx) {
    if (isPreview) return
    emit('onChangeText', ev.target.innerText, key, idx)
}


</script>
