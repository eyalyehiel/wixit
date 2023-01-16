<template>
    <main class="home-view">
        <section class="hero">
            <h1>Create a website without limits</h1>
            <h3>
                Discover the platform that gives you the freedom to create,
                design, manage and develop your web presence exactly the way you
                want
            </h3>
            <button @click="navigate">Get Started</button>
            <p>Try Wix. No credit card required.</p>
            <img src="" alt="image" />
        </section>
        <section class="one-platform">
            <h1>One platform, infinite possibilities</h1>
            <div class="info-container">
                <div class="info-preview">
                    <h4>Unlimited creation</h4>
                    <p>
                        Create a website with a complete suite of advanced
                        functionalities and bring your vision to life.
                    </p>
                </div>
                <div class="info-preview">
                    <h4>Powerful infrastructure</h4>
                    <p>
                        Get an enterprise-grade foundation, engineered for your
                        limitless scalability and peace of mind.
                    </p>
                </div>
                <div class="info-preview">
                    <h4>The place for growth</h4>
                    <p>
                        Convert and scale seamlessly with built-in marketing and
                        business solutions.
                    </p>
                </div>
            </div>
            <button @click="navigate">Get Started</button>
        </section>
        <section class="website-template">
            <h1>Website templates that set you up for success</h1>
            <h4>
                Get a headstart on your journey with 900+ free, customizable
                website templates, strategically researched and tailored for
                every industry — or start from a blank canvas on our website
                builder.
            </h4>
            <button @click="navigate">Get Started</button>
            <!-- carrousel -->
        </section>
    </main>
</template>

<script setup>
import { useRouter } from "vue-router"
const router = useRouter()

function navigate() {
    router.push("/site")
}
</script>
