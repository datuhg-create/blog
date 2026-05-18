# Git 常用命令速查

日常开发中最常用的 Git 命令整理 🛠️

## 基础操作

```bash
# 克隆仓库
git clone <url>

# 查看状态
git status

# 添加修改
git add .
git add <file>

# 提交
git commit -m "描述"

# 推送到远程
git push

# 拉取更新
git pull
```

## 分支操作

```bash
# 查看分支
git branch

# 创建并切换
git checkout -b feature/new-feature

# 切换分支
git checkout main

# 删除本地分支
git branch -d <branch>

# 删除远程分支
git push origin --delete <branch>
```

## 撤销操作

```bash
# 撤销未提交的修改
git checkout -- .

# 撤销已 add 的文件
git reset HEAD <file>

# 撤销最近一次 commit（保留修改）
git reset --soft HEAD~1
```

## 查看历史

```bash
# 简洁日志
git log --oneline

# 图形化
git log --graph --oneline --all

# 查看某文件修改
git log -p <file>
```

## 实用技巧

### 临时保存修改
```bash
git stash
# ... 做其他事情 ...
git stash pop
```

### 合并 commit
```bash
git rebase -i HEAD~3
# 将 pick 改为 squash
```

### 查看某行代码的修改历史
```bash
git blame <file>
```

> 建议：多用 `git log --oneline` 查看提交历史，保持 commit 信息清晰！