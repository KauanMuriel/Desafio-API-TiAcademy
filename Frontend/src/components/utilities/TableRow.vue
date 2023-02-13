<template>
    <tr>
        <td v-for="value in item">{{ value }}</td>
        <td>
            <button  class="btn btn-primary col-4 action-btn" id="edit-btn"></button>
            <button  class="btn btn-danger col-4 action-btn" id="delete-btn"></button>
        </td>
    </tr>

</template>

<script>
export default {
    props: ['item']
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