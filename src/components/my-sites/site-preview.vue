<template>
    <article v-if="site" class="site-preview">
        <div class="image-container">
            <img src="" :alt="site._id">
            <div class="site-preview-cover">

            </div>
        </div>
        <div class="actions">
            <div class="title">
                <h3>{{ site.name }}</h3>
                <p>{{ site.status || 'Not Published' }}</p>
            </div>
            <button class="more-actions-btn">
                <threeDots />
                <!-- <img src="../../assets/svg/three-dots.svg" alt=""> -->
            </button>
        </div>
    </article>
</template>

<script setup>
import { defineProps } from 'vue';

import threeDots from '../../assets/svg/three-dots.vue';

const { site } = defineProps({ site: Object })
</script>