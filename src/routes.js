
const Login = resolve => require(['./views/Login.vue'],resolve);
const NotFound = resolve => require(['./views/404.vue'],resolve);
const Home = resolve => require(['./views/Home.vue'],resolve);
const Lottery = resolve => require(['./views/lottery/Lottery.vue'],resolve);

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/home',
        component: Home,
        name: 'Home'
    },
    {
        path: '/',
        redirect: { path: '/lottery/6HC/1301' }
    },
    {
        path: '/404',
        component: NotFound,
    },
    {
        path: '*',
        component: NotFound,
    },
    {
        path: "/lottery/:type/:code",
        name: "彩种",
        meta: {
            title: "彩种",
            user: !0
        },
        component: Lottery
    },
];

export default routes;