<template>
    <base-list name="Service" :service="service">
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
            service: ServiceDataService
        }
    }
}
</script>