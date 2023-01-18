<template>
    <header class="graphic-designer-header" :style="cmp.style">
        <div>

            <img :src="cmp.style.logo " alt="">
            <h1 contenteditable @input="changeText($event, 'title')" @click="setTxtColor($event)">{{ cmp.info.title }}</h1>
        </div>
        <nav>
            <a contenteditable @input="changeText($event, 'links')" v-for="{ text, href } in cmp.info.links">{{
                text
            }}</a>
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

function changeText(ev, key) {
    emit('onChangeText', ev.target.innerText, key)
}

function setTxtColor(ev) {
    emit('onSetTxtColor', ev.target)
}

</script>
