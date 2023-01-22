<template>
    <main class="main-login-container">
        <div class="main-txt">
            <h2>Log In</h2>
            <h1>
                Don't have an account?
                <span @click="openSignUp()">Sign Up</span>
            </h1>
        </div>

        <section class="signin-section">
            <div class="signin-with-email">
                <input type="email" placeholder="email" />
                <button>Continue with Email</button>
            </div>

            <div class="divider-container">
                <div></div>
                <label>or</label>
                <div></div>
            </div>

            <div class="social-signin">
                <!-- <h1>is initialize:{{ Vue3GoogleOauth.isInit }}</h1> -->
                <!-- <h1>is initialize:{{ Vue3GoogleOauth }}</h1> -->
                <button @click="signIn()">
                    <div class="buttonIcon">
                        <img src="../assets/svg/google-logo.svg" alt="" />
                    </div>
                    <span>Continue with Google</span>
                </button>

                <button @click="loginWithFacebook()">
                    <div class="buttonIcon">
                        <img src="../assets/svg/facebook-logo.svg" alt="" />
                    </div>
                    <span>Continue with Facebook</span>
                </button>

                <button>
                    <div class="buttonIcon last">
                        <img src="../assets/svg/apple-logo.svg" alt="" />
                    </div>
                    <span>Continue with Apple</span>
                </button>
            </div>
        </section>
    </main>
</template>

<script>
import { initFbsdk } from "../services/facebook_oAuth.js";
import { inject } from "vue";
import axios from "axios";

export default {
    props: {},
    data() {
        return {};
    },
    setup() {
        const Vue3GoogleOauth = inject("Vue3GoogleOauth");
        return {
            Vue3GoogleOauth,
        };
    },
    mounted() {
        initFbsdk();
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
        openSignUp() {
            this.$router.push("/signup");
        },
       
        async loginWithFacebook() {
            console.log("hey");
            try {
                const { authResponse } = await new Promise(FB.login);
                if (!authResponse) return router.push({ path: "/" });

                const accessToken = authResponse.accessToken;
                const response = await axios.facebookAuth(accessToken);

                console.log('response',response )
                // localStorage.setItem("token", response.token);
                // localStorage.setItem("refreshToken", response.refreshToken);
                // localStorage.setItem("user", response.User._id);
            } catch (error) {
                console.log(error);
            }
        },
    },
    components: {},
};
</script>
