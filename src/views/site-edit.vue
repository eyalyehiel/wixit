<template>
    <section class="site-edit">
        <nav class="editor-header">
            <section class="options">
                <button>
                    <img src="../assets/svg/people.svg" alt="" />
                </button>
                <button>
                    <img src="../assets/svg/arrow-return-left.svg" alt="" />
                </button>
                <button>
                    <img src="../assets/svg/arrow-return-right.svg" alt="" />
                </button>
                <button>
                    <img src="../assets/svg/display.svg" alt="" />
                </button>
                <button>
                    <img src="../assets/svg/tablet.svg" alt="" />
                </button>
                <button>
                    <img src="../assets/svg/phone.svg" alt="" />
                </button>
            </section>
            <section class="publish">
              <input type="text">
              <button>Preview</button>
              <button>Publish</button>
            </section>
            <!-- <div class="options"> -->
            <!-- <section class="work-together gap"> -->
            <!-- </section> -->

            <!-- <section class="history-options gap"> -->
            <!-- </section> -->

            <!-- <section class="media-select gap"> -->
            <!-- </section> -->
            <!-- </div> -->
        </nav>

        <section class="editor-sidebar">
            <nav class="editor-nav"></nav>
        </section>
        <section class="main-site-display">
            <pre>
              {{ siteToEdit.cmps }}
        </pre
            >
        </section>
    </section>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue"
import { useRoute } from "vue-router"
import { siteService } from "../services/site-service.js"

let siteToEdit = ref({})
const route = useRoute()

onMounted(async () => {
    const { id } = route.params
    siteToEdit.value = id
        ? await siteService.getById(id)
        : siteService.getEmptySite()
    console.log("this.siteToEdit", siteToEdit)
})
</script>
