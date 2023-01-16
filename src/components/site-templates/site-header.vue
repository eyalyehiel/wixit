<template>
    <header class="graphic-designer-header">
        <h1>{{ props.info.title }}</h1>
        <nav>
            <a href="#" v-for="link in props.info.links">{{ link }}</a>
        </nav>
    </header>
</template>

<script>
export default {
    setup(props) {

    }
}
</script>