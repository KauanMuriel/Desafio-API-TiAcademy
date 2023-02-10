<template>
    <base-list>
        <div class="col-10">
            <h3>Customers</h3>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Login</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(customer, index) in customers" :key="index">
                        <td>{{ customer.id }}</td>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.login }}</td>
                        <td>
                            <button @click="" class="btn btn-primary col-4">Edit</button>
                            <button @click="" class="btn btn-danger col-4">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-success" @click="redirectRegister">Register New Customer</button>
        </div>
    </base-list>
</template>

<script>
import BaseList from '../UI/BaseList.vue';
import CustomerDataService from '../../services/CustomerDataService';

export default {
    components: {
        'base-list': BaseList
    },
    data() {
        return {
            customers: []
        }
    },
    methods: {
        getCustomers() {
            CustomerDataService.list().then(response => {
                this.customers = response.data;
            });
        },
        redirectRegister() {
            this.$router.push('/customer/register');
        }
    },
    mounted() {
        this.getCustomers();
    }
}
</script>