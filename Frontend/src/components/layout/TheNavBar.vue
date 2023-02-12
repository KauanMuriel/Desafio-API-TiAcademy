<template>
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark" >
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link active" aria-current="page" href="#">Home</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Sellers
                        </a>
                        <ul class="dropdown-menu">
                            <li><router-link to="/seller/list" class="dropdown-item" href="#">List</router-link></li>
                            <li><router-link to="/seller/register" class="dropdown-item" href="#">Register</router-link></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Customers
                        </a>
                        <ul class="dropdown-menu">
                            <li><router-link to="/customer/list" class="dropdown-item">List</router-link></li>
                            <li><router-link to="/customer/register" class="dropdown-item">Register</router-link></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Orders
                        </a>
                        <ul class="dropdown-menu">
                            <li><router-link to="/order/list" class="dropdown-item">List</router-link></li>
                            <li><a class="dropdown-item" href="#">Register</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Search by customer</a></li>
                            <li><a class="dropdown-item" href="#">Search by seller</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>