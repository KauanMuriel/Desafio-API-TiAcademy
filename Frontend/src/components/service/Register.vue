<template>
    <base-card>
    <div class="col-8">
            <h3>New Service</h3>
            <hr />
            <div class="form" style="padding: 1%">
                <div class="">
                    <div>
                        <label class="form-label">Name</label>
                        <input type="text" required v-model="service.name" class="form-control" placeholder="">
                    </div>
                    <div>
                        <label class="form-label">Description</label>
                        <input type="text" required v-model="service.description" class="form-control" placeholder="">
                    </div>
                    <button @click="registerService" class="btn btn-success" style="margin-top: 3%">Register</button>
                </div>
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
            service: {
                name: '',
                description: ''
            }
        }
    },
    methods: {
        registerService() {
            const data = {
                name: this.service.name,
                description: this.service.description
            }

            ServiceDataService.register(data)
                .then(() => {
                    this.$router.push('list');
                });
        }
    }
}
</script>