<template>
    <h1>Hello CREATE</h1>
    <button @click="callAxios()"> Call Axios </button>
</template>
<script>
export default {
    methods:{
        callAxios(){
            return this.$store.dispatch('fetchSecret');
        }
    }
}
</script>