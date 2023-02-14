<template>
        <tr>
            <slot name="tr-cols">
                <td v-for="value in valuesTd">{{ value }}</td>
            </slot>
            <td>
                <button class="btn btn-primary col-4 action-btn" id="edit-btn" @click="this.$emit('edit-pressed')"></button>
                <button class="btn btn-danger col-4 action-btn" id="delete-btn" @click="this.$emit('deletePressed', item)"></button>
            </td>
        </tr>
</template>

<script>
export default {
    props: ['item'],
    computed: {
        valuesTd() {
            let values = [];
            for (const key in this.item) {
                if (key !== 'password') {
                    values.push(this.item[key]);
                }
            }
            return values;
        }
    }
}
</script>

<style>
.action-btn {
    height: 4vh;
    width: 4vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-left: 3%;
}

#delete-btn {
    background-image: url("../../assets/icons/delete_FILL0_wght400_GRAD0_opsz48.svg");
}

#edit-btn {
    background-image: url("../../assets/icons/edit_FILL0_wght400_GRAD0_opsz48.svg");
}
</style>