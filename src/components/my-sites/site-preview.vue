<template>
    <article v-if="site" class="site-preview">
        <div class="image-container">
            <img src="https://robohash.org/123?set=set5" :alt="site._id">
            <div class="site-preview-cover">
                <button class="btn-pill-blue">Edit Site</button>
            </div>
        </div>
        <div class="actions">
            <div class="title">
                <h3>{{ site.name }}</h3>
                <p>{{ site.status || 'Not Published' }}</p>
            </div>
            <button @click="showMoreActions" class="more-actions-btn" :class="{ active: isMoreActions }">
                <threeDots />
                <Transition>
                    <div v-if="isMoreActions" class="more-actions">
                        <button>Preview Site</button>
                        <button>Duplicate Site</button>
                        <hr>
                        <button>Move To Trash</button>
                    </div>
                </Transition>
                <div class="site-actions-popup">
                    <p>Site Actions</p>
                </div>
            </button>
        </div>
    </article>
</template>

<script setup>
import { defineProps, ref } from 'vue';

import threeDots from '../../assets/svg/three-dots.vue';

const isMoreActions = ref(false)

const { site } = defineProps({ site: Object })

function showMoreActions() {
    isMoreActions.value = !isMoreActions.value
}
</script>