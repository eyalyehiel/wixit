<template>
    <section class="site-section" @click.stop="onEditElement($event, 'site-section')" :style="cmp.style"
        style="background-size: cover">
        <div class="txt-section">
            <h2 :style="cmp.info.title.style" @click.stop="onEditElement($event, 'title')" :contenteditable="isEdit">
                {{ cmp.info.title.text }}
            </h2>
            <p :style="cmp.info.paragraph1.style" @click.stop="onEditElement($event, 'paragraph1')"
                :contenteditable="isEdit">
                {{ cmp.info.paragraph1.text }}
            </p>
            <p :style="cmp.info.paragraph2.style" @click.stop="onEditElement($event, 'paragraph2')"
                :contenteditable="isEdit">
                {{ cmp.info.paragraph2.text }}
            </p>
        </div>

        <img v-for="img in cmp.info.images" :src="img" alt="" />
    </section>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const { cmp, isEdit } = defineProps({ cmp: Object, isEdit: Boolean });

const emit = defineEmits(["onChangeText", "editElement"]);

function onEditElement(ev, key) {
    emit("editElement", key);
}
</script>
