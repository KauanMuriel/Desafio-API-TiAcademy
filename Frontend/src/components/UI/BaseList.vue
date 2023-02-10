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
    align-items: flex-start;
    justify-content: center;
    background-color: rgb(243, 243, 243);
    border-radius: 12px;
    padding-top: 10px;
}
</style>