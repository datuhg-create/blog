<template>
  <div class="article-page">
    <div class="bg-decoration"></div>

    <BackToTop />

    <div class="article-nav">
      <el-button text @click="$router.push('/')">← 返回首页</el-button>
    </div>

    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="skeleton-wrap">
          <el-skeleton :rows="8" animated />
        </div>
      </template>

      <el-card class="article-container" v-if="article">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <span>{{ article.date }}</span>
          <el-tag size="small" type="info" v-for="t in article.tags" :key="t" style="margin-left:8px">{{ t }}</el-tag>
          <span class="views" v-if="article.views"> · {{ article.views }} 次阅读</span>
        </div>
        <el-divider />
        <div class="article-content" v-html="rendered"></div>
      </el-card>
    </el-skeleton>

    <el-card class="related-section" v-if="relatedArticles.length && !loading">
      <div class="related-title">📎 相关文章</div>
      <div class="related-list">
        <div
          class="related-item"
          v-for="a in relatedArticles"
          :key="a.id"
          @click="$router.push('/article/' + a.id)"
        >
          <span class="related-item-title">{{ a.title }}</span>
          <span class="related-item-date">{{ a.date }}</span>
        </div>
      </div>
    </el-card>

    <el-empty v-if="!article && !loading" description="文章不存在" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import BackToTop from '../components/BackToTop.vue'

const route = useRoute()
const article = ref(null)
const raw = ref('')
const allArticles = ref([])
const loading = ref(true)

onMounted(async () => {
  const listResp = await fetch(import.meta.env.BASE_URL + 'articles/index.json')
  if (listResp.ok) {
    allArticles.value = await listResp.json()
    article.value = allArticles.value.find(a => a.id === route.params.id)
  }
  if (!article.value) {
    loading.value = false
    return
  }

  const mdResp = await fetch(import.meta.env.BASE_URL + `articles/${article.value.id}.md`)
  if (mdResp.ok) raw.value = await mdResp.text()
  loading.value = false
})

marked.setOptions({
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  }
})

const rendered = computed(() => marked(raw.value))

const relatedArticles = computed(() => {
  if (!article.value) return []
  const currentTags = article.value.tags || []
  const related = allArticles.value
    .filter(a => a.id !== article.value.id)
    .map(a => {
      const shared = (a.tags || []).filter(t => currentTags.includes(t)).length
      return { ...a, shared }
    })
    .filter(a => a.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 4)
  return related
})
</script>

<style scoped>
.article-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 16px;
  position: relative;
  z-index: 1;
}
.article-nav {
  margin-bottom: 16px;
}
.article-nav .el-button {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
.skeleton-wrap {
  background: rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  padding: 24px;
}
.article-container {
  border-radius: 20px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
.article-title {
  font-size: 26px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
}
.article-meta {
  margin-top: 8px;
  color: #909399;
  font-size: 13px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}
.views {
  color: #a0a8b8;
}
.related-section {
  margin-top: 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
.related-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #303133;
}
.related-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.related-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  background: rgba(102, 126, 234, 0.05);
}
.related-item:hover {
  background: rgba(102, 126, 234, 0.15);
  transform: translateX(4px);
}
.related-item-title {
  font-size: 14px;
  color: #667eea;
  font-weight: 500;
}
.related-item-date {
  font-size: 12px;
  color: #a0a8b8;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 22px;
  }
}
</style>

<style>
.article-content {
  font-size: 15px;
  line-height: 1.9;
  color: #303133;
}
.article-content h2 {
  font-size: 22px;
  margin: 32px 0 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(102, 126, 234, 0.2);
}
.article-content h3 { font-size: 18px; margin: 24px 0 12px; }
.article-content p  { margin-bottom: 16px; }
.article-content img {
  max-width: 100%;
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
.article-content pre {
  background: linear-gradient(135deg, #1e1e2e 0%, #282a36 100%);
  border-radius: 12px;
  padding: 20px;
  overflow-x: auto;
  margin: 20px 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.article-content code {
  font-family: 'Cascadia Code', 'Fira Code', Consolas, monospace;
  font-size: 13px;
}
.article-content pre code {
  background: none;
  padding: 0;
  color: #f8f8f2;
}
.article-content :not(pre) > code {
  background: linear-gradient(135deg, #667eea20, #764ba220);
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 13px;
  color: #667eea;
  font-weight: 500;
}
.article-content blockquote {
  border-left: 4px solid;
  border-image: linear-gradient(to bottom, #667eea, #764ba2) 1;
  padding: 12px 20px;
  margin: 20px 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08));
  border-radius: 0 12px 12px 0;
  color: #4a5568;
}
.article-content ul, .article-content ol {
  padding-left: 28px;
  margin-bottom: 16px;
}
.article-content li {
  margin-bottom: 8px;
  line-height: 1.7;
}
.article-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  overflow: hidden;
}
.article-content th, .article-content td {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
}
.article-content th {
  background: linear-gradient(135deg, #667eea20, #764ba220);
  font-weight: 600;
}
.article-content a {
  color: #667eea;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s;
}
.article-content a:hover {
  border-bottom-color: #667eea;
}
</style>