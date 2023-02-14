<template>
    <div id="background-modal">
        <div id="main-container">
            <header>
                <h3>Order Details</h3>
                <button id="quit-button" @click="this.$emit('closeDetails')">X</button>
            </header>
            <form>
                <div class="row" id="row-order">
                    <div id="id-order-div">
                        <label for="inputId">Id</label>
                        <input type="text" disabled id="inputId" :value="order.id">
                    </div>
                    <div id="date-order-div">
                        <label for="date">Date</label>
                        <input disabled type="text" id="date" :value="dateTransformed">
                    </div>
                    <div id="hour-order-div">
                        <label for="hour">Hour</label>
                        <input disabled type="text" id="hour" :value="hourTransformed">
                    </div>
                    <div id="value-order-div">
                        <label for="value">Total Value</label>
                        <input disabled type="text" id="value">
                    </div>
                </div>
                <div class="row">
                    <div id="id-customer-div">
                        <label for="customerId">Id customer</label>
                        <input type="text" disabled id="customerId" :value="order.customerId">
                    </div>
                    <div class="name-div">
                        <label for="customerName">Customer</label>
                        <input type="text" disabled id="customerName">
                    </div>
                </div>
                <div class="row">
                    <div>
                        <label for="sellerId">Seller Id</label>
                        <input type="text" disabled id="sellerId" :value="order.sellerId">
                    </div>
                    <div class="name-div">
                        <label for="sellerName">Seller</label>
                        <input type="text" disabled id="sellerName">
                    </div>
                </div>
            </form>
            <hr>
            <table class="table table-hover">
                <table-head :collection="collection"></table-head>
                <tbody>
                    <slot name="table-row">
                        <table-row v-for="item in collection" :item="item" @delete-pressed="askDeleteConfirmation(item)"
                            @edit-pressed="editItem(item.id)"></table-row>
                    </slot>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import TableHead from '../utilities/TableHead.vue';
import TableRow from '../utilities/TableRow.vue';
import ItemDataService from '../../services/ItemDataService';

export default {
    props: ['order'],
    components: {
        TableHead,
        TableRow
    },
    data() {
        return {
            collection: []
        }
    },
    computed: {
        dateTransformed() {
            return new Date(this.order.date.slice(0, 16)).toLocaleDateString();
        },
        hourTransformed() {
            return new Date(this.order.date.slice(0, 24)).toLocaleTimeString();
        }
    },
    methods: {
        getOrderItems() { 
            ItemDataService.list(this.order.id)
                .then(response => {
                    this.collection = response.data
                });
        }
    },
    mounted() {
        this.getOrderItems();
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

#date-order-div {
    grid-column-start: 2;
}

#hour-order-div {
    grid-column-start: 3;
}

#value-order-div {
    grid-column-start: 5;
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
</style>