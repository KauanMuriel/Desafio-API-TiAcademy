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
        }
    ]
});
export default router;