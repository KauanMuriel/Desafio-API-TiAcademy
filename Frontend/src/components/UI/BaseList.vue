<template>
    <div class="content-container">
        <slot></slot>
    </div>
</template>

<style scoped>
.content-container {
    width: 70%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(243, 243, 243);
    border-radius: 12px;
}
</style>