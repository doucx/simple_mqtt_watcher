document.addEventListener('DOMContentLoaded', function () {
    var socket = io();
    var dataPoints = {}; // 存储每个主题的数据点
    var charts = {}; // 存储每个主题的图表实例
    var messagesDiv = document.getElementById('messages'); // 获取消息显示区域的元素

    socket.on('message', function(msg) {
        var value = parseFloat(msg.data);
        if (!isNaN(value)) { // 如果数据是数字，则处理为图表
            if (!dataPoints[msg.topic]) {
                dataPoints[msg.topic] = [];
            }
            if (dataPoints[msg.topic].length >= 20) {
                dataPoints[msg.topic].shift(); // 保持数据点不超过20个
            }
            dataPoints[msg.topic].push(value);
            updateChart(msg.topic, dataPoints[msg.topic]);
        } else { // 如果数据不是数字，显示为文本
            handleTextMessage(msg);
        }
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


    function updateChart(topic, data) {
        var containerId = 'container-' + topic;
        var canvasId = 'chart-' + topic;
        var container = document.getElementById(containerId);
        
        if (!container) {
            // 创建包含canvas的div容器
            container = document.createElement('div');
            container.id = containerId;
            container.style.width = '400px';  // 控制宽度
            container.style.height = '200px'; // 控制高度
            container.style.margin = '10px';  // 可选的外边距
            messagesDiv.appendChild(container);
            
            // 创建canvas元素
            var canvas = document.createElement('canvas');
            canvas.id = canvasId;
            container.appendChild(canvas);
        }

        var ctx = document.getElementById(canvasId).getContext('2d');
        
        // 销毁旧的图表实例，如果存在
        if (charts[topic]) {
            charts[topic].destroy();
        }

        // 创建新的图表实例
        charts[topic] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map((_, i) => i + 1),
                datasets: [{
                    label: 'Data for ' + topic,
                    data: data,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // 保持比例，无视容器尺寸
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                animation: {
                    duration: 0,
                    easing: 'linear'
                }
            }
        });
    }
});

