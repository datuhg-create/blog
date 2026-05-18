<template>
  <div class="home">
    <div class="bg-decoration"></div>

    <header class="site-header">
      <h1 class="site-title">📝 我的博客</h1>
      <p class="site-desc">.NET 全栈 · Vue 3 · 日常记录</p>
      <div class="search-box">
        <el-input
          v-model="searchText"
          placeholder="搜索文章..."
          prefix-icon="Search"
          clearable
          @input="handleSearch"
        />
      </div>
    </header>

    <div class="main-layout" v-if="!loading">
      <el-tabs v-model="activeTab" tab-position="left" class="category-tabs" @tab-click="handleTabClick">
        <el-tab-pane label="全部" name="all" />
        <el-tab-pane label="技术教程" name="tech" v-if="categoryCounts.tech" />
        <el-tab-pane label="工具效率" name="tools" v-if="categoryCounts.tools" />
        <el-tab-pane label="AI & Agent" name="ai" v-if="categoryCounts.ai" />
        <el-tab-pane label="生活杂谈" name="life" v-if="categoryCounts.life" />
      </el-tabs>

      <div class="article-list">
        <el-card
          v-for="(a, i) in filteredArticles"
          :key="a.id"
          class="article-card"
          shadow="hover"
          @click="$router.push('/article/' + a.id)"
        >
          <div class="card-body">
            <div class="card-content">
              <div class="card-index">#{{ filteredArticles.length - i }}</div>
              <h2 class="card-title">{{ a.title }}</h2>
              <p class="card-desc">{{ a.desc }}</p>
            </div>
            <div class="card-meta">
              <el-tag size="small" type="info" v-for="t in a.tags" :key="t" style="margin-right:6px">{{ t }}</el-tag>
              <span class="card-date">{{ a.date }}</span>
            </div>
          </div>
        </el-card>
        <el-empty v-if="!filteredArticles.length" description="没有找到相关文章" />
      </div>
    </div>

    <div class="main-layout" v-else>
      <div class="skeleton-tabs">
        <div class="skeleton-tab" v-for="i in 4" :key="i"></div>
      </div>
      <div class="article-list">
        <el-card class="article-card skeleton-card" v-for="i in 3" :key="i">
          <ArticleSkeleton />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ArticleSkeleton from '../components/ArticleSkeleton.vue'

const articles = ref([])
const activeTab = ref('all')
const searchText = ref('')
const loading = ref(true)

const categoryCounts = computed(() => {
  const counts = {}
  articles.value.forEach(a => {
    const cat = a.category || 'tech'
    counts[cat] = (counts[cat] || 0) + 1
  })
  return counts
})

const filteredArticles = computed(() => {
  let list = articles.value

  if (activeTab.value !== 'all') {
    list = list.filter(a => (a.category || 'tech') === activeTab.value)
  }

  if (searchText.value) {
    const kw = searchText.value.toLowerCase()
    list = list.filter(a =>
      a.title.toLowerCase().includes(kw) ||
      a.desc.toLowerCase().includes(kw) ||
      (a.tags || []).some(t => t.toLowerCase().includes(kw))
    )
  }

  return list
})

const handleSearch = () => {}

const handleTabClick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  const resp = await fetch(import.meta.env.BASE_URL + 'articles/index.json')
  if (resp.ok) articles.value = await resp.json()
  loading.value = false
})
</script>

<style scoped>
.home {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 16px;
  position: relative;
  z-index: 1;
}
.site-header {
  text-align: center;
  margin-bottom: 32px;
  padding: 28px 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
.site-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 6px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.site-desc {
  color: #606266;
  font-size: 14px;
  margin-bottom: 16px;
}
.search-box {
  max-width: 400px;
  margin: 0 auto;
}
.search-box :deep(.el-input__wrapper) {
  border-radius: 20px;
}
.main-layout {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}
.category-tabs {
  flex-shrink: 0;
}
.category-tabs :deep(.el-tabs__header) {
  width: 110px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 8px 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
.category-tabs :deep(.el-tabs__item) {
  font-size: 14px;
  height: 40px;
  padding: 0 16px;
}
.category-tabs :deep(.el-tabs__item.is-active) {
  color: #764ba2;
  font-weight: 600;
}
.category-tabs :deep(.el-tabs__active-bar) {
  background: linear-gradient(135deg, #667eea, #764ba2);
}
.skeleton-tabs {
  width: 110px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 12px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.skeleton-tab {
  height: 28px;
  border-radius: 6px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
.article-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
}
.article-card {
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}
.skeleton-card {
  background: rgba(255, 255, 255, 0.9);
}
.article-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.3);
}
.card-body {
  padding: 8px 4px;
}
.card-index {
  font-size: 12px;
  color: #b0b8c8;
  margin-bottom: 4px;
}
.card-title {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1a1a2e;
  transition: color 0.2s;
}
.article-card:hover .card-title {
  color: #667eea;
}
.card-desc {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
  margin-bottom: 12px;
}
.card-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.card-date {
  font-size: 12px;
  color: #a0a8b8;
  margin-left: auto;
}

@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
  }
  .category-tabs :deep(.el-tabs__header) {
    width: 100%;
    display: flex;
  }
  .category-tabs :deep(.el-tabs__nav-wrap) {
    width: 100%;
  }
  .site-header {
    padding: 20px 16px;
  }
  .site-title {
    font-size: 24px;
  }
}
</style>