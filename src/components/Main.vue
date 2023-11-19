<template>
    <div class="pa-3">
        <home-page  v-if="inHomePage"/>
        <about-page v-else-if="inAboutPage"/>
        <post-page v-else-if="inPostsPage"/>
        <contact-us-page v-else-if="inContactUsPage"/>
    </div>
</template>


<script>
    import { defineComponent } from 'vue';
    import HomePage      from "../pages/HomePage.vue";
    import AboutPage     from "../pages/AboutPage.vue";
    import PostsPage      from "../pages/Posts.vue";
    import ContactUsPage from "../pages/ContactUsPage.vue";

    export default defineComponent({
        name: "Main",

        /** DATA */
        data() {
            return {

            }
        },

        /** PROPS */
        props: {
            page: {
                type    : String,
                required: true
            }
        },

        /** COMPONENTS */
        components: {
            'home-page'      : HomePage,
            'about-page'     : AboutPage,
            'post-page'      : PostsPage,
            'contact-us-page': ContactUsPage
        },

        /** COMPUTED PROPERTIES */
        computed: {
            /**
             * Computed page is 'home' or not.
             * @returns {boolean}
             */
            inHomePage() {
                return this.page === 'home';
            },

            /**
             * Computed page is 'about' or not.
             * @returns {boolean}
             */
            inAboutPage() {
                return this.page === 'about';
            },

             /**
             * Computed page is 'post' or not.
             * @returns {boolean}
             */
             inPostsPage() {
                return this.page === 'posts';
            },

            /**
             * Computed page is 'contact' or not.
             * @returns {boolean}
             */
            inContactUsPage() {
                return this.page === 'contact';
            }
        }
    })
</script>


<style scoped>

</style>
