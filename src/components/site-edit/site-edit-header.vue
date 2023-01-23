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
                <tooltip-cmp :text="'Change the name of your site'" />
            </p>
        </section>
        <section class="actions">
            <button>
                <redoBtn class="action-btn" />
                <tooltip-cmp :text="'Undo'" />
            </button>
            <button>
                <undoBtn class="action-btn" />
                <tooltip-cmp :text="'Redo'" />
            </button>
            <button @click="toggleScale" class="scaling">100%</button>
        </section>
        <section class="publish">
            <button @click="$router.push(`${params.id}/preview`)">Preview</button>
            <button>Publish</button>
        </section>
    </header>
</template>

<script setup>
import tooltipCmp from '../tooltip.vue'
import undoBtn from "../../assets/svg/redo.vue"
import redoBtn from "../../assets/svg/undo.vue"
import desktopBtn from "../../assets/svg/desktop.vue"
import phoneBtn from "../../assets/svg/phone.vue"

import { ref, defineEmits } from "vue"
import { useRouter, useRoute } from "vue-router"

const router = useRouter()
const { params } = useRoute()
const emit = defineEmits(['onChangeDisplay'])
let displaySize = ref("desktop")


function toggleDisplaySize(val) {
    displaySize.value = val
    emit('onChangeDisplay', val)
}
</script>