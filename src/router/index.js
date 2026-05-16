import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { title: '首页 - 我的博客' } },
  { path: '/article/:id', name: 'Article', component: Article, meta: { title: '文章 - 我的博客' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = to.meta.title || '我的博客'
})

export default router
