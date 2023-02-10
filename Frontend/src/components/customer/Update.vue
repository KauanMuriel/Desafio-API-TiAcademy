<template>
    <base-card>
        <button class="btn btn-primary btn-back" @click="$router.back()">Back</button>
        <h3>Update Seller</h3>
        <hr />
        <div class="form col-8">
            <div class="form-inputs">
                <div>
                    <label class="form-label">Id</label>
                    <input type="text" disabled v-model="customer.id" class="form-control" placeholder="">
                </div>
                <div>
                    <label class="form-label" for="input-name">Name</label>
                    <input type="text" required v-model="customer.name" id="input-name" class="form-control"
                        placeholder="">
                </div>
                <div>
                    <label class="form-label">Login</label>
                    <input type="text" disabled v-model="customer.login" class="form-control" placeholder="">
                </div>
                <div>
                    <label class="form-label">Password</label>
                    <input type="password" required v-model="customer.password" class="form-control">
                </div>
                <button @click="updateCustomer" class="btn btn-success col-3">Update</button>
            </div>
        </div>
    </base-card>
</template>
<script>
import BaseCard from '../UI/BaseCard.vue';
import CustomerDataService from '../../services/CustomerDataService';

export default {
    components: {
        BaseCard
    },
    data() {
        return {
            customer: {}
        }
    },
    methods: {
        getCustomer(id) {
            CustomerDataService.getById(id)
                .then(response => {
                    this.customer = response.data;
                });
        },
        updateCustomer() {
            CustomerDataService.update(this.customer.id, this.customer)
                .then(() => {
                    this.$router.push('list');
                });
        }
    },
    mounted() {
        this.getCustomer(this.$route.params.id);
    }
}
</script>