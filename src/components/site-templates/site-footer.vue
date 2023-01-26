<template>
    <footer class="graphic-designer-footer" @click.stop="onEditElement($event, 'site-footer')" :style="cmp.info.style">
        <h1 :style="cmp.info.title.style" @click.stop="onEditElement($event, 'title')">{{ cmp.info.title.text }}</h1>
        <p :style="cmp.info.subtitle.style" @click.stop="onEditElement($event, 'subtitle')">
            {{
                cmp.info.subtitle.text ||
                "CoffeRights 2035 by. created with Wixit"
            }}
        </p>
    </footer>
</template>

<script setup>
import { defineProps } from "vue"

const { cmp } = defineProps({ cmp: Object })
const emit = defineEmits(["onChangeText", "editElement"])
function onEditElement(ev, key) {
    emit("editElement", key)
}
</script>
