// pages/index/index2.js

var Bmob = require('./Bmob-2.5.30.min.js');
Bmob.initialize("9e3567b1a20eaed7", "111222");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  To2Page() {
    console.log("111")
    wx.navigateTo({ url: '/pages/index/index' });
    console.log("222")
  },
  onInputChange(e) {
    const nickName = e.detail.value
    console.log(nickName)
  },
  onInput(e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;

    console.log(key)
    // console.log(value)
    this.setData({ [key]: value });
  },


getval(){

  const query1 = Bmob.Query('test');
  // query.set('id', data.objectId) //需要修改的objectId
  query1.set("dd",this.data.kkk1)
  query1.save().then(res => {
  console.log(res)
  }).catch(err => {
  console.log(err)
  })

  const query = Bmob.Query('test');
  query.find().then(res => {
    console.log(res)
  })
  console.log(this.data.kkk1)

},

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  onMapTap(event) {
    const that = this;
    const latitude = event.detail.latitude; // 获取点击位置的纬度
    const longitude = event.detail.longitude; // 获取点击位置的经度

    console.log(latitude)
    console.log(longitude)
  },

  RRR(){
    console.log("2RRRRhhhhhhkkkk")
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
      }})
      console.log("2RR")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})