<template>
    <div class="content col-4">
    <h3>New Seller</h3>
    <hr/>
    <div class="form" style="padding: 1%">
        <div class="">
            <div>
                <label class="form-label">Name</label>
                <input type="text" required v-model="seller.name" class="form-control" placeholder="">
            </div>
            <div>
                <label class="form-label">Login</label>
                <input type="text" required v-model="seller.login" class="form-control" placeholder="">
            </div>
            <div>
                <label class="form-label">Password</label>
                <input type="password" required v-model="seller.password" class="form-control">
            </div>
            <button  @click="registerSeller" class="btn btn-success" style="margin-top: 3%">Register</button>
        </div>
    </div>
</div>
</template>

<script>
    import SellerDataService from '../../services/SellerDataService';

    export default {
        data() {
            return {
                seller: {
                    name: '',
                    login: '',
                    password: ''
                }
            }
        },
        methods: {
            registerSeller() {
                const data = {
                    name: this.seller.name,
                    login: this.seller.login,
                    password: this.seller.password
                };

                SellerDataService.register(data)
                    .then(() => {
                        this.$router.push('list');
                    })
            }
        }
    }
</script>

<style>
.content {
  margin-top: 5%;
}
#app {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>