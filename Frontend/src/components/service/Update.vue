<template>
    <base-card>
        <h3>Update Service</h3>
        <hr />
        <div class="form col-8">
            <div class="form-inputs">
                <div>
                    <label class="form-label">Id</label>
                    <input type="text" disabled v-model="service.id" class="form-control" placeholder="">
                </div>
                <div>
                    <label class="form-label" for="input-name">Name</label>
                    <input type="text" required v-model="service.name" id="input-name" class="form-control"
                        placeholder="">
                </div>
                <div>
                    <label class="form-label">Description</label>
                    <input type="text" disabled v-model="service.description" class="form-control" placeholder="">
                </div>
                <button @click="updateService" class="btn btn-success col-3">Update</button>
            </div>
        </div>
    </base-card>
</template>

<script>
import BaseCard from '../UI/BaseCard.vue'
import ServiceDataService from '../../services/ServiceDataService';

export default {
    components: {
        BaseCard
    },
    data() {
        return {
            service: {}
        }
    },
    methods: {
        getSeller(id) {
            ServiceDataService.getById(id)
                .then((response) => {
                    this.service = response.data;
                });
        },
        updateService() {
            ServiceDataService.update(this.service.id, this.service)
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