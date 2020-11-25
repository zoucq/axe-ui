<template>
  <div class="area demo-back-top">
    <div class="demo-title">back-top</div>
    <p>基本用法，默认图标，滑动页面即可看到右下方的按钮。</p>
    <axe-back-top @back="handleClick"></axe-back-top>

    <p>自定义显示内容，滑动页面即可看到右下方的按钮。</p>
    <axe-back-top :show-height="500" :right="40" :bottom="100">
      <div class="test">内容</div>
    </axe-back-top>

    <p>target目标，滑动box滚动条即可看到右下方的按钮。</p>
    <div class="box">
      <div class="inner"></div>
      <axe-back-top target=".box" :right="40" :bottom="160">
        box
      </axe-back-top>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  setup() {
    function handleClick(e) {
      console.log('handleClick emit', e)
    }
    return {
      handleClick
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-back-top {
  .test {
    color: red;
    font-weight: bold;
  }
  .box {
    width: 100%;
    height: 200px;
    border: 1px solid #ccc;
    overflow: auto;
    .inner {
      height: 600px;
    }
  }
}
</style>
