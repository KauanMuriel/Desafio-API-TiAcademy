<template>
    <base-list name="Service" :service="service">
        <template #list-body>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <table-row v-for="item in collection" :item="item"></table-row>
                </tbody>
            </table>

        </template>
    </base-list>
</template>

<script>
import BaseList from '../UI/BaseList.vue';
import TableRow from '../utilities/TableRow.vue';
import ServiceDataService from '../../services/ServiceDataService';

export default {
    components: {
        BaseList,
        TableRow
    },
    data() {
        return {
            collection: [],
            deleteIsSelected: false,
            confirmDelete: null,
            itemSelected: null,
            service: ServiceDataService
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
        }
    },
    mounted() {
        this.getCollection();
    }
}
</script>