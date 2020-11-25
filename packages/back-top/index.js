import BackTop from './src/backTop.vue' // 导入组件
import 'style/back-top.scss' // 按需导入单个组件的样式

BackTop.install = app => {
  // 组件install属性
  app.component(BackTop.name, BackTop) // 定义组件-vue3的写法
}

export default BackTop // 默认导出

// 导入
// import { BackTop } from 'axe-ui';
// app.use(BackTop)
