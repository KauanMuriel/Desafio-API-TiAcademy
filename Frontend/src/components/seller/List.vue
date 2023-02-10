<template>
    <base-list name="Seller" :service="dataService">
    </base-list>
</template>

<script>
import SellerDataService from '../../services/SellerDataService'
import BaseList from '../UI/BaseList.vue';

export default {
    components: {
        'base-list': BaseList,
    },
    data() {
        return {
            dataService: SellerDataService
        }
    }
}
</script>