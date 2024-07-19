// components/navBar/navBar.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  lifetimes: {
    attached() {
      const windowInfo = wx.getWindowInfo() // 获取window信息(同步API)
      const capsuleInfo = wx.getMenuButtonBoundingClientRect() //获取胶南信息(同步API)
      const result = this.calculate(windowInfo, capsuleInfo) //计算必要的信息
      this.setData({
        ...result,
        windowInfo,
        capsuleInfo
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
     * @param {*} windowInfo 可视窗口信息
     * @param {*} capsuleInfo 胶囊信息
     */
    calculate(windowInfo, capsuleInfo) {
      const padding1 = capsuleInfo.top - windowInfo.statusBarHeight //胶囊顶部与状态栏之间的留白(正值)
      const navHeight = windowInfo.statusBarHeight + padding1 + capsuleInfo.height + padding1 //状态栏高度+之间留白+胶囊高度+之间留白(重复的目的是对称)
      console.log(padding1)
      console.log(navHeight)

      return {
        padding1,
        navHeight
      }
    },

    print(){
      console.log(this.data)
    }


  }
})