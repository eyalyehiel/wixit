<template>
    <header class="editor-header">
        <section class="options">
            <button :class="{ selected: displaySize === 'desktop' }" @click="toggleDisplaySize('desktop')">
                <desktopBtn class="action-btn" />
            </button>
            <button :class="{ selected: displaySize === 'phone' }" @click="toggleDisplaySize('phone')">
                <phoneBtn class="action-btn" />
            </button>
        </section>
        <section class="url">
            <p>
                http://127.0.0.1:5173/#/site/<span contenteditable="true">HamburgerShop</span>
                <tooltip :text="'Change the name of your site'" />
            </p>
        </section>
        <section class="actions">
            <button>
                <redoBtn class="action-btn" />
                <tooltip :text="'Undo'" />
            </button>
            <button>
                <undoBtn class="action-btn" />
                <tooltip :text="'Redo'" />
            </button>
            <button @click="toggleScale" class="scaling">100%</button>
        </section>
        <section class="publish">
            <button>Preview</button>
            <button>Publish</button>
        </section>
    </header>
</template>

<script setup>
import undoBtn from "../../assets/svg/redo.vue"
import redoBtn from "../../assets/svg/undo.vue"
import desktopBtn from "../../assets/svg/desktop.vue"
import phoneBtn from "../../assets/svg/phone.vue"
// import plusBtn from "../../../assets/svg/plus.vue"

import { ref, defineEmits } from "vue"

const emit = defineEmits(['onChangeDisplay'])
let displaySize = ref("desktop")


function toggleDisplaySize(val) {
    displaySize.value = val
    emit('onChangeDisplay', val)
}
</script>