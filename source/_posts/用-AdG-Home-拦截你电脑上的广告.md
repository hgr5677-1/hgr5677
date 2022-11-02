---
title: 用 AdG Home 拦截你电脑上的广告
tags:
  - 教程
description: 在你的电脑上搭建个 AdGuard Home DNS 服务器来拦截各种小广告
date: 2022-11-02 12:32:21
---

# 什么是 AdGuard Home
> AdGuard Home 是一款全网广告拦截与反跟踪软件。在您将其安装完毕后，它将保护您所有家用设备，同时您不再需要安装任何客户端软件。随着物联网与连接设备的兴起，掌控您自己的整个网络环境变得越来越重要。
> https://adguard.com/zh_cn/adguard-home/overview.html

AdGuard Home 安装好后会在本地创建一个 DNS 服务器，配置你电脑的 DNS 服务器为这个 DNS 就可拦截广告。

# 准备
要搭建 AdGuard Home，你需要准备：
* **脑子、手和眼睛（必须）**
* 一台 Windows 7 / Windows Server 2008 R2 或更高版本
  **这台电脑需能够正常访问互联网**

# 搭建
## 下载
前往 https://github.com/AdguardTeam/AdGuardHome/releases/ ，按照下面的步骤操作：
* 打开后往下翻，找到 Assets 并点击
* 耐心等待加载
* 找到`AdGuardHome_windows_amd64.zip`，点击下载，如果你的系统是 32 位的就下载`AdGuardHome_windows_386.zip`

**如果无法访问，请直接点击右边的链接来下载 64 位版（v0.107.16）**：[https://ghproxy.com/https://github.com/AdguardTeam/AdGuardHome/releases/download/v0.107.16/AdGuardHome_windows_amd64.zip](https://ghproxy.com/https://github.com/AdguardTeam/AdGuardHome/releases/download/v0.107.16/AdGuardHome_windows_amd64.zip])

## 解压
打开压缩包，将压缩包内的所有文件全部解压到一个空的文件夹。如果你没有安装解压缩软件，请安装[7-Zip](https://sparanoid.com/lab/7z/)。

## 部署
双击打开`AdGuardHome.exe`，此时会出现一个黑色的命令行窗口，不要关闭它。
如果出现 Windows 防火墙提示，请点击允许。

接下来：
* 用浏览器打开 http://127.0.0.1:3000
* 点击 "开始配置"
* "网页管理界面" 的端口建议填`3000`，DNS 的不要动，然后下一步
* 填一个你记得住的用户名和密码，然后下一步
* 点击下一步后会出现一个让你配置 DNS 的教程，先别配置，先跳过，然后点击下一步 - 打开仪表盘
* 填写你刚刚安装时填的账号和密码

如果一切正常的话，应该会出现图下的这个界面：
![](/images/2022/10/QQ截图20221102125744.png)

# 配置
## 设置上游 DNS
为了能让域名解析速度更快一些，我们需要配置上游 DNS。
点击 "设置" - "DNS 设置"
![](/images/2022/10/QQ截图20221102130011.png)

直接复制下面的内容粘贴过去：
```text
223.5.5.5
8.8.8.8
119.29.29.29
180.76.76.76
114.114.114.114
tls://dns.alidns.com
https://doh.pub/dns-query
```
然后把下面的负载均衡改为并行请求。
![](/images/2022/10/QQ截图20221102130457.png)

最后找到下面的应用按钮，点击保存即可。

## 配置拦截规则
默认自带的拦截规则不适合瓷器用户网上冲浪使用，拦截效果比较差。我们需要再添加几个拦截规则。
点击 "过滤器" - "DNS 拦截列表"。
如果你那里 Github 时不时连不上的话，建议把默认的两个拦截规则全部删除。

这里推荐几个拦截规则：
| 名称 | 描述 | 链接 | 评分 |
| :---: | :---: | :---: | :---: |
| anti-AD | 使用anti-AD能够屏蔽广告域名，能屏蔽电视盒子广告，屏蔽app内置广告，同时屏蔽了一些日志收集、大数据统计等涉及个人隐私信息的站点，能够保护个人隐私不被偷偷上传 | https://anti-ad.net/easylist.txt | 非常好 |
| AdRules | 一个基于中文区强力去广告的规则 | https://gitlab.com/cats-team/adrules/-/raw/main/dns.txt | 非常好 |
| 大圣净化 | 针对国内视频网站 | https://raw.fastgit.org/jdlingyu/ad-wars/master/hosts | 好 |
| StevenHosts | 专门去国外网站广告的，国内网站也有点，这个规则还会拦截恶意软件网站 | https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts | 较好 |
| yHosts | 拦截国内网站广告 | https://raw.fastgit.org/vokins/yhosts/master/hosts | 一般 |
| AdGuard DNS 过滤器 | 此过滤器由其他几个过滤器组成，并经过简化，以便更好地与 DNS 级别的广告拦截兼容 | https://raw.fastgit.org/AdguardTeam/FiltersRegistry/master/filters/filter_15_DnsFilter/filter.txt | 一般 |
| notrack-blocklists | 拦截跟踪器（在国内好像效果不太好） | https://gitlab.com/quidsup/notrack-blocklists/-/raw/master/trackers.list | 较差 |

其他的：
| 名称 | 描述 | 链接 |
| :---: | :---: | :---: |
| 加速访问 Github | 应该是每小时更新 | https://raw.hellogithub.com/hosts |

**如何添加规则？**
点击左下角的 "添加阻止列表" - "添加一个自定义列表"。
![](/images/2022/10/QQ截图20221102142601.png)

建议在 "设置" - "常规设置" 中，将过滤器更新频率设置为 1 个小时。
如果要添加白名单规则，请前往 "过滤器" - "DNS 允许列表"。

{% note warning %}
**不建议添加太多的规则！**
否则会导致 AdGuard Home 进程占用内存过高，网上冲浪速度慢，消耗大量流量。
{% endnote %}

# 设置 DNS
**这里以 Windows 10 为例，其他版本的系统可能有所不同。**
1. 打开 "控制面板"。
2. 点击 "网络和 Internet" - "网络和共享中心" - "更改适配器设置"。
3. 如果你是有线上网，双击 "以太网"。如果你是无线网就双击无线网络。
4. 点击 "属性"。
5. 找到 "Internet 协议版本 4 (TCP/IPv4)"，双击。
6. 选择 "使用下面的 DNS 服务器地址"。
7. 首选 DNS 填写`127.0.0.1`，备用不填。
8. 保存即可。

**如果你的电脑有 IPv6，那么建议你再配置下 IPv6 的 DNS**
1. 找到 "Internet 协议版本 6 (TCP/IPv6)"，双击。
2. 选择 "使用下面的 DNS 服务器地址"。
3. 首选 DNS 填写`::1`，备用不填。
4. 保存即可。

**注意：如果你本身就没有 IPv6，那么你设置了 DNS 服务器你也不会拥有 IPv6！**

# 保持 AdGuard Home 运行
**如果 AdGuard Home 的窗口被关闭，而你又设置了为 AdGuard Home 的 DNS，就会导致你无法正常网上冲浪！**
## 隐藏命令提示符串口
在 AdGuard 的文件夹创建一个`.bat`文件，如下图：
![](/images/2022/10/QQ截图20221102144351.png)
创建后右键用记事本打开，把下面的内容粘贴进去：
```batch
@echo off
if "%1"=="h" goto begin
start mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
:begin
AdGuardHome.exe
```
保存即可。
关闭 AdGuardHome 窗口，再用这个`.bat`文件打开，看看任务管理器是否有 AdGuardHome 的进程。

## 开机自启
按下`Windows 键 + R`，打开运行窗口，输入`regedit`并回车。
在注册表编辑器的地址栏中粘贴`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run`并回车，如果没有地址栏就手动去找。
右键空白处，点击 "新疆" - "字符串值"，将添加的新项命名为`AdGuardHome`。
双击刚刚添加的新项，数值数据填写`"你的AdGuardHome路径/你刚刚创建的bat文件的名字"`，例如`"E:\Tools\AdGuardHome\Start.bat"`

# 注意事项
* 不建议开启浏览安全、安全搜索、家长控制等功能，否则可能会导致网上冲浪速度慢。
* 本教程同样适用于在 Windows 的服务器搭建，但是国内服务商可能不允许你提供 DNS 服务。
* 如果你想要用服务器搭建，请选择个离你比较近的服务器。
* DNS 服务会在 UDP 53 端口上运行。
* 如果你想用你的手机、平板等设备用上你搭建的 DNS，需要你的电脑 24 小时一直运行 AdGuardHome。如果你的手机不支持更改 DNS，你需要在你手机连接的 Wifi 的控制面板更改 DNS。