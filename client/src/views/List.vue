<template>
    <div class="wrapper">
        <div class="secrets-wrapper">
            <div class="input-group">
                <label for="url">Secret URL</label>
                <input type="text" v-model="url">
                <button @click="openSecret()">Search</button>
            </div>
            <div class="secrets-box" v-for="(secret,$index) in secrets" :key="$index">
                <span>
                    {{secret.url}}
                </span>
                <span>
                    {{secret.hash}}    
                </span>
                <span>
                    {{secret.secretText}}
                </span>
                <span>
                    {{secret.expiresAt}}
                </span>
                <span>
                    {{secret.remainingViews}}
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data:() => {
        return{
            url:'',
        }
    },
    mounted(){
        this.$store.dispatch('fetchSecret',this.$route.params.url);
    },
    computed:{
        secrets(){
            return this.$store.state.secrets;
        }
    },
    methods:{
        openSecret(){
            this.$store.dispatch('fetchSecret',this.url);
        }
    }
}
</script>

<style lang="scss">
    .secrets-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding:50px;
        .input-group{
            display:flex;
            flex-direction: column;
            margin-bottom:20px;
        }
        .secrets-box{
            flex: 1;
            display: flex;
            border: 1px solid lightgray;
            padding: 10px;
            border-radius: 4px;
            box-shadow: 0px 0px 7px 0px lightgrey;
            margin-bottom: 10px;
            flex-direction: column;
        }
    }
</style>