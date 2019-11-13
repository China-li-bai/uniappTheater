<template>
<view @tap="toggleBtnTap" class="skeleton__render-button">
  {{ isShow ? '关闭' : '骨架屏' }}
</view>
</template>

<script>
const getScrollOffset = () => new Promise(resolve => {
  wx.createSelectorQuery().selectViewport().scrollOffset(resolve).exec();
});
/**
 * 得到element信息
 * @param {string} selector selector
 * @returns {Promise<Object[]>}
 */
/**
 * 得到element信息
 * @param {string} selector selector
 * @returns {Promise<Object[]>}
 */
const getElements = selector => new Promise(resolve => {
  wx.createSelectorQuery().selectAll(selector).fields({
    dataset: true,
    id: true,
    rect: true,
    size: true
  }).exec(res => resolve(res[0]));
});

export default {
  data() {
    return {
      physicalRadio: 2
    };
  },

  components: {},
  props: {
    isShow: {
      type: Boolean,
      value: false
    },
    selector: {
      type: String
    },
    selectorTypes: {
      type: Array
    }
  },
  methods: {
    attached() {
      // 默认的首屏宽高，防止内容闪现
      const systemInfo = wx.getSystemInfoSync();
      this.setData({
        physicalRadio: 750 / systemInfo.windowWidth
      });
    },

    /**
     * 按钮点击
     */
    toggleBtnTap() {
      if (this.isShow) {
        this.$emit('toggleShow', false);
        return;
      }

      this.calcData().then(data => {
        this.ouput(data);
        this.$emit('updateData', data);
        this.$emit('toggleShow', true);
      });
    },

    ouput(data) {
      console.log(JSON.stringify(data, null, 2));
    },

    objToStyle(obj) {
      const {
        physicalRadio
      } = this;
      return Object.keys(obj).map(key => `${key}:${obj[key] * physicalRadio}rpx`).join(';');
    },

    calcData() {
      return Promise.all([getScrollOffset(), getElements(`.${this.selector}`)]).then(([scrollOffset, [container]]) => {
        const {
          width,
          height,
          top,
          left
        } = container;
        console.log(container);
        return this.calcStyleLists(container).then(lists => ({
          container: this.objToStyle({
            width,
            height,
            top: top + scrollOffset.scrollTop,
            left: left + scrollOffset.scrollLeft
          }),
          lists
        }));
      });
    },

    calcStyleLists(container) {
      const {
        top,
        left,
        right,
        bottom
      } = container;
      const {
        selector,
        selectorTypes
      } = this;
      const promises = selectorTypes.map(type => getElements(`.${selector}-${type}`).then(elements => elements.filter(vo => vo.left < right && vo.right > left && vo.top < bottom && vo.bottom > top).map(vo => this.objToStyle({
        width: vo.width,
        height: vo.height,
        left: vo.left - left,
        top: vo.top - top
      }))).then(elements => ({
        type,
        elements
      })));
      return Promise.all(promises);
    },

    setData: function (obj) {
      let that = this;
      let keys = [];
      let val, data;
      Object.keys(obj).forEach(function (key) {
        keys = key.split('.');
        val = obj[key];
        data = that.$data;
        keys.forEach(function (key2, index) {
          if (index + 1 == keys.length) {
            that.$set(data, key2, val);
          } else {
            if (!data[key2]) {
              that.$set(data, key2, {});
            }
          }

          data = data[key2];
        });
      });
    }
  }
};
</script>
<style>
@import "./skeleton-btn.css";
</style>