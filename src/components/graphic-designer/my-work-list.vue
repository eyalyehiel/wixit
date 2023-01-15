<template>
    <div class="my-work-list" v-for="work in myWork">
        <my-work-preview :work="work" />
    </div>
</template>

<script>
export default {
    props: {
        myWork: Array
    }
}
</script>