<template>
    <section class="site-display" :class="displaySize">
        <component v-if="siteStore.siteToShow?.cmps?.length" v-for="cmp in siteStore.siteToShow.cmps"
            :is="cmpsToShow[cmp.type]" :cmp="cmp" />
        <section v-else>
            <h1>No Site Found please try again later</h1>
        </section>
    </section>
</template>

<script setup>
import siteFooter from "../site-templates/site-footer.vue"
import siteContact from "../site-templates/site-contact.vue"
import siteCards from "../site-templates/site-cards.vue"
import siteGallery from "../site-templates/site-gallery.vue"
import siteSection from "../site-templates/site-section.vue"
import siteHero from "../site-templates/site-hero.vue"
import siteHeader from "../site-templates/site-header.vue"

import { useSiteStore } from "../../stores/site"
import { useRoute } from "vue-router"

const cmpsToShow = {
    "site-header": siteHeader,
    "site-hero": siteHero,
    "site-section": siteSection,
    "site-cards": siteCards,
    "site-gallery": siteGallery,
    "site-contact": siteContact,
    "site-footer": siteFooter,
}

const siteStore = useSiteStore()
const route = useRoute()

// const cmpToEdit = ref(null)
// const focusedElement = ref(null)
// const isCmpEditorOpen = ref(false)
// const isPreview = ref(false)

onMounted(() => {
    console.log(siteStore.siteToShow)
    isPreview.value = route.path.includes('preview')
})

watch(route, () => {
    isPreview.value = route.path.includes('preview')
})

// function setCmpToEdit(cmp) {
//     cmpToEdit.value = cmp
//     isCmpEditorOpen.value = !isCmpEditorOpen.value
// }

// function editElement(key) {
//     focusedElement.value = key
// }

// function changeText(text, key, idx) {
//     typeof cmpToEdit.value.info[key] === Array
//         ? (cmpToEdit.value.info[key][idx].text = text)
//         : (cmpToEdit.value.info[key].text = text)
//     updateCmp()
// }
</script>