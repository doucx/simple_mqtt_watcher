document.addEventListener('DOMContentLoaded', function () {
    var socket = io();

    socket.on('message', function(msg) {
            handleTextMessage(msg);
    });

    function handleTextMessage(msg) {
      var messageId = 'msg-' + msg.topic;
      var messageElement = document.getElementById(messageId);
      var messagesDiv = document.getElementById('messages'); // 获取消息显示区域的元素

      // 如果没有找到对应的元素，就创建一个新的div来显示文本消息
      if (!messageElement) {
          messageElement = document.createElement('div');
          messageElement.id = messageId; // 设置ID，便于未来可能的引用或修改
          messagesDiv.appendChild(messageElement);
      }

      // 设置或更新显示的消息内容
      messageElement.innerHTML = '<p>' + msg.topic + ': ' + msg.data + '</p>';
    }
});

