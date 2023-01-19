<template>
    <main class="main-signUp-container">
        <div class="main-txt">
            <h2>Sign Up</h2>
            <h1>Already have an account? <span>Log In</span></h1>
        </div>

        <section class="signin-section">
            <div class="signin-with-email">
                <input type="email" placeholder="email" />
                <input type="email" placeholder="UserName" />
                <input type="Password" placeholder="Password" />
                <button>Sign Up</button>
            </div>

            <div class="divider-container">
                <div></div>
                <label>or</label>
                <div></div>
            </div>

            <div class="social-signin">
                <!-- <h1>is initialize:{{ Vue3GoogleOauth.isInit }}</h1> -->
                <button @click="signIn()">
                    <div class="buttonIcon">
                        <img src="../assets/svg/google-logo.svg" alt="" />
                    </div>
                    <span>Continue with Google</span>
                </button>

                <button>
                    <div class="buttonIcon">
                        <img src="../assets/svg/facebook-logo.svg" alt="" />
                    </div>
                    <span>Continue with Facebook</span>
                </button>

                
            </div>
        </section>
    </main>
</template>

<script>

import { inject } from 'vue';

export default {
    props: {},
    data() {
        return {};
    },
    setup() {
        const Vue3GoogleOauth = inject("Vue3GoogleOauth");
        return{
            Vue3GoogleOauth
        }
    },
    created() {},
    methods: {
        async signIn() {
            try {
                const googleUser = await this.$gAuth.signIn();
                console.log("googleUser", googleUser);
            } catch (error) {
                //on fail do something
                console.error(error);
                return null;
            }
        },
    },
    components: {},
};
</script>