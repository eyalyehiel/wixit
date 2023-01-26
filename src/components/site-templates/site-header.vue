<template>
    <header class="site-header" @click.stop="onEditElement($event, 'site-header')" :style="cmp.style">
        <div class="logo-title">
            <img :src="cmp.style.logo">
            <h1 :style="cmp.info.title.style" :contenteditable="isPreview" @click.stop="onEditElement($event, 'title')"
                @input="changeText($event, 'title')">{{
                    cmp.info.title.text
                }}
            </h1>
        </div>
        <nav>
            <a :style="style" :contenteditable="isPreview" @click.stop="onEditElement($event, 'links', idx)"
                :href="href" @input="changeText($event, 'links', idx)"
                v-for="({ text, style, href }, idx) in cmp.info.links">
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

const { cmp, isPreview } = defineProps({
    cmp: Object,
    isPreview: {
        type: Boolean,
        default: true
    }
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
