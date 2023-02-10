<template>
    <base-list>
        <div class="col-10">
            <div class="list-header">
                <h3>Customers</h3>
                <form class="d-flex" role="search" @submit.prevent>
                    <button @click="getCustomers" class="col-2 btn btn-secondary" id="reset-btn">X</button>
                    <input class="form-control me-2" type="search" placeholder="Customer id" aria-label="Search"
                        ref="inputId">
                    <button class="btn btn-outline-success" @click="getById()">Search</button>
                </form>
            </div>
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
                            <button @click="editCustomer(customer.id)" class="btn btn-primary col-4">Edit</button>
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
            this.$refs.inputId.value = '';
            CustomerDataService.list().then(response => {
                this.customers = response.data;
            });
        },
        editCustomer(id) {
            this.$router.push('/customer/' + id);
        },
        redirectRegister() {
            this.$router.push('/customer/register');
        },
        getById() {
            const id = this.$refs.inputId.value;
            if (id === '') {
                this.getCustomers();
            } else {
                this.customers = this.customers.filter(x => x.id == id);
            }
        },
    },
    mounted() {
        this.getCustomers();
    }
}
</script>

<style scoped>
.list-header {
    margin-top: 2%;
    display: flex;
    justify-content: space-between;
}

#reset-btn {
    margin-right: 2%;
}
</style>