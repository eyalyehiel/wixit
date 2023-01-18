<template>
    <header class="graphic-designer-header" :style="cmp.style">
        <h1 @click="setTxtColor($event)">{{ cmp.info.title }}</h1>
        <nav>
            <a v-for="{ text, href } in cmp.info.links">{{ text }}</a>
        </nav>
        <div @click="toggleMenu" class="menu-btn" :class="{ open: isOpen }">
            <div class="icon"></div>
        </div>
    </header>
</template>

<script setup>
import { onMounted, defineProps, ref, defineEmits} from "vue";

const { cmp } = defineProps({ cmp: Object });
onMounted(() => {});
const emit = defineEmits(['onSetTxtColor'])

let isOpen = ref(false);

function toggleMenu() {
    isOpen.value = !isOpen.value;
}

function setTxtColor(ev) {
    console.log('ev',ev)
    emit('onSetTxtColor', ev.target)
}

</script>
