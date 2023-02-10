<template>
    <div class="background">
        <div class="modal-container">
            <div :class="(typeContainerClass)" class="modal-header"></div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-actions">
                <button class="btn btn-secondary col-2" @click="result(false)">Cancel</button>
                <button :class="(typeButtonClass)" class="btn col-2" @click="result(true)">Confirm</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['type'],
    emits: ['confirmation'],
    computed: {
        typeContainerClass() {
            return {
                'red': this.type === 'delete',
                'green': this.type === 'confirm'
            }
        },
        typeButtonClass() {
            return {
                'btn-danger': this.type === 'delete',
                'btn-success': this.type === 'confirm'
            }
        }
    },
    methods: {
        result(response) {
            this.$emit('confirmation', {
                response: response
            });
        }
    }
}


</script>

<style scoped>
.background {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.342);
    width: 100vw;
    height: 100vh;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-container {
    position: fixed;
    z-index: 3;
    top: 10%;
    width: 30vw;
    height: 40vh;
    border-radius: 12px;
    overflow: hidden;
    background-color: #fff;
}

.modal-header {
    width: 100%;
    height: 12%;
}

.modal-body {
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.modal-actions {
    width: 100%;
    height: 18%;
    display: flex;
    justify-content: flex-end;
}

.modal-actions .btn {
    margin: 1% 1% 1% 0;
}

#header-container {
    width: 100%;
    height: 12%;
}

.red {
    background-color: #dc3545;
    color: #fff;
}

.green {
    background-color: #198754;
}
</style>