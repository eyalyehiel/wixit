<template>
    <section class="site-edit">

        <nav class="editor-header">

            <div class="options">

                <section class="work-together gap">
                    <img src="../assets/svg/people.svg" alt="">
                </section>

                <section class="history-options gap">
                    <img src="../assets/svg/arrow-90deg-left.svg" alt="">
                    <img src="../assets/svg/arrow-90deg-right.svg" alt="">
                </section>

                <section class="media-select gap">
                    <img src="../assets/svg/display.svg" alt="">
                    <img src="../assets/svg/tablet.svg" alt="">
                    <img src="../assets/svg/phone.svg" alt="">
                </section>

            </div>
        </nav>

        <section class="editor-sidebar">

            <nav class="editor-nav">
                <img src="../assets/svg/plus-lg.svg" alt="">
                <img src="../assets/svg/palette.svg" alt="">
                <img src="../assets/svg/file-richtext.svg" alt="">
            </nav>
            
        </section>

        <section class="main-site-display">
        <pre>
              {{ siteToEdit.cmps }}
        </pre>
       </section>

    </section>

    

</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { siteService } from "../services/site-service.js";

let siteToEdit = ref({});
const route = useRoute();

onMounted(async () => {
    const { id } = route.params;
    siteToEdit.value = id
        ? await siteService.getById(id)
        : siteService.getEmptySite();
    console.log("this.siteToEdit", siteToEdit);
});
</script>
