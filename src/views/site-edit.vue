<template>
    <section class="site-edit" :class="{ open: isOpen.value || isColorOpen.value }" >
        <nav class="editor-header">
            <section class="options">
                <button>
                    <img src="../assets/svg/people.svg" alt="" />
                </button>
                <button>
                    <img src="../assets/svg/arrow-90deg-left.svg" alt="" />
                </button>
                <button>
                    <img src="../assets/svg/arrow-90deg-right.svg" alt="" />
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
                <p>
                    http://127.0.0.1:5173/#/site/<span contenteditable="true"
                        >HamburgerShop</span
                    >
                </p>
                <button>
                    <img style="height: 28px;" src="../assets/svg/eye.svg" alt="">
                </button>
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
            <nav class="editor-nav">
                <button @click="toggleMenu()">
                    <img src="../assets/svg/plus-lg.svg" alt="" />
                </button>
                <button @click="toggleColorPicker()">
                    <img src="../assets/svg/palette.svg" alt="" />
                </button>
                <button>
                    <img src="../assets/svg/file-richtext.svg" alt="" />
                </button>
            </nav>

            <section class="section-select" :class="{ open: isOpen.value }">
                <h2 class="title">Section</h2>
                <span>Header</span>
                <span>Hero</span>
                <span>Section</span>
                <span>Gallery</span>
                <span>Cards</span>
                <span>Testimonials</span>
                <span>Contact</span>
                <span>Video</span>
            </section>

            <section class="cmp-editor" :class="{ open: isColorOpen.value }">
                <div class="title">
                    <h2>Edit</h2>
                    <img src="../assets/svg/trash.svg" alt="" />
                </div>

                <div class="color-picker">
                    <h4>BACKGROUND COLOR</h4>
                    <section v-for="color in colors" :key="color">
                        <div :style="{'background-color': color}" :value="color"></div>
                    </section>
                </div>

            </section>

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
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { siteService } from "../services/site-service.js";

let siteToEdit = ref({});
let isOpen = reactive({ value: false });
let isColorOpen = reactive({ value: false });
let colors = ref(getEditColors());
const route = useRoute();

onMounted(async () => {
    const { id } = route.params;
    siteToEdit.value = id
        ? await siteService.getById(id)
        : siteService.getEmptySite();
    console.log("this.siteToEdit", siteToEdit);
});

function toggleMenu() {
    isOpen.value = !isOpen.value;
    console.log(isOpen);
}

function toggleColorPicker() {
    isColorOpen.value = !isColorOpen.value;
    console.log(isColorOpen);
}

function getEditColors(){
    return ['#0400ff', '#0064ff', '#00ca84','#c400ff', '#864d01', '#ff9202', '#ef032a', '#263140','#faebd7']
}
</script>
