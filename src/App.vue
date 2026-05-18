<template>
  <div class="app-container">
    <div class="bg-decoration"></div>
    <ThemeToggle />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import ThemeToggle from './components/ThemeToggle.vue'
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --card-bg: rgba(255, 255, 255, 0.92);
  --card-border: rgba(255, 255, 255, 0.5);
  --text-primary: #303133;
  --text-secondary: #606266;
  --text-muted: #909399;
  --accent-color: #667eea;
  --shadow: rgba(0, 0, 0, 0.1);
}

html.dark {
  --bg-primary: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  --card-bg: rgba(30, 30, 45, 0.92);
  --card-border: rgba(255, 255, 255, 0.08);
  --text-primary: #e4e4e7;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;
  --accent-color: #a78bfa;
  --shadow: rgba(0, 0, 0, 0.3);
}

html.dark body {
  background: var(--bg-primary);
}

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: var(--bg-primary);
  background-attachment: fixed;
  color: var(--text-primary);
  transition: background 0.3s, color 0.3s;
}
.app-container {
  min-height: 100vh;
  position: relative;
}
.bg-decoration {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.08) 0%, transparent 30%);
  z-index: 0;
}
html.dark .bg-decoration {
  background:
    radial-gradient(circle at 20% 80%, rgba(167, 139, 250, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.03) 0%, transparent 30%);
}
.bg-decoration::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  animation: bgMove 60s linear infinite;
}
@keyframes bgMove {
  from { transform: translate(0, 0); }
  to { transform: translate(-50px, -50px); }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

html.dark .el-card,
html.dark .el-tabs__header,
html.dark .el-button,
html.dark .el-input__wrapper,
html.dark .el-empty__description p {
  background: var(--card-bg) !important;
  color: var(--text-primary) !important;
}
html.dark .el-tabs__item {
  color: var(--text-secondary) !important;
}
html.dark .el-tabs__item.is-active {
  color: #a78bfa !important;
}
html.dark .el-divider {
  border-color: rgba(255, 255, 255, 0.1);
}
html.dark .el-tag {
  background: rgba(167, 139, 250, 0.2) !important;
  color: #a78bfa !important;
  border: none !important;
}
</style>