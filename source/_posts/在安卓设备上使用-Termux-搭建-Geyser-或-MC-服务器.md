---
title: 在安卓设备上使用 Termux 搭建 MC 服务器
tags:
  - 游戏
  - 教程
description: 这篇文章将教你如何使用 Termux 在 Android 设备上搭建一个 Minecraft 服务器
date: 2023-04-21 14:53:23
updated: 2023-04-21 14:53:23
cover: /images/2023/04/0421-cover.png
---

# 介绍 Termux
> Termux 是一款基于 Android 平台的开源 Linux 终端模拟器，使用 pkg(apt) 进行软件包的管理。最重要的是，它无需 root 权限，因此，绝大多数 Android 都可以运行。
> https://sspai.com/post/56031#!

你可以把 Termux 当成一个 Linux 来用。你可以在 Termux 上做能在 Linux 上做到的大部分事，可以搭建网站、可以搭建 MySQL、可以使用 Git，甚至可以安装 Linux 发行版和桌面环境。

{% note info %}
**此教程仅适用于安卓设备，苹果用户勿扰。**
{% endnote %}

# 教程
## 下载 Termux
前往 https://f-droid.org/zh_Hans/packages/com.termux/ 下载 Termux。
![](/images/2023/04/QQ截图20230421145739.png)

下载后安装即可。怎么安装应该不用我教了，这年头`.apk`还不会安装基本可以告别安卓设备了。

## 准备操作
打开 Termux 后，应该是这种样子 (我这边修改了一下，会和刚安装后的有很大不同，但接下来的操作都是一样的)：
![](/images/2023/04/Screenshot_2023-04-21-14-59-23.png)

### 设置镜像源
如果你在瓷器大陆，你可能需要更改一下下载源来达到更快的下载速度。如果不改，下载速度可能会比某度网盘一样慢。

1. 输入指令`termux-change-repo`
2. 点击输入法上的确认 / 回车键。
3. 使用 Termux 键盘上的箭头键，选中 "Mirrors by BFSU"，然后按输入法上的空格键选中，再按下输入法上的确认键。
![](/images/2023/04/QQ截图20230421151223.png)
4. 完成。

## 开始搭建
**这里以开 MC Paper 服务端 1.18.2 的服务器为例。如果你要开更低版本的服务器，你可能需要换一个 Java 版本。**

1. 使用`pkg install openjdk-17`来安装 OpenJDK 17。
2. 出现 "Do you want to..." 时，输入 y 并回车。
3. 输入`mkdir server && server`创建一个名为 server 的文件夹并转到该文件夹，将用于存放服务器文件。
4. 输入`curl -o mc.jar https://cdn.polars.cc/paper-1.18.2.jar`下载 Paper 1.18.2 服务端。
5. 输入`chmod 777 *`调整文件权限。
6. 使用`java -Xms4G -Xmx4G -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -jar mc.jar --nogui`启动服务器。如果你的设备内存低于或等于 4GB，可以将这条指令开头的两个 4G 改为 2G。如果你的设备可用内存高于 4GB，可以将其调整的更大来防止内存溢出。
7. 耐心等待 Paper 下载依赖。由于是从 Mojang 官方源那里下载的，所以这可能会比较漫长。
8. 服务器关闭后，使用`sed -i "s/eula=false/eula=true/g" eula.txt`来同意 EULA。
9. 如果你希望使用离线登录的玩家也能进入服务器，请使用`nano server.properties`来调整服务器配置:
   使用箭头键将光标移动到`online-mode`那行，然后把这一行的`true`改成`false`。
   ![](/images/2023/04/QQ截图20230421152638.png)
   改好后，按下 Termux 键盘上的 Ctrl，然后再按下输入法上的 X。再输入 Y，再按下回车键，即可保存配置。
10. 再次使用上面的指令启动服务器。当显示了`Done (11.4514s)!`之类的信息时，就说明服务器开好了。

* 若要关闭服务器，请使用`stop`指令。如果服务器关不掉，可使用`Ctrl + C`来强制关闭。
* 以后若想启动服务器，可以使用`cd server && java -Xms4G -Xmx4G -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -jar mc.jar --nogui`指令。
* 也可以加插件、配置服务器。你可以把这个东西当成一个 Linux 环境。
* 退出 Termux 后其实 Termux 依然还在后台运行。此时可以打开通知栏，里面有个 Termux 的消息，展开，点击 EXIT 即可完全退出 Termux。

![](/images/2023/04/Screenshot_2023-04-21-15-40-10.png)

其实这些操作基本和 Linux 上相同，熟悉 Linux 的用户可能根本不需要这些教程。

**进入服务器**
* 如果你想要在开了 MC 服务器的同一台设备进入服务器，在 Minecraft 添加服务器地址时，服务器地址输入`127.0.0.1`即可。
* 如果你想要在处在同一网络下的设备进入服务器 (你的手机开着服务器，你想用电脑进入服务器，且两个设备都连接了同一个网络)，则需要获取你手机的内网 IP 地址。

**获取 IP 地址**
{% note info %}
不同系统的操作方法不同。这里我以原生 Android 9 为例。
{% endnote %}
1. 打开手机设置，打开网络设置 -> WLAN (Wi-fi)，点击你当前连接的 Wifi。
2. 点击高级选项，里面会有个 IP 地址，记下来，这就是你服务器的地址。

![](/images/2023/04/Screenshot_2023-04-21-15-37-01.png)

{% note warning %}
**注意！**
* 当你每次连接到 Wifi 时，IP 地址都可能会有变动。
* 此方法仅适用于局域网 (和你连接到同一网络的设备)，如果想让和你不是一个网络的朋友进入服务器，则需要配置内网映射。这里就不教了。
{% endnote %}