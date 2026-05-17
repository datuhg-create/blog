<template>
  <div class="home">
    <header class="site-header">
      <h1 class="site-title">📝 我的博客</h1>
      <p class="site-desc">.NET 全栈 · Vue 3 · 日常记录</p>
    </header>

    <div class="article-list" v-if="articles.length">
      <el-card
        v-for="(a, i) in articles"
        :key="a.id"
        class="article-card"
        shadow="hover"
        @click="$router.push('/article/' + a.id)"
      >
        <div class="card-body">
          <div class="card-content">
            <div class="card-index">#{{ i + 1 }}</div>
            <h2 class="card-title">{{ a.title }}</h2>
            <p class="card-desc">{{ a.desc }}</p>
          </div>
          <div class="card-meta">
            <el-tag size="small" v-for="t in a.tags" :key="t" style="margin-right:6px">{{ t }}</el-tag>
            <span class="card-date">{{ a.date }}</span>
          </div>
        </div>
      </el-card>
    </div>

    <el-empty v-else description="还没有文章" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const articles = ref([])

onMounted(async () => {
  const resp = await fetch(import.meta.env.BASE_URL + 'articles/index.json')
  if (resp.ok) articles.value = await resp.json()
})
</script>

<style scoped>
.home {
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 20px;
}
.site-header {
  text-align: center;
  margin-bottom: 40px;
}
.site-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}
.site-desc {
  color: #909399;
  font-size: 15px;
}
.article-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.article-card {
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s;
}
.article-card:hover {
  transform: translateY(-2px);
}
.card-body {
  padding: 4px 0;
}
.card-index {
  font-size: 12px;
  color: #c0c4cc;
  margin-bottom: 4px;
}
.card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #303133;
}
.card-desc {
  font-size: 14px;
  color: #909399;
  line-height: 1.6;
  margin-bottom: 12px;
}
.card-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.card-date {
  font-size: 12px;
  color: #c0c4cc;
}
</style>

