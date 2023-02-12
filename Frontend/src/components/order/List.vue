<template>
    <base-list name="Order" :service="service">
        <template #list-body>
            <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Date</th>
                            <th scope="col">Seller</th>
                            <th scope="col">Client</th>
                            <th scope="col">Total value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in collection" :key="index">
                            <td>{{ item.id }}</td>
                            <td>{{ transformDate(item.date) }}</td>
                            <td>{{ item.sellerId }}</td>
                            <td>{{ item.customerId }}</td>
                            <td>
                                <button @click="editItem(item.id)" class="btn btn-primary col-4">Edit</button>
                                <button @click="askDeleteConfirmation(item)" class="btn btn-danger col-4">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
        </template>
        <button class="btn btn-success" @click="redirectRegister">Register New {{ name }}</button>
    </base-list>
</template>

<script>
import BaseList from '../UI/BaseList.vue';
import OrderDataService from "../../services/OrderDataService";

export default{
    components: {
        BaseList
    },
    data() {
        return {
            service: OrderDataService,
            collection: [],
            deleteIsSelected: false,
            confirmDelete: null,
            itemSelected: null
        }
    },
    methods: {
        getCollection() {
            this.service.list().then(response => {
                this.collection = response.data;
            });
        },
        getById() {
            const id = this.$refs.inputId.value;
            if (id === '') {
                this.getCollection();
            } else {
                this.collection = this.collection.filter(x => x.id == id);
            }
        },
        editItem(id) {
            this.$router.push('/' + this.name + '/' + id);
        },
        redirectRegister() {
            this.$router.push('/' + this.name + '/register');
        },
        askDeleteConfirmation(item) {
            this.deleteIsSelected = true;
            this.itemSelected = item;
        },
        async deleteItem(confirmation) {
            if (confirmation.response) {
                await this.service.delete(this.itemSelected.id);
            }
            this.deleteIsSelected = false;
            this.getCollection();
        },
        transformDate(date) {
            return new Date(date.slice(0,16)).toLocaleDateString()
        }
    },
    mounted() {
        this.getCollection();
    }
}
</script>