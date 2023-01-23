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

                <button @click="logInWithFacebook()">
                    <div class="buttonIcon">
                        <img src="../assets/svg/facebook-logo.svg" alt="" />
                    </div>
                    <span>Continue with Facebook</span>
                </button>

                <button @click="logInOut()">
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
import facebookLogin from "facebook-login-vuejs";

// import { initFbsdk } from "../services/facebook_oAuth.js";
import { inject } from "vue";
import axios from "axios";

export default {
    name: "facebookLogin",
    props: {},
    components: {
        facebookLogin,
    },
    data() {
        return {};
    },

    setup() {
        const Vue3GoogleOauth = inject("Vue3GoogleOauth");
        return {
            Vue3GoogleOauth,
        };
    },
    mounted() {},
    created() {
        
        
    },
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
        async logInWithFacebook() {
            await this.loadFacebookSDK(document, "script", "facebook-jssdk");
            await this.initFacebook();
            window.FB.login(function (response) {
                if (response.authResponse) {
                    alert("You are logged in &amp; cookie set!");
                } else {
                    alert("User cancelled login or did not fully authorize.");
                }
            });
            return false;
        },
        logInOut() {
            FB.getLoginStatus(function (response) {
                FB.logout(function (response) {
                    console.log("Logged Out!");
                    // window.location = "/";
                });
            });
        },
        async initFacebook() {
            console.log('init')
            window.fbAsyncInit = function () {
                window.FB.init({
                    appId: "1323495125159374", //You will need to change this 1323495125159374 8220179XXXXXXXXX
                    cookie: true, // This is important, it's not enabled by default
                    version: "v13.0",
                });
            };
        },
        async loadFacebookSDK(d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/all.js";
            fjs.parentNode.insertBefore(js, fjs);
        },
    },
    components: {},
};
</script>
