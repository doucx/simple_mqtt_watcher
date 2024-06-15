# MQTT Flask Real-time Dashboard

## 项目描述

此项目是一个实时数据仪表盘，使用 MQTT 和 Flask 构建。它能够实时显示来自 MQTT 代理的数据，支持多主题数据可视化，并提供动态更新的图表显示。

GPT4负责编写所有代码（包括这个readme）

### 功能

- 实时订阅 MQTT 主题。
- 显示数值数据的实时折线图。
- 显示文本数据。
- 支持 MQTT 用户名和密码验证。

## 安装指南

以下步骤将帮助你在本地环境中部署和运行此项目。

### 先决条件

确保你的系统中已安装以下软件：
- Python 3.8+
- pip (Python 包管理器)

### 安装步骤

1. 克隆仓库：
   ```bash
   git clone https://your-repository-url.git
   cd your-repository-folder
   ```

2. 安装依赖：
   ```bash
   pip install -r requirements.txt
   ```
3. 设置设置：
    ```bash
    cp ./config.py.example ./config.py
    ```
    使用你喜欢的编辑器编辑config.py

    ```python
    import os

    MQTT_HOST = '127.0.0.1'
    MQTT_PORT = 1883
    MQTT_TOPIC = '#'
    MQTT_USERNAME = os.getenv('MQTT_USERNAME')  # 默认为 None 如果环境变量不存在
    MQTT_PASSWORD = os.getenv('MQTT_PASSWORD')
    ```

3. 设置环境变量(*可选，如果服务器不要求账号密码*)：
   ```bash
   export MQTT_USERNAME='your_username'
   export MQTT_PASSWORD='your_password'
   ```

4. 运行应用：
   ```bash
   python app.py
   ```

## 使用方法

启动服务后，访问 `http://localhost:5000` 来查看仪表盘。图表将自动更新，显示从 MQTT 代理收到的最新数据。

## 技术栈

- **Front-end**: HTML, JavaScript
- **Back-end**: Python, Flask, paho-MQTT
- **Data Visualization**: Chart.js

## 版权声明

本项目是在 MIT 许可下发布的。详情见 [LICENSE](LICENSE) 文件。
