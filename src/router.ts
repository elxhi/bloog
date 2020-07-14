import { RouteRecordRaw, NavigationGuard, PostNavigationGuard, RouterHistory, createRouter } from 'vue-router'
import ErrorPage from './pages/error.vue'

export enum RouteName {
  Home = 'home',
  Article = 'article-detail',
  TagArchive = 'tag-archive',
  CategoryArchive = 'category-archive',
  DateArchive = 'date-archive',
  SearchArchive = 'search-archive',
  Guestbook = 'guestbook',
  Service = 'service',
  App = 'app',
  Music = 'music',
  Job = 'job',
  About = 'about',
  Lens = 'lens',
  Sitemap = 'sitemap',
  Error = 'error'
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.Home,
    component: () => import('./pages/home.vue')
  },
  {
    path: '/sitemap',
    name: RouteName.Sitemap,
    component: () => import('./pages/sitemap.vue')
  },
  {
    path: '/article/:article_id',
    name: RouteName.Article,
    component: () => import('./pages/article/main.vue')
  },
  {
    path: '/category/:category_slug',
    name: RouteName.CategoryArchive,
    component: () => import('./pages/category.vue')
  },
  {
    path: '/tag/:tag_slug',
    name: RouteName.TagArchive,
    component: () => import('./pages/tag.vue')
  },
  {
    path: '/date/:date',
    name: RouteName.DateArchive,
    component: () => import('./pages/date.vue')
  },
  {
    path: '/search/:keyword',
    name: RouteName.SearchArchive,
    component: () => import('./pages/search.vue')
  },
  {
    path: '/music',
    name: RouteName.Music,
    component: () => import('./pages/music.vue')
  },
  {
    path: '/lens',
    name: RouteName.Lens,
    component: () => import('./pages/lens.vue')
  },
  {
    path: '/job',
    name: RouteName.Job,
    component: () => import('./pages/job.vue')
  },
  {
    path: '/about',
    name: RouteName.About,
    component: () => import('./pages/about.vue')
  },
  {
    path: '/service',
    name: RouteName.Service,
    component: () => import('./pages/service.vue')
  },
  {
    path: '/guestbook',
    name: RouteName.Guestbook,
    component: () => import('./pages/guestbook.vue')
  },
  {
    path: '/app',
    name: RouteName.App,
    component: () => import('./pages/app.vue')
  },
  {
    name: 'error',
    path: '/:data(.*)',
    component: ErrorPage
  }
]

export interface RouterCreateConfig {
  history: RouterHistory
  beforeMiddleware?: NavigationGuard
  afterMiddleware?: PostNavigationGuard
}
export const createUniversalRouter = (config: RouterCreateConfig) => {
  const router = createRouter({
    routes,
    strict: true,
    history: config.history,
    linkActiveClass: 'link-active',
    scrollBehavior(to, from, savedPosition) {
      return savedPosition || {
        top: 0,
        left: 0,
        behavior: 'smooth'
      }
    }
  })

  if (config.beforeMiddleware) {
    router.beforeEach(config.beforeMiddleware)
  }
  if (config.afterMiddleware) {
    router.afterEach(config.afterMiddleware)
  }

  return router
}