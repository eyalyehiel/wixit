<template>
    <section class="site-app">
        <nav class="site-nav">
            <ul>
                <router-link to="#">
                    <li><span> My Projects </span><arrow-right /></li>
                </router-link>
                <router-link to="#">
                    <li><span> Add Project </span><arrow-right /></li>
                </router-link>
            </ul>
        </nav>
        <section class="site-view"></section>
    </section>
</template>

<script>
import arrowRight from "../assets/svg/arrow-right-tiny.vue"

export default {
    components: {
        arrowRight,
    },
}
</script>
