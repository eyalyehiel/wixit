<template>
    <header class="graphic-designer-header" :style="cmp.style">
        <div class="logo-title">
            <img :src="cmp.style.logo" alt="">
            <h1 :style="cmp.info.title.style" contenteditable @input="changeText($event, 'title')" @click="setTxtColor($event)">{{ cmp.info.title.text }}
            </h1>
        </div>
        <nav>
            <a :style="style" contenteditable :href="href" @input="changeText($event, 'links', idx)"
                v-for="({ text,style, href }, idx) in cmp.info.links">
                {{ text }}
            </a>
        </nav>
        <div @click="toggleMenu" class="menu-btn" :class="{ open: isOpen }">
            <div class="icon"></div>
        </div>
    </header>

</template>

<script setup>
import { onMounted, defineProps, ref, defineEmits } from "vue";

const { cmp } = defineProps({ cmp: Object });
const emit = defineEmits(['onSetTxtColor', 'onChangeText'])

let isOpen = ref(false);

function toggleMenu() {
    isOpen.value = !isOpen.value;
}

function changeText(ev, key, idx) {
    emit('onChangeText', ev.target.innerText, key, idx)
}

function setTxtColor(ev) {
    emit('onSetTxtColor', ev.target)
}

</script>
