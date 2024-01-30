<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar :title="title">
            <template v-slot:prepend>
                <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            </template>
            <template v-slot:append>
                <v-switch
                    v-model="isDark"
                    hide-details
                    inset="true"
                    label="Dark Mode"
                    @change="toggleTheme"
                >
                </v-switch>
            </template>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" permanent="true">
            <v-card
                class="mx-auto pa-2"
                max-width="300"
                variant="flat"
            >
                <v-list>
                    <v-list-item
                        v-for="(sidebarItem, sidebarItemIndex) in sidebar.items"
                        :key="sidebarItem.id"
                        :value="sidebarItem"
                        color="primary"
                        rounded="xl"
                        class="my-1"
                        :active="sidebarItem.id === page"
                        @click="navigate(sidebarItem.id)"
                    >
                        <template v-slot:prepend>
                            <v-icon :icon="sidebarItem.icon"></v-icon>
                        </template>

                        <v-list-item-title v-text="sidebarItem.text"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-navigation-drawer>

        <v-main>
            <app-main :page="page"/>
            <router-view></router-view>
        </v-main>
    </v-layout>
</template>


<script>
    import { defineComponent } from 'vue';
    import Main    from "./components/Main.vue";

    export default defineComponent({
        name: 'App',

        /** DATA */
        data() {
            return {
                title : 'Louie',
                isDark: true,
                drawer: true,
                page  : 'posts',
                sidebar: {
                    items: [
                        { id: 'home'   , text: 'Home'      , icon: 'mdi-home'        },
                        { id: 'posts'  , text: 'Posts'     , icon: 'mdi-chat'        },
                        { id: 'about'  , text: 'About'     , icon: 'mdi-information' },
                        { id: 'contact', text: 'Contact Us', icon: 'mdi-account-box' },
                    ],
                }
            }
        },

        /** COMPONENTS */
        components: {
            'app-main': Main,
        },

        /** METHODS */
        methods: {
            toggleTheme() {
                this.$vuetify.theme.global.name = this.isDark ? 'dark' : 'light';
            },

            navigate(page) {
              this.$router.push({ name: page });
            }
        }
    });
</script>


<style>
    /* To set scrollbar width */
    ::-webkit-scrollbar {
    width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 9px;
    border: 2px solid white; /* Use your background color instead of White */
    background-clip: content-box;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 9px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
    }
</style>
