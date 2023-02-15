<template>
    <base-list name="Order" :service="service" @search="filterOrders" @reset-search="getCollection(); resetFilter()">
        <template #search-btn>
            <div class="dropdown" id="search-by">
                <button class="btn btn-secondary dropdown-toggle col-12" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ filterMessage }}
                </button>
                <ul class="dropdown-menu">
                    <li class="dropdown-item" @click="setFilter('Order')">Order</li>
                    <li class="dropdown-item" @click="setFilter('Customer')">Customer</li>
                    <li class="dropdown-item" @click="setFilter('Seller')">Seller</li>
                </ul>
            </div>
        </template>
        <template #list-body>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Date</th>
                        <th scope="col">Seller</th>
                        <th scope="col">Client</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in collection" :key="index" class="table-row"
                        @click="openDetails(item.id)">
                        <td>{{ item.id }}</td>
                        <td>{{ transformDate(item.date) }}</td>
                        <td>{{ item.sellerId }}</td>
                        <td>{{ item.customerId }}</td>
                        <td>
                            <button @click.stop="askDeleteConfirmation(item)" class="btn btn-danger col-4 action-btn"
                                id="delete-btn"></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
        <button class="btn btn-success" @click="redirectRegister">Register New {{ name }}</button>
    </base-list>
    <base-confirm v-if="deleteIsSelected" type="delete" @confirmation="deleteItem">
        <template #default>
            <p>Do you really want to delete?</p>
            <p><strong>The action cannot be undone.</strong></p>
        </template>
    </base-confirm>
    <order-details v-if="detailsIsActive" :order="order" @closeDetails="closeDetails"></order-details>
</template>

<script>
import BaseList from '../UI/BaseList.vue';
import OrderDetails from './OrderDetails.vue';
import OrderDataService from "../../services/OrderDataService";
import BaseConfirm from '../UI/BaseConfirm.vue';

export default {
    components: {
        BaseList,
        BaseConfirm,
        OrderDetails
    },
    data() {
        return {
            service: OrderDataService,
            collection: [],
            deleteIsSelected: false,
            confirmDelete: null,
            itemSelected: null,
            order: null,
            detailsIsActive: false,
            filter: null,
            filterMessage: 'Search by'
        }
    },
    methods: {
        getCollection() {
            this.service.list().then(response => {
                this.collection = response.data;
            });
        },
        getById(id) {
            if (id === '') {
                this.getCollection();
            } else {
                this.collection = this.collection.filter(x => x.id == id);
            }
        },
        getBySeller(id) {
            this.service.getBySeller(id).then(response => {
                this.collection = response.data;
            });
        },
        getByCustomer(id) {
            this.service.getByCustomer(id).then(response => {
                this.collection = response.data;
            })
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
            return new Date(date.slice(0, 16)).toLocaleDateString()
        },
        async openDetails(itemId) {
            await this.service.getById(itemId).then(response => {
                this.order = response.data;
            });
            this.detailsIsActive = true;
        },
        closeDetails() {
            this.order = null;
            this.detailsIsActive = false;
        },
        setFilter(value) {
            this.filterMessage = value;
            this.filter = value;
        },
        resetFilter() {
            this.filterMessage = 'Order by';
            this.filter = null;
        },
        filterOrders(id) {
            switch (this.filter) {
                case 'Seller':
                    this.getBySeller(id);
                    break;
                case 'Customer':
                    this.getByCustomer(id);
                    break;
                case 'Order':
                    this.getById(id);
                    break;
            }

        }
    },
    mounted() {
        this.getCollection();
    }
}
</script>

<style>
.table-row {
    cursor: pointer;
}

.action-btn {
    height: 4vh;
    width: 4vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-left: 3%;
}

#delete-btn {
    background-image: url("../../assets/icons/delete_FILL0_wght400_GRAD0_opsz48.svg");
}

#edit-btn {
    background-image: url("../../assets/icons/edit_FILL0_wght400_GRAD0_opsz48.svg");
}

#search-by {
    margin-right: 2%;
    min-width: 8vw;
}

.dropdown-item {
    cursor: pointer;
}
</style>