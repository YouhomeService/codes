var requests = require('../../request/request.js');
//获取应用实例
var app = getApp()
var arr_name = ["多功能网关", "空调伴侣", "墙壁开关", "人体传感器", "门窗传感器", "天然气报警器", "智能插座", "烟雾报警器", "温湿度传感器", "无线开关", "小爱音箱mini", "LED智能台灯", "净水器", "电饭煲", "净水器厨下版", "LED灯泡", "扫地机器人", "米家小相机"]
var arr_link = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

Page({
  data: {
    scene_id: '',
    items: [{
      id: "1",
      src: "../../images/equipment/gateway.jpg",
      text: arr_name[0]
    }, {
      id: "2",
      src: "../../images/equipment/air_condition.jpg",
      text: arr_name[1]
    }, {
      id: "3",
      src: "../../images/equipment/Aqara_wall_switch.jpg",
      text: arr_name[2]
    }, {
      id: "4",
      src: "../../images/equipment/body_sensor.jpg",
      text: arr_name[3]
    }, {
      id: "5",
      src: "../../images/equipment/door_sensor.jpg",
      text: arr_name[4]
    }, {
      id: "6",
      src: "../../images/equipment/gas_alarm.jpg",
      text: arr_name[5]
    }, {
      id: "7",
      src: "../../images/equipment/smart_socket.jpg",
      text: arr_name[6]
    }, {
      id: "8",
      src: "../../images/equipment/smoke_alarm.jpg",
      text: arr_name[7]
    }, {
      id: "9",
      src: "../../images/equipment/temperature_sensor.jpg",
      text: arr_name[8]
    }, {
      id: "10",
      src: "../../images/equipment/wireless_switch.jpg",
      text: arr_name[9]
    }, {
      id: "11",
      src: "../../images/equipment/xiaoai.png",
      text: arr_name[10]
    }, {
      id: "12",
      src: "../../images/equipment/table_lamp.jpg",
      text: arr_name[11]
    }, {
      id: "13",
      src: "../../images/equipment/water_purifier.jpg",
      text: arr_name[12]
    }, {
      id: "14",
      src: "../../images/equipment/cooker.jpg",
      text: arr_name[13]
    }, {
      id: "15",
      src: "../../images/equipment/water_purifier_2.jpg",
      text: arr_name[14]
    }, {
      id: "16",
      src: "../../images/equipment/lamp.png",
      text: arr_name[15]
    }, {
      id: "17",
      src: "../../images/equipment/robot.jpg",
      text: arr_name[16]
    }, {
      id: "18",
      src: "../../images/equipment/camera.png",
      text: arr_name[17]
    }],
    available_items: [],
    available_entityId: []
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    this.setData({
      scene_id: id
    })

    requests.requestSearchAllDevice('', (data) => {
      if (data.length == 0) {
        /*
        wx.showModal({
          title: '未找到可添加的智能设备'
        })
        */
      } else {
        var temp = []
        var temp_2 = []
        for (var i = 0; i < data.length; i++) {
          if (get_chinName(data[i]) != 'no') {
            temp.push(get_chinName(data[i]))
            temp_2.push(data[i])
          }
        }
        this.setData({
          available_items: temp,
          available_entityId: temp_2
        })
        console.log(this.data.available_items)
        console.log(this.data.available_entityId)
      }
    })
  },

  choose: function (event) {
    var device_name = event.currentTarget.dataset.name;
    var avai_items = this.data.available_items;
    var avai_entityId = this.data.available_entityId;
    var sceneId = this.data.scene_id;
    var flag = false;
    for (var i = 0; i < avai_items.length; i++) {
      if (device_name == avai_items[i]) {
        // 存在
        flag = true;
        var t1 = avai_entityId[i];
        var t2 = avai_items[i];
        var t3 = sceneId;
        var t4 = get_url(avai_entityId[i]);
        wx.showModal({
          title: '已扫描到该设备，确定添加？',
          success: function (res) { 
            if (res.confirm) {
              requests.addDevice(t1, t2, t3, get_url(t1), (data) => {
                if (data.length == 0) {
                  wx.showModal({
                    title: '连接失败'
                  })
                } else {
                  wx.showToast({
                    title: '连接成功',
                    icon: 'success',
                    duration: 1000
                  })
                }
              })
              if (t1 == 'sensor.temperature_158d000222c6da') {
                requests.addDevice('sensor.humidity_158d000222c6da', t2, t3, get_url(t1))
              }
            }
          }
        })
      }
    }
    if (flag == false) {
      wx.showModal({
        title: '未扫描到设备，不可添加'
      })
    }
  },
  
})

function get_chinName(entityId) {
  switch (entityId) {
    /*
    case 'sensor.yr_symbol':
      return "天气";
      break;
    case 'sensor.illumination_7811dce1bbf3':
      return "气压 日落日出";
      break;
    */
    case 'sensor.temperature_158d000222c6da':
      return "温湿度传感器";
      break;
    case 'sensor.humidity_158d000222c6da':
      return "温湿度传感器";
      break;
    case 'switch.plug_158d000247e3d5':
      return "智能插座";
      break;
    case 'light.gateway_light_7811dce1bbf3':
      return "多功能网关";
      break;
    case 'binary_sensor.motion_sensor_158d0002480a33':
      return "人体传感器";
      break;
    case 'binary_sensor.switch_158d0002519297':
      return "无线开关";
      break;
    default:
      return "no";
      break;
  }
}

function get_url(entityId) {
  switch (entityId) {
    /*
    case 'sensor.yr_symbol':
      return "../../images/equipment/body_sensor.jpg";
      break;
    case 'sensor.illumination_7811dce1bbf3':
      return "../../images/equipment/lamp.png";
      break;
    */
    case 'sensor.temperature_158d000222c6da':
      return "../../images/equipment/temperature_sensor.jpg";
      break;
    case 'sensor.humidity_158d000222c6da':
      return "../../images/equipment/temperature_sensor.jpg";
      break;
    case 'switch.plug_158d000247e3d5':
      return "../../images/equipment/smart_socket.jpg";
      break;
    case 'light.gateway_light_7811dce1bbf3':
      return "../../images/equipment/gateway.jpg";
      break;
    case 'binary_sensor.motion_sensor_158d0002480a33':
      return "../../images/equipment/body_sensor.jpg";
      break;
    case 'binary_sensor.switch_158d0002519297':
      return "../../images/equipment/wireless_switch.jpg";
      break;
    default:
      break;
  }
}