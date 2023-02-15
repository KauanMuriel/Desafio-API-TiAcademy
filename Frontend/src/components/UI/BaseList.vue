<template>
    <div class="content-container">
        <div class="col-10">
            <div class="list-header">
                <slot name="title">
                    <h3>{{ name }}</h3>
                </slot>
                    <form class="d-flex" role="search" @submit.prevent>
                        <button @click="getCollection(); this.$emit('reset-search')" class="col-2 btn btn-secondary" id="reset-btn">X</button>
                        <slot name="search-btn"></slot>
                        <input class="form-control me-2" type="search" placeholder="Enter the Id" aria-label="Search"
                            ref="inputId">
                        <button class="btn btn-outline-success" @click="getById(); this.$emit('search', this.$refs.inputId.value)">Search</button>
                    </form>
            </div>
            <slot name="list-body">
                <table class="table table-hover">
                    <table-head :collection="collection"></table-head>
                    <tbody>
                        <slot name="table-row">
                            <table-row v-for="item in collection" :item="item"
                                @delete-pressed="askDeleteConfirmation(item)"
                                @edit-pressed="editItem(item.id)"></table-row>
                        </slot>
                    </tbody>
                </table>
            </slot>
            <button class="btn btn-success" @click="redirectRegister">Register New {{ name }}</button>
        </div>
    </div>

    <base-confirm v-if="deleteIsSelected" type="delete" @confirmation="deleteItem">
        <template #default>
            <p>Do you really want to delete {{ itemSelected.name }}?</p>
            <p><strong>The action cannot be undone.</strong></p>
        </template>
    </base-confirm>
</template>

<script>
import BaseConfirm from './BaseConfirm.vue';
import TableRow from '../utilities/TableRow.vue';
import TableHead from '../utilities/TableHead.vue';

export default {
    components: {
        BaseConfirm,
        TableRow,
        TableHead
    },
    props: ['name', 'service'],
    data() {
        return {
            collection: [],
            deleteIsSelected: false,
            confirmDelete: null,
            itemSelected: null
        }
    },
    computed: {
        tableData() {

        }
    },
    methods: {
        getCollection() {
            this.$refs.inputId.value = '';
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
    },
    mounted() {
        this.getCollection();
    },
    emits: ['search', 'reset-search']
}
</script>

<style scoped>
.content-container {
    width: 70%;
    height: 80%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background-color: rgb(243, 243, 243);
    border-radius: 12px;
    padding-top: 10px;
}

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