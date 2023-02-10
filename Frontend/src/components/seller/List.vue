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
                            <button @click="editSeller(seller.id)" class="btn btn-success col-4">Edit</button>
                            <button @click="confirmAction(seller)" class="btn btn-danger col-4">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </base-list>

    <base-confirm v-if="deleteIsSelected" @confirmation="confirmDelete = response" type="delete">
        <template #default>
            <p>Do you really want to delete {{ sellerSelected.name }}?</p>
            <p><strong>The action cannot be undone.</strong></p>
        </template>
    </base-confirm>

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
            deleteIsSelected: false,
            confirmDelete: null,
            sellerSelected: null
        }
    },
    watch: {
        confirmDelete: function () {
            if (this.confirmDelete === true) {
                this.deleteSeller(this.sellerSelected);
            } else {
                this.deleteIsSelected = false;
                this.confirmDelete = null;
            }

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
        confirmAction(seller) {
            this.sellerSelected = seller;
            this.deleteIsSelected = true;
        },
        async deleteSeller(seller) {
            await SellerDataService.delete(seller.id);
            this.deleteIsSelected = false;
            this.getSellers();
        }
    },
    mounted() {
        this.getSellers();
    }
}
</script>

<style>
button {
    text-align: center;
}
</style>