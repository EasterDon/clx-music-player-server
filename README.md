# 一梦音乐播放器服务器端

基于 Node.js + Fastify + PostgreSQL 的音乐曲库 API 服务。

## 环境要求

- Node.js 20+
- pnpm
- PostgreSQL

## 环境变量文件

| 文件 | 用途 | 加载方式 |
|------|------|----------|
| `.env` | **开发** | `pnpm run dev:start`（`--env-file=.env`） |
| `.env.production` | **生产** | `pnpm start`（`--env-file=.env.production`） |

两个文件均在**项目根目录**，格式相同，均需填写以下五项（路径可相对 cwd，如 `./public`）：

```env
db_manager_name = 数据库用户名
db_password = 数据库密码
db_name = 数据库名
public_path = ./public
songs_path = ./public/songs
```

可选：`PORT`、`LOG_LEVEL`、`db_host`（默认 `127.0.0.1`）、`db_port`（默认 `5432`）。

生产环境（`.env.production`）建议增加：

```env
NODE_ENV=production
LOG_DIR=./logs
```

启用后日志写入 `LOG_DIR`（默认 `./logs`），按日分文件 `YYYY-MM-DD.log`；每月 1 日将上月日志打包为 `archives/YYYY-MM.tar.gz`。

## 快速开始（开发）

```bash
pnpm install
# 编辑项目根 .env，填写数据库等信息
pnpm run build
pnpm run dev:start
```

开发时可在两个终端分别运行：

```bash
pnpm run dev:build   # TypeScript 监听编译
pnpm run dev:start   # 运行编译后的 src/app.js
```

## 生产部署

```bash
pnpm run build
# 编辑项目根 .env.production
pnpm start
```

或使用 PM2：在 `ecosystem.config.json` 中将 **`cwd` 设为项目根绝对路径**，并确保该目录下存在已配置的 `.env.production`。

```bash
pm2 start ecosystem.config.json
```

## 环境变量说明

| 变量 | 必填 | 说明 |
|------|------|------|
| `db_manager_name` | 是 | 数据库用户名 |
| `db_password` | 是 | 数据库密码 |
| `db_name` | 是 | 数据库名 |
| `public_path` | 是 | 静态资源目录（如 `./public`） |
| `songs_path` | 是 | 歌词目录（如 `./public/songs`） |
| `db_host` | 否 | PostgreSQL 主机，默认 `127.0.0.1` |
| `db_port` | 否 | PostgreSQL 端口，默认 `5432` |
| `PORT` | 否 | 监听端口，默认 `3000` |
| `LOG_LEVEL` | 否 | 日志级别，默认 `info` |
| `NODE_ENV` | 生产建议 | 设为 `production` 时启用文件日志 |
| `LOG_TO_FILE` | 否 | 设为 `true` 时同样启用文件日志（可不设 `NODE_ENV`） |
| `LOG_DIR` | 否 | 日志目录，默认 `./logs`（生产且启用文件日志时生效） |

路径经 `path.resolve` 后交给 `@fastify/static`。请在项目根启动（PM2 的 `cwd` 为项目根）。

## 静态资源目录

| 路径 | 用途 |
|------|------|
| `public/` | 静态站点根目录 |
| `public/songs/{id}/` | v2/v3 歌词 API 读取 `music.lrc` |
| `public/clx_musics/` | 旧版静态目录（仅静态访问，API 不使用） |

## API 概览

| 版本 | 前缀 | 说明 |
|------|------|------|
| v1 | `/musics` | 兼容旧客户端（维护模式，不建议新接入） |
| v2 | `/v2/songs` | 列表、notation、歌词（原始 JSON / 文本） |
| v3 | `/v3/music`、`/v3/app` | 统一 `{ data, message }` 响应 |
| 旧版应用 | `/app` | 客户端版本信息（裸 JSON，兼容用；新接入请用 `/v3/app`） |
| 运维 | `GET /health` | 探活：DB 正常 `200 { "status": "ok" }`，否则 `503` |

### v2 示例

- `GET /v2/songs` — 歌曲列表
- `GET /v2/songs/:id/notation` — 字母谱
- `GET /v2/songs/:id/lyrics` — 歌词（`.lrc` 文件）

### v3 示例

- `GET /v3/music` — 歌曲列表
- `GET /v3/music/:id/notation` — 字母谱
- `GET /v3/music/:id/lyrics` — 歌词
- `GET /v3/app` — 软件版本信息

错误响应（v2/v3 及全局）：`{ "message": "...", "data": null }`。

## 数据库表（参考）

- `music` — 曲库列表
- `notation` — `id` 与 `notes`（字母谱）
- `app` — 客户端版本信息

## 测试与代码检查

```bash
pnpm test
pnpm lint
```

## 许可证

AGPL-3.0-only
