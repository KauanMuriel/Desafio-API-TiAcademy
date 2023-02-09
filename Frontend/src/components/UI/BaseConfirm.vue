<template>
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['name', 'objectType'],
    computed: {
        typeContentClass() {
            return {
                'delete-container': this.objectType === 'delete',
                'confirm-container': this.objectType === 'confirm'
            }
        }
    }
}


</script>

<style scoped>
.background {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.26);
    width: 100vw;
    height: 100vh;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
}

#modal {
    width: 30vw;
    height: 40vh;
    border-radius: 12px;
    overflow: hidden;
    background-color: #fff;
}

#header-container {
    width: 100%;
    height: 12%;
}

.delete-container {
    background-color: #dc3545;
}
</style>