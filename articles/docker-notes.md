# Docker 入门笔记

最近学习 Docker，做个笔记 🐳

## 什么是 Docker？

Docker 是轻量级的虚拟化技术，让应用在不同环境一致运行。

## 核心概念

- **镜像 (Image)**：模板，类似类
- **容器 (Container)**：镜像的运行实例，类似对象
- **仓库 (Registry)**：镜像存储，如 Docker Hub

## 常用命令

### 镜像操作
```bash
# 拉取镜像
docker pull nginx:latest

# 查看镜像
docker images

# 删除镜像
docker rmi <image-id>
```

### 容器操作
```bash
# 运行容器
docker run -d -p 8080:80 nginx

# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a

# 停止容器
docker stop <container-id>

# 删除容器
docker rm <container-id>

# 进入容器
docker exec -it <container-id> bash
```

### 日志和调试
```bash
# 查看容器日志
docker logs <container-id>

# 实时日志
docker logs -f <container-id>
```

## Dockerfile 示例

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

## Docker Compose

```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: password
```

启动：`docker-compose up -d`

> Docker 熟能生巧，多动手实践！