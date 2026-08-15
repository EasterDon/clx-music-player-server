-- ============================================================
-- 一梦音乐播放器后端 · 数据库示例（PostgreSQL）
-- 用法：psql -U 用户名 -d 数据库名 -f clx_music_example.sql
-- ============================================================

-- 应用信息表
CREATE TABLE IF NOT EXISTS app (
    id SERIAL PRIMARY KEY,
    announcement TEXT NOT NULL DEFAULT '',
    app_version TEXT NOT NULL DEFAULT '',
    app_download_link TEXT NOT NULL DEFAULT '',
    app_version_description TEXT NOT NULL DEFAULT ''
);

-- 歌曲表
-- music_array 为谱面 JSON：字符串 = 按键，数字 = 延时（毫秒）
CREATE TABLE IF NOT EXISTS musics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    music_array JSONB,
    author TEXT,
    cover_url TEXT NOT NULL,
    mp3_url TEXT
);

-- 示例数据
INSERT INTO app (announcement, app_version, app_download_link, app_version_description)
VALUES ('示例公告：欢迎使用一梦音乐播放器', '0.0.1', '', '');

INSERT INTO musics (name, music_array, author, cover_url, mp3_url)
VALUES ('示例歌曲', '["a",500,"b",500,"c",500]'::jsonb, '示例作者', '/music/1/music.jpg', '/music/1/music.mp3');
