<template>
    <section id="main-container">
        <h3>New Order</h3>
        <form @submit.prevent>
            <div class="row" id="row-order">
                <div id="date-order-div">
                    <label for="date">Date</label>
                    <input type="text" id="date" :value="date">
                </div>
                <div id="hour-order-div">
                    <label for="hour">Hour</label>
                    <input type="text" id="hour" :value="hour">
                </div>
            </div>
            <div class="row">
                <div id="id-customer-div">
                    <label for="customerId">Id customer</label>
                    <input type="text" id="customerId" ref="idCustomer" v-model="customer.id"
                        @focusout="getCustomerName">
                </div>
                <div class="name-div">
                    <label for="customerName">Customer</label>
                    <input type="text" disabled id="customerName" :value="customer.name">
                </div>
            </div>
            <div class="row">
                <div>
                    <label for="sellerId">Seller Id</label>
                    <input type="text" id="sellerId" ref="idSeller" v-model="seller.id" @focusout="getSellerName">
                </div>
                <div class="name-div">
                    <label for="sellerName">Seller</label>
                    <input type="text" disabled id="sellerName" :value="seller.name">
                </div>
            </div>
            <hr>
            <table class="table table-hover">
                <table-head :collection="collection">
                    <template #th-cols>
                        <th>Service</th>
                        <th>Quantity</th>
                        <th>Value</th>
                        <th>Subtotal</th>
                        <th>Actions</th>
                    </template>
                </table-head>
                <tbody>
                    <slot name="table-row">
                        <tr>
                            <td><input type="text" v-model="orderItem.serviceId"></td>
                            <td><input type="text" v-model="orderItem.quantity"></td>
                            <td><input type="text" v-model="orderItem.value"></td>
                            <td><input type="text" v-model="subtotalItem" disabled></td>
                            <td><button class="btn btn-success add-btn" @click="addItem"></button></td>
                        </tr>
                        <table-row v-for="item in collection" :item="item" @delete-pressed="askDeleteConfirmation(item)"
                            @edit-pressed="editItem(item.id)">
                            <template #tr-cols>
                                <td class="dt-item">{{ item.serviceId }}</td>
                                <td class="dt-item">{{ item.quantity }}</td>
                                <td class="dt-item">{{ transformCurrency(item.value) }}</td>
                                <td class="dt-item">{{ transformCurrency(item.value * item.quantity) }}</td>
                            </template>
                            <template #action-btns>
                                <button class="btn btn-danger col-4 action-btn" id="delete-btn"></button>

                            </template>
                        </table-row>
                    </slot>
                </tbody>
            </table>

            <div class="form-footer">
                <div id="value-order">
                    <label for="value">Total Value</label>
                    <input disabled type="text" id="value" :value="totalValue">
                </div>
                <button class="btn btn-success save-order" @click="submitData">Save</button>
            </div>
        </form>
    </section>

</template>

<script>
import CustomerDataService from '../../services/CustomerDataService';
import OrderDataService from '../../services/OrderDataService';
import SellerDataService from '../../services/SellerDataService';
import ItemDataService from '../../services/ItemDataService';
import TableHead from '../utilities/TableHead.vue';
import TableRow from '../utilities/TableRow.vue';

export default {
    components: {
        TableHead,
        TableRow
    },
    data() {
        return {
            dateTime: new Date(),
            orderId: null,
            customer: {
                id: null,
                name: '',
            },
            seller: {
                id: null,
                name: '',
            },
            order: {
                date: null,
                sellerId: null,
                customerId: null
            },
            orderItem: {
                serviceId: null,
                quantity: null,
                value: null
            },
            collection: []
        }
    },
    computed: {
        date() {
            return this.dateTime.toLocaleDateString();
        },
        hour() {
            return this.dateTime.toLocaleTimeString();
        },
        subtotalItem() {
            return this.transformCurrency(this.orderItem.quantity * this.orderItem.value);
        },
        totalValue() {
            let value = 0;
            this.collection.forEach(item => {
                value += (item.value * item.quantity);
            });
            return this.transformCurrency(value);
        }
    },
    methods: {
        getCustomerName() {
            CustomerDataService.getById(this.$refs.idCustomer.value)
                .then((response) => {
                    this.customer.name = response.data.name;
                })
        },
        getSellerName() {
            SellerDataService.getById(this.$refs.idSeller.value)
                .then((response) => {
                    this.seller.name = response.data.name;
                });
        },
        transformCurrency(value) {
            const currency = Number(value).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });

            return currency;
        },
        addItem() {
            const data = {
                serviceId: this.orderItem.serviceId,
                quantity: this.orderItem.quantity,
                value: this.orderItem.value
            }
            this.collection.push(data);
            this.resetItemFields();
        },
        async submitData() {
            await this.saveOrder();
            await this.saveOrderItem();
            this.$router.push('list');
        },
        async saveOrder() {
            this.order.date = this.dateTime;
            this.order.customerId = this.customer.id;
            this.order.sellerId = this.seller.id;

            await OrderDataService.register(this.order)
                .then((response) => {
                    this.orderId = response.data.id;
                });
        },
        async saveOrderItem() {
            for (const item of this.collection) {
                const data = {
                    orderId: this.orderId,
                    serviceId: Number(item.serviceId),
                    quantity: Number(item.quantity),
                    value: Number(item.value)
                };

                console.log(data);
                await ItemDataService.register(data);
            }
        },
        resetItemFields() {
            this.orderItem.serviceId = null;
            this.orderItem.quantity = null;
            this.orderItem.value = null;
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#background-modal {
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.548);
    display: flex;
    justify-content: center;
    align-items: center;
}

#main-container {
    padding: 2%;
    border-radius: 12px;
    height: auto;
    width: 50vw;
    background-color: #f3f3f3;
    z-index: 10;
}

header {
    position: relative;
}

form {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 3%;
}

.row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-bottom: 3%;
}

form div {
    display: flex;
    flex-direction: column;
}

div input {
    width: 100%;
}

#new-item-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}

#date-order-div {
    grid-column-start: 1;
}

#hour-order-div {
    grid-column-start: 2;
}

#value-order {
    width: 20%;
}

.name-div {
    grid-column-start: 2;
    grid-column-end: 5;
}

label {
    font-weight: bold;
}

#quit-button {
    background-color: #dc3545;
    border: none;
    color: white;
    position: absolute;
    top: 5%;
    right: 2%;
    width: 2vw;
    height: 4vh;
}

.add-btn {
    background-image: url('../../assets/icons/add_shopping_cart_FILL0_wght400_GRAD0_opsz48.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 4vh;
    width: 4vh;
}

.form-footer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.save-order {
    width: 10%;
    height: 5vh;
}

.dt-item {
    text-align: left;
}
</style>