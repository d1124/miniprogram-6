// index.js

var Bmob = require('./Bmob-2.5.30.min.js');
const app = getApp()
const img = '../image/location.png'
Bmob.initialize("9e3567b1a20eaed7", "111222");
Page({
  data: {
    latitude: 39.9283666628888,
    longitude: 116.5819000069855,
    xq:"你是"
  },
  onLoad: function () {
    this.mapCtx = wx.createMapContext('mapId')

    // this.mapCtx = wx.createMapContext("myMap");


    this.mapCtx.on('markerClusterClick', res =>{
      // this.setData({ [xq]: 123 });
      wx.showToast({
        title: '让你点了吗',
      })
      console.log('markerClusterClick', res)
    })

    // 使用默认聚合效果时可注释下一句
    // this.bindEvent()
  },
  onInput(e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;

    console.log(key)
    console.log(value)
    this.setData({ [key]: value });
    console.log(this.data.kkk1)
  },
  upload(){
    console.log(this.data.kkk1)
    const kk=this.data.kkk1
    this.mapCtx.getCenterLocation({
      success: function (res) {
          console.log(res.latitude)
          console.log(res.longitude)
    const query = Bmob.Query('pyq');
    query.set('jd', res.latitude) 
    query.set('wd', res.longitude) 
    query.set("xx",kk)
    query.set("yh","admin")
    query.save().then(res => {
    console.log(res)
    }).catch(err => {
    console.log(err)
    })
    // this.setData({ ["kkk1"]: "" });
      }, 
      fail: function (res) {
        console.log(res)
      }
    })
    wx.showToast({
      title: '上传成功',
    })

  },
  getcenter(){
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.latitude)
        console.log(res.longitude)
      }, 
      fail: function (res) {
            console.log(res)
      }
  })
  },

  fz(){
    this.mapCtx.moveToLocation()
  },
xq(){
  wx.showToast({
    title: '我才是弟弟',
  })
  this.setData({xq:"你是弟弟"})
},
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
  addMarker1() {
    const marker = {
      id: 1,
      iconPath: img,
      width: 50,
      height: 50,
      joinCluster: false, // 指定了该参数才会参与聚合
      label:{
        width: 100,
        height: 30,
        borderWidth: 1,
        borderRadius: 10,
        bgColor: '#ffffff'
      }
    }

    const query = Bmob.Query('pyq');
    query.find().then(res => {
      console.log(res)
      console.log(res.length)
      const markers = []
      for(let i=0;i<res.length;i++){
        console.log(i)
        console.log(res[i].jd)
        console.log(res[i].wd)
        console.log(res[i].xx)
    const newMarker = Object.assign(marker, {
      latitude: res[i].jd,
      longitude: res[i].wd,
    })
    newMarker.id = 9+i
    newMarker.label.content=res[i].xx
    markers.push(newMarker)
    this.mapCtx.addMarkers({
      markers,
      clear: false,
      complete(res) {
        console.log('addMarkers', res)
      }
    })
      }
    })


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
