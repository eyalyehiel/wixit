<template>
    <main class="my-work">
        <h2>My Work</h2>
        <my-work-list :myWork="myWork" />
    </main>
</template>

<script>
import { ref } from 'vue';
import myWorkList from './my-work-list.vue'

export default {
    components: {
        myWorkList
    },
    setup() {
        const myWork = ref([
            {
                title: '',
                subtitle: '',
                images: []
            },
            {
                title: '',
                subtitle: '',
                images: []
            },
            {
                title: '',
                subtitle: '',
                images: []
            },
            {
                title: '',
                subtitle: '',
                images: []
            },
            {
                title: '',
                subtitle: '',
                images: []
            },
        ])
    }
}
</script>