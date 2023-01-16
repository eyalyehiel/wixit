<template>
    <header class="main-header">
        <img @click="goToHome" src="../assets/svg/wix-logo.svg.svg" alt="" />

        <div class="header-btns">
            <button>Log In</button>
            <button @click="goToTemplate" >Get Started</button>
        </div>
        
    </header>
</template>

<script>
export default {
    props: {},
    data() {
        return {};
    },
    created() {},
    methods: {
        goToTemplate() {
            this.$router.push("/site");
        },
        goToHome() {
            this.$router.push("/");
        },
    },
    components: {},
};
</script>
