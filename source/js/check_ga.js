// 创建一个用于检测是否能够访问谷歌分析脚本的 <script> 元素
var script = document.createElement("script");
script.src = "https://www.googletagmanager.com/gtag/js?id=G-SVH99N3L20";
script.async = true;

// 检测 <script> 元素是否能够加载成功
script.onerror = function() {
  // 检查是否需要显示提醒消息
  if (localStorage.getItem('ignoreAnalyticsWarning') !== 'true') {
    // 创建消息元素
    var message = document.createElement("div");
    message.innerHTML = "为了能帮助博主分析用户流量，我们希望你能解除对谷歌分析的屏蔽。<br />若要解除屏蔽，请尝试关闭你的浏览器上的广告拦截插件和脚本。    ";
    message.style.cssText = "position: fixed; bottom: 20px; right: 20px; background-color: #2196f3; color: white; padding: 10px; font-size: 14px; border-radius: 5px; box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2); z-index: 9999;";

    // 创建关闭按钮
    var closeButton = document.createElement("button");
    closeButton.innerHTML = "不再提示";
    closeButton.style.cssText = "position: absolute; top: 0px; right: 5px; background-color: transparent; color: white; border: none; outline: none; cursor: pointer;";

    // 将关闭按钮添加到消息元素中
    message.appendChild(closeButton);

    // 将消息元素添加到页面中
    document.body.appendChild(message);

    // 为关闭按钮添加点击事件处理程序
    closeButton.addEventListener("click", function() {
      // 将本地存储标记为已忽略提醒
      localStorage.setItem('ignoreAnalyticsWarning', 'true');
      message.style.display = "none";
    });
  }
};

// 将 <script> 元素添加到页面中
document.head.appendChild(script);
