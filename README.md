# What that ?
可能是一个游戏CMS,当然也可以用来做其他事情
- 🔯React + 🤸‍♂️TypeScript + 🐜Antd 页面构建 
- 🐻zuStand + ♾️Immer + 🐸localforage 多实例存储
- 🖼️Konva + 📊AntV/X6 渲染

# Setup
## 创建项目
`pnpm create rspack@latest`
注意使用 @rspack/cli v0.3.11
升级到0.4请查看 https://github.com/rspack-contrib/rspack-examples/pull/2

## 启动项目
```bash
cd $$PROJECT_NAME$$
pnpm install  // 不要用bun！
bun run dev || pnpm run dev
```

## 安装依赖
`pnpm install $$DEP_NAME$$`
