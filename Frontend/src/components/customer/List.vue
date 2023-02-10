<template>
    <base-list name="Customer" :service="dataService">
    </base-list>
</template>

<script>
import BaseList from '../UI/BaseList.vue';
import CustomerDataService from '../../services/CustomerDataService';

export default {
    components: {
        'base-list': BaseList
    },
    data() {
        return {
            dataService: CustomerDataService
        }
    }
}
</script>