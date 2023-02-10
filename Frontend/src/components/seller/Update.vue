<template>
    <base-card>
        <h3>Update Seller</h3>
        <hr />
        <div class="form col-8">
            <div class="form-inputs">
                <div>
                    <label class="form-label">Id</label>
                    <input type="text" disabled v-model="seller.id" class="form-control" placeholder="">
                </div>
                <div>
                    <label class="form-label" for="input-name">Name</label>
                    <input type="text" required v-model="seller.name" id="input-name" class="form-control"
                        placeholder="">
                </div>
                <div>
                    <label class="form-label">Login</label>
                    <input type="text" disabled v-model="seller.login" class="form-control" placeholder="">
                </div>
                <div>
                    <label class="form-label">Password</label>
                    <input type="password" required v-model="seller.password" class="form-control">
                </div>
                <button @click="updateSeller" class="btn btn-success col-3">Update</button>
            </div>
        </div>
    </base-card>
</template>

<script>
import SellerDataService from '../../services/SellerDataService';
import BaseCard from '../UI/BaseCard.vue';

export default {
    components: {
        'base-card': BaseCard
    },
    data() {
        return {
            seller: {}
        };
    },
    methods: {
        getSeller(id) {
            SellerDataService.getById(id)
                .then((response) => {
                    this.seller = response.data;
                });
        },
        updateSeller() {
            SellerDataService.update(this.seller.id, this.seller)
                .then(() => {
                    this.$router.push('list');
                });
        }
    },
    mounted() {
        this.getSeller(this.$route.params.id);
    }
}
</script>

<style>
label {
    font-weight: bold;
}

.form-inputs {
    display: flex;
    flex-direction: column;
    gap: 2vh;
}
</style>