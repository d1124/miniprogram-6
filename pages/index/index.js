// index.js

var Bmob = require('./Bmob-2.5.30.min.js');
const app = getApp()
const img = '../image/location.png'
Bmob.initialize("4adb3d93239ec4de3a9eefd21a562585", "1bffa96524a6d4a8949533cd2d9573ae");
Page({
  data: {
    latitude: 39.9283666628888,
    longitude: 116.5819000069855,
  },
  onLoad: function () {
    this.mapCtx = wx.createMapContext('mapId')

    // this.mapCtx = wx.createMapContext("myMap");


    this.mapCtx.on('markerClusterClick', res =>{
      console.log('markerClusterClick', res)
    })

    // 使用默认聚合效果时可注释下一句
    // this.bindEvent()
  },
  getcenter(){
    this.mapCtx.getCenterLocation({
      success: function (res) {
          console.log(res)
          // that.setData({
          //     longitude: res.longitude,
          //     latitude: res.latitude,
          // })
      }, 
      fail: function (res) {
            console.log(res)
      }
  })
  },

  fz(){

    this.mapCtx.addMarkers({
      markers,
      clear: false,
      complete(res) {
        console.log('addMarkers', res)
      }
    })
  },

  // onMapTap(event) {
  //   const that = this;
  //   const latitude = event.detail.latitude; // 获取点击位置的纬度
  //   const longitude = event.detail.longitude; // 获取点击位置的经度

  //   console.log(latitude)
  //   console.log(longitude)
  // },
  bindEvent() {
    this.mapCtx.initMarkerCluster({
      enableDefaultStyle: false,
      zoomOnClick: true,
      gridSize: 60,
      complete(res) {
        console.log('initMarkerCluster', res)
      }
    })

    // enableDefaultStyle 为 true 时不会触发改事件
    this.mapCtx.on('markerClusterCreate', res => {
      console.log('clusterCreate', res)
      const clusters = res.clusters
      const markers = clusters.map(cluster => {
        const {
          center,
          clusterId,
          markerIds
        } = cluster
        return  {
          ...center,
          width: 0,
          height: 0,
          clusterId, // 必须
          label: {
            content: markerIds.length + '',
            fontSize: 20,
            width: 60,
            height: 60,
            bgColor: '#00ff00',
            borderRadius: 30,
            textAlign: 'center',
            anchorX: 0,
            anchorY: -30,
          }
        }
      })
      this.mapCtx.addMarkers({
        markers,
        clear: false,
        complete(res) {
          console.log('clusterCreate addMarkers', res)
        }
      })
    })
    
  },
  To2Page() {
    console.log("111")
    wx.navigateTo({ url: '/pages/index/index2' });
    console.log("222")
  },
  addMarkers() {
    const marker = {
      id: 1,
      iconPath: img,
      width: 50,
      height: 50,
      joinCluster: true, // 指定了该参数才会参与聚合
      label:{
        width: 50,
        height: 30,
        borderWidth: 1,
        borderRadius: 10,
        bgColor: '#ffffff'
      }
    }

    const positions = [
      {
        latitude: 23.099994,
        longitude: 113.324520,
      }, {
        latitude: 23.099994,
        longitude: 113.322520,
      }, {
        latitude: 23.099994,
        longitude: 113.326520,
      }, {
        latitude: 39.9283666628888,
        longitude: 116.5819000069855,
      }
    ]
    const markers = []
    positions.forEach((p, i) => {
      const newMarker = Object.assign(marker, p)
      newMarker.id = i + 1
      newMarker.label.content = `label ${i + 1}`
      markers.push(newMarker)

      this.mapCtx.addMarkers({
        markers,
        clear: false,
        complete(res) {
          console.log('addMarkers', res)
        }
      })
    })
  },

  removeMarkers() {
    this.mapCtx.addMarkers({
      clear: true,
      markers: []
    })
  },

  onMarkerTap(e) {
    console.log('@@ markertap', e)
  },
  
  onCalloutTap(e) {
    console.log('@@ onCalloutTap', e)
  },

  onLabelTap(e) {
    console.log('@@ labletap', e)
  }
})
