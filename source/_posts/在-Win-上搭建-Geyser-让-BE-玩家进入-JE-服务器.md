---
title: 在 Win 上搭建 Geyser 让 BE 玩家进入 JE 服务器
tags:
  - 游戏
  - 教程
description: 这是一篇在温都四系统上搭建 Geyser 让鸡眼版的Van家进入Jvav版服务器的教程
abbrlink: 28839
date: 2022-10-15 16:58:59
---

# 啥是 Geyser
> Geyser 是连接 Java版和基岩版 的一座桥梁。
> 在最新版本下，Geyser 支持 Minecraft基岩版 1.19.0/1.19.1x/1.19.20/1.19.21 和 Minecraft Java版 1.19.1/1.19.2。
> Geyser 旨在为 Java版和基岩版 之间建立一座桥梁，使得基岩版客户端加入Java版服务器。该项目仍在开发中，所以仍有 BUG 存在！
> https://geyser.superiormc.cn/

{% note warning %}
**由于 Geyser 的转发并不是完美的，所以基岩版玩家在游玩服务器时可能会被服务器的反作弊误判！**
**由于基岩版没有 Java 版的一些特性，因此游玩体验可能不怎么好。比如说基岩版下界的建筑高度限制是 128 个方块**
{% endnote %}

# 准备
在开始阅读本教程前，你需要准备：
* 脑子、手、眼睛
* **一台瘟都死系统的电脑（版本 ＞ 7）**

**服务器也需要准备**：
* 跨版本插件 ViaVersion (如果服务器那边不是最新游戏版本)

## 检查 Java 环境
Geyser 需要 Java 版本 ≥ 16 才能运行，请在搭建之前用一个非常简单的步骤检查你是否已正确安装 Java 16 或更高版本。

* 在任意界面按下`Windows 键 + R`或直接在开始菜单中打开 "运行"
* 输入`cmd`，并按下 ENTER (回车键) 或直接点击确定按钮
* 输入`java --version`并按下 ENTER（回车键）
* 看看第一行输出的内容的数字是否大于 16
* 以下是一个正确安装 Java 17 的示例：
```batch
C:\Users\Administrator>java --version
openjdk 17.0.4 2022-07-19
OpenJDK Runtime Environment Temurin-17.0.4+8 (build 17.0.4+8)
OpenJDK 64-Bit Server VM Temurin-17.0.4+8 (build 17.0.4+8, mixed mode, sharing)

C:\Users\Administrator>
```
* 如果不大于 16，你需要去手动下载并安装 Java 16 或更高版本
* 这里提供一个 Java 17 的下载链接：https://download.fastgit.org/adoptium/temurin17-binaries/releases/download/jdk-17.0.4.1%2B1/OpenJDK17U-jre_x64_windows_hotspot_17.0.4.1_1.msi
* 安装时一直下一步就好
* 记得安装完成后**再次打开一个 CMD**来看看你是否正确安装了 Jaca 17！

# 搭建
## 下载 & 存放
* 用浏览器打开 https://ci.opencollab.dev/job/GeyserMC/job/Geyser/job/master/
* 点击`Geyser-Standalone.jar`下载 Geyser 的最新独立版本

{% note info %}
**下载速度太慢怎么办？**
推荐使用 IDM 这类的多线程下载器，你甚至还可以使用逊雷。如果你不会搞，那就耐心等吧
{% endnote %}

* 下载完成后，复制`Geyser-Standalone.jar`到一个空文件夹

## 第一次启动

{% hideToggle "继续前请先读我!!!" %}
Windows 可能默认不会显示文件的扩展名。为了能确保下面的步骤顺利进行，请先开启扩展名显示。
这里以最新的 Windows 10 为例。
点击文件资源管理器最上方的`查看`，然后勾选`文件扩展名`。
![](/images/2022/10/QQ截图20221015173242.png)
{% endhideToggle %}

* 右键这个文件夹里面的空白处，点击`新建 - 文本文档`
* 给这个文本文档随便起一个名字
* 打开这个文本文档，复制粘贴以下内容：

```batch
@echo off
java -jar Geyser-Standalone.jar
pause
```

* 重命名这个文本文档，把它的`.txt`改为`.bat`
* 当 Windows 提示 "确定要更改吗？" 时，点击确定
* 双击打开你刚刚创建的 BAT 文件
* 耐心等待 30 秒左右的时间（取决于电脑性能）
* 当提示下面的内容时，你就可以继续下面的步骤了
![](/images/2022/10/QQ截图20221015173729.png)
* 以后启动 Geyser 直接打开那个 BAT 文件即可

## 修改配置文件
打开 Geyser 目录下的`config.yml`，找到第 42 行左右的`address`，把`auto`改成你要让基岩版玩家进入 Java 版的服务器的地址，例如你想让基岩版玩家进入 Hypixel，就改为`mc.hypixel.net`
再把下面的`port`的`25565`改成服务器的端口，例如你想让基岩版玩家进入 GroupServer（地址是`mcp3.rhymc.com:1079`），就把`port`改成`1079`。如果你不知道服务器端口是什么，或者本来就是 25565，请保持默认即可
更改下面的`auth-type`选项，如果你要进的服务器有正版验证，就保持默认的`online`即可，如果服务器没有正版验证，就把`online`改成`offline`

下面是我改的，这些改动会让玩家不需要登录 Java 正版账号进入 GroupServer：

```yaml
  # Leave as "auto" if floodgate is installed.
  address: mcp3.rhymc.com
  # The port of the remote (Java Edition) server
  # For plugin versions, if address has been set to "auto", the port will also follow the server's listening port.
  port: 1079
  # Authentication type. Can be offline, online, or floodgate (see https://github.com/GeyserMC/Geyser/wiki/Floodgate).
  # For plugin versions, it's recommended to keep the `address` field to "auto" so Floodgate support is automatically configured.
  # If Floodgate is installed and `address:` is set to "auto", then "auth-type: floodgate" will automatically be used.
  auth-type: offline
```

## 重载配置文件
保存好配置文件，打开 Geyser 的窗口，输入`geyser reload`耐心等待几十秒即可重载配置，此时玩家即可正常进入服务器。
如果你嫌这样重载配置慢，也可以直接关闭 Geyser 并重新打开。
![](/images/2022/10/QQ截图20221015175001.png)

# 进入
## 获取 Geyser 地址
* 如果你要进服务器的基岩版就在你部署 Geyser 的电脑上，直接使用地址`127.0.0.1`或`localhost`即可，端口默认`19132`
* 如果你要进服务器的基岩版不在你部署 Geyser 的电脑上，但都处在同一个网络的情况下，请在你部署 Geyser 的电脑上 打开 CMD，输入`ipconfig`，下面红框的内容就是你的 Geyser 地址**（别先用我这个，每个人都不是一样的）**
![](/images/2022/10/QQ截图20221015175435.png)
* 如果你要进服务器的基岩版和你用的都不是同一个网络的话，请看下面的映射教程

## 开玩
现在，打开你的基岩版（什么平台的都可以，比如 Android、iOS、Windows 10/11 版，**但是必须是最新版本的基岩版**），用你获取的 Geyser 地址即可进入服务器！

# 其他
## 更改 Geyser 的 MOTD
在配置文件的 22 行左右，直接更改下面的内容即可：
```yaml
  # The MOTD that will be broadcasted to Minecraft: Bedrock Edition clients. This is irrelevant if "passthrough-motd" is set to true
  # If either of these are empty, the respective string will default to "Geyser"
  motd1: "Geyser"
  motd2: "Another Geyser server."
```
例如你想让 MOTD 的第一行显示 "这只是一个互通服"，第二行 "这真的只是一个互通服！"，就改成：
```yaml
  # The MOTD that will be broadcasted to Minecraft: Bedrock Edition clients. This is irrelevant if "passthrough-motd" is set to true
  # If either of these are empty, the respective string will default to "Geyser"
  motd1: "这只是一个互通服"
  motd2: "这真的只是一个互通服！"
```

## 映射教程
如果你要进服务器的基岩版的玩家和你不是同一个网络（例如你有一个四川的小伙伴也想用你搭建的 Geyser 进 Java 版服务器，而你在河北），则需要用到映射，这里以 Netplus 映射为例。
* 前往 https://netplus.idc25.cn/download/netplus.exe 下载 Netplus
* 下载后放到一个空文件夹，并双击打开它
* 按照提示进行注册，注册后最好签个到领下余额
* 点击`映射管理`
![](/images/2022/10/QQ截图20221015180851.png)
* 点击第一个映射的设置
![](/images/2022/10/QQ截图20221015181051.png)
* 按照图上内容进行填写**（这里图中有错误，节点建议选`BGP 10M - 北京 S2`）**
![](/images/2022/10/QQ截图20221015181323.png)
* 保存映射，然后点击`启动`
* 把连接地址复制下来
* 地址中，`:`后面的是端口，在基岩版进入服务器时地址就填`:`前面的，端口填`:`后面的
  例如我的地址是`bj.s2.6net.plus:11451`，就地址填`bj.s2.6net.plus`，端口`11451`
* 别人想进你的互通服直接让他用映射地址进即可，你自己进的话请直接用`127.0.0.1`或`localhost`

**NetPlus 不是完全免费的，在使用映射节点中会产生一定的费用，不用映射请关闭，每日请记得签到！**

## 注意事项
* Geyser 无法完美翻译基岩版玩家的一些行为，基岩版玩家在游玩过程中可能会出现被反作弊误判封禁、回弹的情况
* Geyser 的一些限制：https://geyser.superiormc.cn/user-guide/dang-qian-xian-zhi