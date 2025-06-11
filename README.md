# 一梦音乐播放器服务器端

## 使用方式
- 下载 `nodejs`
-

## `PM2` 守护进程
pm2.json
用于node env文件的资源路径
./public受node启动目录的影响，会如npm run start的位置来决定./publicde位置
PM2.json可以指定该位置
避免代码无法找到./public正确位置
