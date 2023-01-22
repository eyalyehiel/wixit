<template>
    <header class="main-header">
        <img
            @click="navigate('/')"
            src="../assets/svg/wix-logo.svg.svg"
            alt=""
        />
        <!-- <p><span>w</span>ixit</p> -->
        <div class="header-btns">
            <button v-if="!isLoginPath" @click="navigate('/login')">Log In</button>
            <button @click="navigate('/site')">Get Started</button>
        </div>
    </header>
</template>

<script setup>
import { watch, ref } from "vue"
import { useRouter, useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()
const isLoginPath = ref(false)

function navigate(to) {
    router.push(to)
}

watch(route, () => {
    if (route.path === "/login" || route.path === "/signup") isLoginPath.value = true
    else isLoginPath.value = false
    console.log(isLoginPath.value);
})
</script>
