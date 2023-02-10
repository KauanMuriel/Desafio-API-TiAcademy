<template>
    <base-list>
        <div class="col-10">
            <div class="list-header">
                <h3>Sellers</h3>
                <form class="d-flex" role="search" @submit.prevent>
                    <button @click="getSellers" class="col-2 btn btn-secondary" id="reset-btn">X</button>
                    <input class="form-control me-2" type="search" placeholder="Seller id" aria-label="Search" ref="inputId">
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
                    <tr v-for="(seller, index) in sellers" :key="index">
                        <td>{{ seller.id }}</td>
                        <td>{{ seller.name }}</td>
                        <td>{{ seller.login }}</td>
                        <td>
                            <button @click="editSeller(seller.id)" class="btn btn-primary col-4">Edit</button>
                            <button @click="confirmAction(seller)" class="btn btn-danger col-4">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-success" @click="redirectRegister">Register New Seller</button>
        </div>
    </base-list>

    <base-confirm v-if="deleteIsSelected" @confirmation="deleteSeller" type="delete">
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
            console.log("parou aqui");
            if (this.confirmDelete === true) {
                console.log(this.sellerSelected);
                this.deleteSeller(this.sellerSelected);
            } else {
                this.deleteIsSelected = false;
                this.confirmDelete = null;
            }

        }
    },
    methods: {
        getSellers() {
            this.$refs.inputId.value = '';
            SellerDataService.list().then(response => {
                this.sellers = response.data;
            });
        },
        getById() {
            const id = this.$refs.inputId.value;
            if(id === '') {
                this.getSellers();
            } else {
                this.sellers = this.sellers.filter(x => x.id == id);
            }
        },
        editSeller(id) {
            this.$router.push('/seller/' + id);
        },
        confirmAction(seller) {
            this.sellerSelected = seller;
            this.deleteIsSelected = true;
        },
        async deleteSeller(confirmation) {
            if (confirmation.response === true) {
                await SellerDataService.delete(this.sellerSelected.id);
            }
            this.deleteIsSelected = false;
            this.getSellers();
        },
        redirectRegister() {
            this.$router.push('/seller/register');
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

.list-header {
    margin-top: 2%;
    display: flex;
    justify-content: space-between;
}

table {
    margin-top: 3%;
}

#reset-btn {
    margin-right: 2%;
}
</style>