---
title: 手把手教你把电脑版 QQ 的频道功能永久关闭
tags:
  - 教程
description: QQ 频道一点用没有，而且还很占用资源，关也关不掉，这篇文章将教你怎么把QQ频道扬了
categories: 教程
date: '2023-01-15 16:46'
abbrlink: 38898
---

# 起因
QQ频道功能稀烂，使用体验很差（尤其是电脑端），占用资源还大，关也关不掉，于是写了篇这个教程来教你怎么扬了电脑版的QQ频道功能。

{% note warning %}
**注意**
按照下面的步骤操作后**可能**会导致QQ无法正常更新，而且这种方法也不能关了手机QQ的频道功能
{% endnote %}

# 步骤
## 删除QQ频道相关文件
打开`C:\Users\你的Windows用户名\AppData\Local\Tencent\QQGuild`文件夹，双击`Uninstall QQGuild.exe`并按照提示卸载。
![](/images/2023/01/HRSword_gDJfKuYu2k.png)
{% note info %}
记得把`你的Windows用户名`替换了，不知道怎么替换：
1. 按`Windows 键 + R`，输入`winver`。
2. 下面有个“许可如下用户使用本产品”，把这句话下面的第一行文字记下来然后替换那个路径即可。
   例如我这个是“许可如下用户使用本产品<新起一行>admin”，就打开`C:\Users\admin\AppData\Local\Tencent\QQGuild`这个路径。
{% endnote %}

## 设置文件夹权限防止死灰复燃
这种方法依然无法根治，QQ会在重新打开后再次自动安装上QQ频道，因此我们需要给文件夹配置权限防止它下载并安装。

### 防止自动安装
返回`QQGuild`文件夹的上个目录，右键这个文件夹点击“属性 - 安全 - 高级”，按照下图的步骤来配置权限。
![](/images/2023/01/kQG24TNspP.png)

设置完成后，你会发现你自己也无法访问文件夹，这是正常现象。**注意：如果你点击“继续”，你就需要再重做一遍上面的步骤。**

### 防止自动下载安装包
就算按照上面的步骤操作后，QQ依然会在另外一个文件夹下载频道安装包，只不过装不上去。
如果你觉得QQ会在每次启动时下载频道安装包很烦人的话可以参考上面的操作，把`C:\Users\你的Windows用户名\AppData\Roaming\Tencent\QQ\Temp\QQInstallSoftware`也给禁止访问。**但是这样做可能会导致QQ无法正常更新。**