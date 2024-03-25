/**
 * 静态路由
 */
export const routes = [
    {
        path: "/",
        component: () => import("@/views/login/index.vue"),
        meta: { title: "登录" }
    },
    {
        path: "/login",
        component: () => import("@/views/login/index.vue"),
        meta: { title: "登录" }
    },
    // 404
    {
        path: "/:path(.*)*",
        component: () => import("@/views/exception/404/index.vue")
    }
]  