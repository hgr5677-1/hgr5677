---
title: Hexo Butterfly 主题配置教程
tags:
  - 建站
  - 教程
description: 这篇文章将教你如何配置 Butterfly 主题
cover: 'https://www.hualigs.cn/image/631d8826c564a.jpg'
abbrlink: 47332
date: 2022-09-11 13:18:09
sitemap: false
updated: 2022-09-11 14:00:00
---
![](https://www.hualigs.cn/image/631d8826c564a.jpg)
Butterfly 是一个非常强大的 Hexo 主题，本站就在用，上图是这个主题的功能。

{% note info %}
**非 Hexo 搭建教程**
我认为看这篇文章的一般都会搭建Hexo了，所以我就不再教怎么搭建Hexo了。
如果你根本不会搭建Hexo，你可以去百度，一堆教程。
{% endnote %}

# 安装 Butterfly 主题
## 用 Git 安装
{% note warning %}
**如果你没有安装 Git，则需要先去安装**
Ubuntu 可以使用 APT 包管理器来一键安装：`sudo apt install git`
{% endnote %}
在你的 Hexo 博客目录下面，打开终端输入下面这些指令
```bash
root@VM-4-6-ubuntu:~# git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly (安装 Butterfly)
```

## 创建配置文件
打开`themes\butterfly\_config.yml`，把里面的内容都复制下来，然后在你的博客根目录创建一个`_config.butterfly.yml`，把刚才复制的内容都粘贴在里面，然后保存。

## 更改默认主题
打开根目录下的`_config.yml`，找到`theme`配置项，改为`butterfly`：
```yaml
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: butterfly
```

# 配置
阅读https://butterfly.js.org/posts/dc584b87/，里面的内容能解决你的所有需求。

## 其他配置
### 代码高亮自动换行
如果主题配置文件中的`code_word_wrap`改为了`true`却依然没效果，就需要更改 Hexo 默认的配置了。
打开`_config.yml`，找到`highlight`配置项，改成下面的内容：
```yaml
highlight:
  enable: true
  line_number: false
  auto_detect: false
  tab_replace: ''
  wrap: true
  hljs: false
```

### 修改字体
不知道为什么，我在主题配置文件里修改字体，CSS 都已经引入了却没有效果。我试了直接用 CSS 改字体的方法是有效的。
在`source`文件夹下创建一个名为`css`的文件夹，用于存放自定义的 CSS 文件。
再在里面创建一个名字任意（最好是英文，如"font.css"）的 CSS 文件，输入以下内容：
```css
/* cyrillic-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 300;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZftVyCN4Ffgg.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 300;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZftVyLN4Ffgg.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 300;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZftVyDN4Ffgg.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 300;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZftVyMN4Ffgg.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* latin-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 300;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZftVyBN4Ffgg.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 300;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZftVyPN4E.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 400;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCu6KVjbNBYlgoKej75l0mwFg.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 400;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCu6KVjbNBYlgoKej7wl0mwFg.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 400;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCu6KVjbNBYlgoKej74l0mwFg.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 400;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCu6KVjbNBYlgoKej73l0mwFg.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* latin-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 400;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCu6KVjbNBYlgoKej76l0mwFg.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 400;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCu6KVjbNBYlgoKej70l0k.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 700;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZPslyCN4Ffgg.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 700;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZPslyLN4Ffgg.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 700;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZPslyDN4Ffgg.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 700;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZPslyMN4Ffgg.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* latin-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 700;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZPslyBN4Ffgg.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 700;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZPslyPN4E.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 300;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCv6KVjbNBYlgoC1CzjvWyNL4U.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 300;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCv6KVjbNBYlgoC1CzjtGyNL4U.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 300;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCv6KVjbNBYlgoC1CzjvGyNL4U.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 300;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCv6KVjbNBYlgoC1Czjs2yNL4U.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* latin-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 300;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCv6KVjbNBYlgoC1CzjvmyNL4U.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 300;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCv6KVjbNBYlgoC1CzjsGyN.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCs6KVjbNBYlgoKcg72j00.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCs6KVjbNBYlgoKew72j00.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCs6KVjbNBYlgoKcw72j00.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCs6KVjbNBYlgoKfA72j00.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* latin-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCs6KVjbNBYlgoKcQ72j00.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCs6KVjbNBYlgoKfw72.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 700;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCv6KVjbNBYlgoCxCvjvWyNL4U.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 700;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCv6KVjbNBYlgoCxCvjtGyNL4U.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 700;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCv6KVjbNBYlgoCxCvjvGyNL4U.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 700;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCv6KVjbNBYlgoCxCvjs2yNL4U.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* latin-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 700;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCv6KVjbNBYlgoCxCvjvmyNL4U.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 700;
  src: url(https://gstatic.loli.net/s/ubuntu/v20/4iCv6KVjbNBYlgoCxCvjsGyN.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
body {
    font-family: 'Ubuntu', 'Microsoft YaHei UI';
}
```
此 CSS 文件会将英文、符号和数字更改为 Ubuntu 的字体，其他字符是微软雅黑 UI。

#### 引入 CSS 文件
打开主题配置文件，找到`inject`项，修改为下面的内容：
```yaml
# Inject
# Insert the code to head (before '</head>' tag) and the bottom (before '</body>' tag)
# 插入代码到头部 </head> 之前 和 底部 </body> 之前
inject:
  head:
     - <link rel="stylesheet" href="/css/你的css文件名字.css">
  bottom:
    # - <script src="xxxx"></script>
```
重新生成网页静态文件，试试效果吧。

### 修改字体行间距
默认的行间距看起来有点难受，我们可以用万能的 CSS 修改行间距：
```css
.post-content {
    line-height: 22px;
}
```
此段代码会将文章内容的行间距改为22px，效果就是你阅读文章的样子。
这段代码可以直接写在上面自定义字体的CSS的最下面。

### 修改多个收缩框的间距
如果你在文章中有多个连续的收缩框，你会发现收缩框之间的行间距看起来比较难受（可能因为我是强迫症吧）
![](https://www.hualigs.cn/image/631d85d89b99c.jpg)
这是因为默认的间距被设置为了 22px，然而我们只要设为 6px 就够了。
还是 CSS：
```css
.toggle {
    margin-bottom: 6px;
}
```

效果：
![](https://www.hualigs.cn/image/631d88a75b548.jpg)
看起来是不是对强迫症很友好？

---

就先到这，以后还有什么再继续补充。