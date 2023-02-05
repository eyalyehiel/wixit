<template>
    <section class="site-app">
        <!-- <nav class="site-nav">
            <ul>
                <button @click="toggleView('my-projects')">
                    <li><span> My Projects </span><arrow-right /></li>
                </button>
                <button @click="toggleView('add-project')">
                    <li><span> Add Project </span><arrow-right /></li>
                </button>
            </ul>
        </nav> -->
        <section class="site-view">
            <!-- <my-projects v-if="currView === 'my-projects'" />
            <template-selector v-else /> -->
            <RouterView />
        </section>

    </section>
</template>

<script setup>
import { RouterView } from 'vue-router'

import myProjects from "../components/my-projects.vue";
import templateSelector from "../components/template-selector.vue";
import arrowRight from "../assets/svg/arrow-right-tiny.vue";
import { ref } from "vue";

const currView = ref("my-projects");

function toggleView(value) {
    currView.value = value;
}
</script>
