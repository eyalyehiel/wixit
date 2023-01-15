<template>
    <div class="my-work-preview">
        <h3>{{ work.title }}</h3>
        <p>{{ work.subtitle }}</p>
        <img :src="work.images?.[0]" alt="">
    </div>
</template>

<script>
export default {
    props: {
        work: Object
    }
}
</script>