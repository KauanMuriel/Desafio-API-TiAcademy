<template class="">

    <div class="col-9 content">
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
                        <button @click="deleteSeller(seller)" class="btn btn-danger col-3">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import SellerDataService from '../../services/SellerDataService'
    export default {
        data() {
            return {
                sellers: []
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
#app {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.content {
    margin-top: 5%;
}
</style>