<template>
    <thead>
        <tr>
            <th v-for="name in colNames" scope="col">{{ name }}</th>
            <th>Actions</th>
        </tr>
    </thead>

</template>

<script>
export default {
    props: ['collection'],
    data() {
        return {

        }
    },
    computed: {
        colNames() {
            const item = this.collection[0];
            let names = [];
            for (let key in item) {
                if (key !== 'password') {
                    key = key[0].toUpperCase() + key.slice(1, 50);
                    names.push(key);
                }
            }
            return names;
        }
    }
}
</script>