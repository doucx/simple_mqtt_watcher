from flask import Flask, render_template
from config import MQTT_HOST, MQTT_PORT, MQTT_TOPIC, MQTT_USERNAME, MQTT_PASSWORD
from flask_socketio import SocketIO
import paho.mqtt.client as mqtt

app = Flask(__name__)
socketio = SocketIO(app)

# MQTT 消息处理函数
def on_message(client, userdata, message):
    # print(f'Received message: {message.payload.decode()} on topic {message.topic}')
    socketio.emit('message', {'topic': message.topic,'data': message.payload.decode()})

# MQTT 连接确认函数
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe(MQTT_TOPIC)

from config import MQTT_HOST, MQTT_PORT, MQTT_TOPIC, MQTT_USERNAME, MQTT_PASSWORD
import paho.mqtt.client as mqtt

# 设置 MQTT 客户端
mqtt_client = mqtt.Client()

mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message
# 检查是否提供了用户名和密码
if MQTT_USERNAME and MQTT_PASSWORD:
    mqtt_client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)  # 仅当用户名和密码存在时设置

mqtt_client.connect(MQTT_HOST, MQTT_PORT, 60)
mqtt_client.loop_start()

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    socketio.run(app, debug=True)
