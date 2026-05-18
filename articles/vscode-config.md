# VS Code 配置分享

工欲善其事，必先利其器。以下是我 VS Code 的常用配置和插件推荐 🎯

## 必装插件

| 插件 | 用途 |
|------|------|
| Vue - Official | Vue 3 语法支持 |
| ESLint | 代码规范检查 |
| Prettier | 代码格式化 |
| GitLens | Git 可视化 |
| Error Lens | 错误直接显示在行尾 |
| Auto Rename Tag | 自动重命名配对标签 |

## settings.json

```json
{
  "editor.fontSize": 16,
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "files.associations": {
    "*.vue": "vue"
  }
}
```

## 快捷键

- `Ctrl + Shift + P` - 命令面板
- `Ctrl + B` - 切换侧边栏
- `Ctrl + ~` - 切换终端
- `Ctrl + D` - 选中下一个相同词
- `Alt + Up/Down` - 移动行

> 养成用快捷键的习惯，效率提升明显！