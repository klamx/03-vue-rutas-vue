import { normalizeStyle } from '@vue/shared';
import { createRouter, createWebHashHistory } from 'vue-router';
import isAuthenticatedGuard from './auth-guard';

const routes = [
  {
    path: '/',
    redirect: '/pokemon',
  },
  {
    path: '/pokemon',
    name: 'pokemon',
    component: () =>
      import(
        /** webpackChunkName: "PokemonLayout" */ '@/modules/pokemon/layout/PokemonLayout.vue'
      ),
    children: [
      {
        path: 'home',
        name: 'pokemon-home',
        component: () =>
          import(
            /* webpackChunkName: "ListPage" */ '../modules/pokemon/pages/ListPage.vue'
          ),
      },
      {
        path: 'about',
        name: 'pokemon-about',
        component: () =>
          import(
            /* webpackChunkName: "AboutPage" */ '../modules/pokemon/pages/AboutPage'
          ),
      },
      {
        path: '/pokemonid/:id',
        name: 'pokemon-id',
        component: () =>
          import(
            /* webpackChunkName: "PokemonPage" */ '../modules/pokemon/pages/PokemonPage'
          ),
        props: (route) => {
          const id = Number(route.params.id);
          return isNaN(id) ? { id: 1 } : { id };
        },
      },
      {
        path: '',
        redirect: { name: 'pokemon-about' },
      },
    ],
  },
  {
    path: '/dbz',
    name: 'dbz',
    // guard especifico
    beforeEnter: [isAuthenticatedGuard],
    component: () =>
      import(
        /* webpackChunkName: "DbzLayout" */ '@/modules/dbz/layout/DrangonBallLayout.vue'
      ),
    children: [
      {
        path: 'characters',
        name: 'dbz-characters',
        component: () =>
          import(
            /* webpackChunkName: "DbzCharacters" */ '@/modules/dbz/pages/Characters.vue'
          ),
      },
      {
        path: 'about',
        name: 'dbz-about',
        component: () =>
          import(
            /* webpackChunkName: "DbzAbout" */ '@/modules/dbz/pages/About.vue'
          ),
      },
      {
        path: '',
        redirect: { name: 'dbz-characters' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () =>
      import(
        /* webpackChunkName: "PageNotFound" */ '../modules/shared/pages/NoPageFound.vue'
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router global sincrono
// router.beforeEach((to, from, next) => {
//   console.log({ to, from, next });

//   const random = Math.random() * 100;
//   if (random > 50) {
//     console.log('autenticado');
//     next();
//   } else {
//     console.log(random, 'bloqueado por el before each Guard');
//     next({ name: 'pokemon-home' });
//   }

//   // next();
// });

// router global asincrono
// const canAcces = () => {
//   return new Promise((resolve) => {
//     const random = Math.random() * 100;
//     if (random > 50) {
//       console.log('autenticado - canAccess');
//       resolve(true);
//     } else {
//       console.log(random, 'bloqueado por el beforeEach Guard - canAccess');
//       resolve(false);
//     }
//   });
// };

// router.beforeEach(async (to, from, next) => {
//   const authorized = await canAcces();
//   authorized ? next() : next({ name: 'pokemon-home' });
// });

export default router;
