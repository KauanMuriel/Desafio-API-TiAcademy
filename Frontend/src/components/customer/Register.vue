<template>
    <base-card>
        <div class="col-8">
            <h3>New Customer</h3>
            <hr />
            <div class="form" style="padding: 1%">
                <div class="">
                    <div>
                        <label class="form-label">Name</label>
                        <input type="text" required v-model="customer.name" class="form-control" placeholder="">
                    </div>
                    <div>
                        <label class="form-label">Login</label>
                        <input type="text" required v-model="customer.login" class="form-control" placeholder="">
                    </div>
                    <div>
                        <label class="form-label">Password</label>
                        <input type="password" required v-model="customer.password" class="form-control">
                    </div>
                    <button @click="registerCustomer" class="btn btn-success" style="margin-top: 3%">Register</button>
                </div>
            </div>
        </div>
    </base-card>
</template>

<script>
import CustomerDataService from '../../services/CustomerDataService';
import BaseCard from '../UI/BaseCard.vue';

export default {
    components: {
        BaseCard
    },
    data() {
        return {
            customer: {
                name: '',
                login: '',
                password: ''
            }
        }
    },
    methods: {
        registerCustomer() {
            const data = {
                name: this.customer.name,
                login: this.customer.login,
                password: this.customer.password
            };

            CustomerDataService.register(data)
                .then(() => {
                    this.$router.push('list');
                })
        }
    }
}
</script>