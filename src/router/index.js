import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from "../views/Manage";
import store from "@/store";

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        name: '后台',
        component: Manage,
        meta:{
            requireAuth: true
        },
        children: [
            //主页
            {
                name: '主页',
                path: '/home',
                component: () => import('../views/Home.vue'),
                meta:{
                    requireAuth: true
                },
            },
            //员工信息
            {
                name: '员工信息',
                path: '/user',
                component: () => import('../views/User.vue'),
                meta:{
                    requireAuth: true
                },
            },
            //职位
            {
                name: '职位信息',
                path: '/position',
                component: () => import('../views/Position.vue'),
                meta:{
                    requireAuth: true
                },
            },
            //部门
            {
                name: '部门信息',
                path: '/department',
                component: () => import('../views/Department.vue'),
                meta:{
                    requireAuth: true
                },
            },
            //公告
            {
                name: '公告信息',
                path: '/notice',
                component: () => import('../views/Notice.vue'),
                meta:{
                    requireAuth: true
                },
            },
            //招聘
            {
                name: '管理员信息',
                path: '/admin',
                component: () => import('../views/Admin.vue'),
                meta:{
                    requireAuth: true
                },
            },
        ]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/pshow',
        name: 'Pshow',
        component: () => import('../views/Pshow')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login')
    },
]

const router = new VueRouter({
    mode: '',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    localStorage.setItem("currentPathName", to.name) //设置当前的路由名称,为了在Header组件中去使用
    store.commit("setPath") //触发store的数据更新
    next() //放行
})

//前置
router.beforeEach((to,from,next)=>{
//如果要去My或者index页面
    if(to.meta.requireAuth == true){
        //判断l如果ocalStorage里面是否有Username
        if(localStorage.getItem("user")){
            //有用户信息让它继续走
            next(true);
        }else{
            //否则让它跳转到登录界面，跳转到登录界面时，需要把to.path传入，方便在登录成功时跳转到对应界面上
            next({"path":"/login",query:{"topath":to.path}})
        }
    }else{
        //否则去其他界面时 让它继续走
        next(true);
    }
})
export default router
