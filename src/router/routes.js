const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", redirect: "/home" },
      {
        path: "/home",
        component: () => import("pages/MyApp.vue"),
        name: "Home",
        default: true,
      },
      {
        path: "/mapview",
        component: () => import("pages/MapView.vue"),
        name: "MapView",
        beforeEnter: (to, from) => {
          return from.path === "/home" ? true : { name: "Home" };
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
