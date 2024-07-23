// components/navBar/navBar.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  lifetimes: {
    attached() {
      const isPC = () => {
        const {
          platform
        } = wx.getDeviceInfo()
        return ['mac', 'windows'].includes(platform)
      }
      const windowInfo = wx.getWindowInfo() // 获取window信息(同步API)
      const capsuleInfo = wx.getMenuButtonBoundingClientRect() //获取胶南信息(同步API)
      const result = this.calculate(windowInfo, capsuleInfo, isPC()) //计算必要的信息
      const pages = getCurrentPages()


      this.setData({
        ...result,
        windowInfo,
        capsuleInfo,
        pages
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 计算必要的信息
     * @param {object} windowInfo 可视窗口信息
     * @param {object} capsuleInfo 胶囊信息
     * @param {boolean} isPC  当前环境是否为电脑环境,电脑环境没有状态栏,windowInfo.statusBarHeight为0
     */
    calculate(windowInfo, capsuleInfo, isPC) {
      const paddingTop = capsuleInfo.top - (isPC ? 44 : windowInfo.statusBarHeight) //胶囊顶部与状态栏之间的留白(正值)
      const paddingRight = windowInfo.screenWidth - capsuleInfo.right //胶南右侧与屏幕右侧之间的留白(正值)
      const navHeight = windowInfo.statusBarHeight + paddingTop + capsuleInfo.height + paddingTop //状态栏高度+之间留白+胶囊高度+之间留白(重复的目的是对称)
      const navWidth = windowInfo.screenWidth - capsuleInfo.width - paddingRight //屏幕宽度-胶南宽度-胶南右侧与屏幕右侧的留白


      return {
        paddingTop,
        paddingRight,
        navHeight,
        navWidth
      }
    },

    toPrePage() {
      wx.navigateBack({
        delta: 1
      });
    },

    toHome() {
      wx.switchTab({
        url: '/pages/index/index',
      })
    },

    print() {
      const device = wx.getDeviceInfo()
      console.log(this.data)
      console.log(device)
    }


  }
})