<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

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
</style>
