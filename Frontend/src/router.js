import { createWebHistory, createRouter } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            // component: () => import("./components/TheWelcome.vue")
        },
        {
            path: "/seller/list",
            component: () => import("./components/seller/List.vue")
        },
        {
            path: "/seller/register",
            component: () => import("./components/seller/Register.vue")
        },
        {
            path: "/seller/:id",
            component: () => import("./components/seller/Update.vue")
        },
        {
            path: "/customer/list",
            component: () => import("./components/customer/List.vue")
        },
        {
            path: "/customer/register",
            component: () => import("./components/customer/Register.vue")
        },
        {
            path: "/customer/:id",
            component: () => import("./components/customer/Update.vue")
        },
        {
            path: "/order/list",
            component: () => import("./components/order/List.vue")
        },
        {
            path: "/service/list",
            component: () => import("./components/service/List.vue")
        },
        {
            path: "/service/register",
            component: () => import("./components/service/Register.vue")
        },
        {
            path: "/service/:id",
            component: () => import("./components/service/Update.vue")
        }
    ]
});
export default router;