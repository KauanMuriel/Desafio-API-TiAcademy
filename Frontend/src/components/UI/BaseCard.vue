<template>
    <div class="card">
        <button class="btn btn-primary btn-back" @click="$router.back()">Back</button>
        <slot></slot>
    </div>
</template>

<script>
</script>

<style>
.card {
    width: 50%;
    height: 80%;
    background-color: #f3f3f3;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.btn-back {
    position: absolute;
    left: 5%;
    top: 5%;
}
</style>
