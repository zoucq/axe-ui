<template>
  <transition name="axe-fade-in">
    <div
      v-if="visible"
      class="axe-back-top"
      :style="style"
      @click.stop="handleTop"
    >
      <slot>
        <i class="icon axe-icon-xiangzuosanjiao"></i>
      </slot>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { throttle } from 'throttle-debounce'

function cubicMoule() {
  const cubic = value => Math.pow(value, 3)
  const easeInOutCubic = value =>
    value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2
  return {
    cubic,
    easeInOutCubic
  }
}

function handleToTop(element) {
  const { easeInOutCubic } = cubicMoule()
  const animationFrame =
    window.requestAnimationFrame || (func => setTimeout(func, 16))
  const beginValue = element.scrollTop
  const beginTime = Date.now()
  const step = () => {
    const progress = (Date.now() - beginTime) / 500
    if (progress < 1) {
      element.scrollTop = beginValue * (1 - easeInOutCubic(progress))
      animationFrame(step)
    } else {
      element.scrollTop = 0
    }
  }
  animationFrame(step)
}

export default {
  name: 'AxeBackTop',
  props: {
    target: {
      type: String,
      default: ''
    },
    showHeight: {
      type: Number,
      default: 200
    },
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  },
  setup(props, ctx) {
    const wrapper = ref(null)
    const ele = ref(null)
    const visible = ref(false)

    const style = computed(() => {
      return {
        right: `${props.right}px`,
        bottom: `${props.bottom}px`
      }
    })

    function scroll() {
      visible.value = ele.value.scrollTop > props.showHeight
    }

    function handleTop(e) {
      handleToTop(ele.value)
      ctx.emit('back', e)
    }

    function init() {
      wrapper.value = document
      ele.value = document.documentElement || document.body
      if (props.target) {
        ele.value = document.querySelector(props.target)
        if (!ele.value) {
          throw new Error(`target cannot be not ${ele.value}`)
        }
        wrapper.value = ele.value
      }
      scroll()
    }

    const throttleScroll = throttle(300, scroll)

    onMounted(() => {
      init()
      wrapper.value.addEventListener('scroll', throttleScroll)
    })

    onUnmounted(() => {
      wrapper.value.removeEventListener('scroll', throttleScroll)
    })

    return {
      visible,
      style,
      handleTop
    }
  }
}
</script>
