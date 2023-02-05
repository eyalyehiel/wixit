<template>
    <header class="main-header">

        <div class="logo">
            <img @click="navigate('/')" src="../assets/svg/logo3.png" alt="" />
            <p>wixit</p>
            <!-- <img src="../assets/svg/unnamed (1).png" alt="" /> -->
        </div>
        <!-- <p class="logo"  @click="navigate('/')">w<span>ixit</span></p> -->

        <div class="header-btns">
            <button v-if="!isLoginPath" @click="navigate('/login')">
                Log In
            </button>
            <button @click="navigate('/select/templates')">Get Started</button>
        </div>
    </header>
</template>

<script setup>
import { watch, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const isLoginPath = ref(false);

function navigate(to) {
    router.push(to);
}

watch(route, () => {
    if (route.path === "/login" || route.path === "/signup")
        isLoginPath.value = true;
    else isLoginPath.value = false;
});
</script>
