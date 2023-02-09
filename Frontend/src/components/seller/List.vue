<template>
    <base-list>
        <div class="col-10">
            <h3>Sellers</h3>
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
                    <tr v-for="(seller, index) in sellers" :key="index">
                        <td>{{ seller.id }}</td>
                        <td>{{ seller.name }}</td>
                        <td>{{ seller.login }}</td>
                        <td>
                            <button @click="editSeller(seller.id)" class="btn btn-success col-3">Edit</button>
                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" @click="deleteSeller(seller)" class="btn btn-danger col-3">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </base-list>
    <base-confirm v-show="deleteIsSelected" name="Kauan" objectType="delete"></base-confirm>
</template>

<script>
import SellerDataService from '../../services/SellerDataService'
import BaseConfirm from '../UI/BaseConfirm.vue';
import BaseList from '../UI/BaseList.vue';

export default {
    components: {
        'base-list': BaseList,
        'base-confirm': BaseConfirm
    },
    data() {
        return {
            sellers: [],
            deleteIsSelected: false
        }
    },
    methods: {
        getSellers() {
            SellerDataService.list().then(response => {
                this.sellers = response.data;
            });
        },
        editSeller(id) {
            this.$router.push('/seller/' + id);
        },

        async deleteSeller(seller) {
            this.deleteIsSelected = true;

            if (confirm(`Do you really want to delete ${seller.name}?`)) {
                await SellerDataService.delete(seller.id);
                this.getSellers();
            }
        }
    },
    mounted() {
        this.getSellers();
    }
}
</script>

<style>

</style>