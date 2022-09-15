<template>
    <div id="app">
        <h1 id="ele">TEST</h1>
        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
    name: "App",
    components: {
        HelloWorld,
    },
    data() {
        return {
            count: 4,
        };
    },
    created() {
        console.log("############ created ############");
        console.log("dom api ele : ", document.getElementById("ele"));
    },
    methods: {},
    mounted() {
        console.log("############ mounted ############");
        console.log("dom api ele : ", document.getElementById("ele"));
    },
    destroyed() {
        console.log("############ destroyed ############");
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
