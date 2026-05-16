<template>
  <div class="article-page">
    <div class="article-nav">
      <el-button text @click="$router.push('/')">← 返回首页</el-button>
    </div>

    <el-card class="article-container" v-if="article">
      <h1 class="article-title">{{ article.title }}</h1>
      <div class="article-meta">
        <span>{{ article.date }}</span>
        <el-tag size="small" v-for="t in article.tags" :key="t" style="margin-left:8px">{{ t }}</el-tag>
      </div>
      <el-divider />
      <div class="article-content" v-html="rendered"></div>
    </el-card>

    <el-empty v-else description="文章不存在" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const route = useRoute()
const article = ref(null)
const raw = ref('')

onMounted(async () => {
  // 获取文章列表找到元信息
  const listResp = await fetch('/articles/index.json')
  if (listResp.ok) {
    const list = await listResp.json()
    article.value = list.find(a => a.id === route.params.id)
  }
  if (!article.value) return

  // 加载 .md 文件
  const mdResp = await fetch(`/articles/${article.value.id}.md`)
  if (mdResp.ok) raw.value = await mdResp.text()
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
</script>

<style scoped>
.article-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 20px;
}
.article-nav {
  margin-bottom: 16px;
}
.article-container {
  border-radius: 12px;
  padding: 8px;
}
.article-title {
  font-size: 26px;
  font-weight: 700;
}
.article-meta {
  margin-top: 8px;
  color: #909399;
  font-size: 13px;
  display: flex;
  align-items: center;
}
</style>

<style>
/* Markdown 文章内容样式 */
.article-content {
  font-size: 15px;
  line-height: 1.8;
  color: #303133;
}
.article-content h2 { font-size: 22px; margin: 28px 0 12px; }
.article-content h3 { font-size: 18px; margin: 24px 0 10px; }
.article-content p  { margin-bottom: 14px; }
.article-content img {
  max-width: 100%;
  border-radius: 8px;
  margin: 16px 0;
}
.article-content pre {
  background: #f6f8fa;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  margin: 16px 0;
}
.article-content code {
  font-family: 'Cascadia Code', 'Fira Code', Consolas, monospace;
  font-size: 13px;
}
.article-content pre code {
  background: none;
  padding: 0;
}
.article-content :not(pre) > code {
  background: #f0f2f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
}
.article-content blockquote {
  border-left: 4px solid #409eff;
  padding: 8px 16px;
  margin: 16px 0;
  background: #f8f9fa;
  border-radius: 0 8px 8px 0;
  color: #606266;
}
.article-content ul, .article-content ol {
  padding-left: 24px;
  margin-bottom: 14px;
}
.article-content a {
  color: #409eff;
  text-decoration: none;
}
.article-content a:hover {
  text-decoration: underline;
}
</style>
