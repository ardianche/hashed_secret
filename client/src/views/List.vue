<template>
    <div class="wrapper">
        <div class="p">
            {{secrets}}
        </div>
    </div>
</template>
<script>
export default {
    mounted(){
        this.$store.dispatch('fetchSecret');
    },
    computed:{
        secrets(){
            return this.$store.state.secrets;
        }
    }
}
</script>