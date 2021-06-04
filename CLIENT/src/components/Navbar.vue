<template>
    <!-- navbar -->
        <nav class="navbar shadow-lg navbar-light kanban-navbar justify-content-between sticky-top">
            <h3 class="text-white">Kanban App</h3>
            <a @click.prevent="logout">
                <GoogleLogin :params="params" :logoutButton=true class="btn btn-danger">Logout</GoogleLogin>
            </a>
        </nav>
    <!-- navbar -->
</template>

<script>
import GoogleLogin from 'vue-google-login';

export default {
    name: 'Navbar',
    data () {
        return {
            currentLoggedIn: localStorage.getItem('email'),
            params: {
                    client_id: "317025457916-29gjl914gftv40fi6u15t1dbbr2f6u7e.apps.googleusercontent.com"
            }
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('access_token')
            localStorage.removeItem('email')
            this.$emit("logout", "landingpage")
        }
    },
    props: ['logoutButton'],
    components: {
        GoogleLogin
    }
}
</script>

<style>

</style>