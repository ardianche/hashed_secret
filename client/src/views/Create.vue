<template>
    <div class="create-wrapper">
        <div class="form-wrapper">
            <div class="input-group">
                <label for="secret">Secret</label>
                <input name="secret" type="text" v-model="secret">
            </div>
            <div class="input-group">
                <label for="expireAfterViews">Expires after views</label>
                <input name="expireAfterViews" type="text" v-model="expireAfterViews">
            </div>
            <div class="input-group">
                <label for="expireAfter">Expires after x minutes</label>
                <input name="expireAfter" type="text" v-model="expireAfter">
            </div>
        </div>
            <button @click="createSecret()">Create Secret</button>
            <div class="secret-container" v-if="newSecret != null">
                <div class="text-group">
                    <label for="url">URL</label>
                    <span>
                        <a :href="`http://localhost:3000/list/${newSecret.url}`">Go to Secret</a>
                    </span>
                </div>
                <div class="text-group">
                    <label for="hash">HASH</label>
                    <span>
                        {{newSecret.hash}}
                    </span>
                </div>
                <div class="text-group">
                    <label for="secretText">Secret Text</label>
                    <span>
                        {{newSecret.secretText}}
                    </span>
                </div>
                <div class="text-group">
                    <label for="expiresAt">Expires At: </label>
                    <span>
                        {{newSecret.expiresAt}}
                    </span>
                </div>
                <div class="text-group">
                    <label for="remainingViews">Remaining Views: </label>
                    <span>
                        {{newSecret.remainingViews}}
                    </span>
                </div>
            </div>
    </div>
</template>
<script>
export default {
    data:()=>{
        return{
            newSecret : null,
            secret:'',
            expireAfterViews:0,
            expireAfter:0
        }
    },
    computed:{
        secrets(){
            return this.$store.state.secrets;
        }
    },
    methods:{
        createSecret(){
            let payload = {
                secret: this.secret,
                expireAfterViews : this.expireAfterViews,
                expireAfter : this.expireAfter
            }
            this.$store.dispatch('createSecret',payload)
                .then((res) => {
                    this.newSecret = res;
                    this.$forceUpdate();
            });
        }
    }
}
</script>
<style lang="scss">
    .create-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .form-wrapper{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            .input-group{
                display:flex;
                flex-direction: column;
                align-items: flex-start;
                padding:4px;
            }
        }
    }
    .text-group{
            display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid lightgray;
    padding: 10px;
    }
</style>