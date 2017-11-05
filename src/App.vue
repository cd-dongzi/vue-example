<template>
    <div id="app">
        <div class="back btn-bg-color " @click="$router.goBack()">返回</div>
        <transition :name="transition">
            <keep-alive>
                <router-view class="view" />
            </keep-alive>
        </transition>
    </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      transition: "slide-left"
    };
  },
  watch: {
    $route(to, from) {
      var back = this.$router.back;
      if (back) {
        this.transition = "slide-right";
      } else {
        this.transition = "slide-left";
      }
      this.$router.back = false;
    }
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.btn-bg-color {
  background:#c1866a;
  background: linear-gradient(left, rgba(186, 164, 119, 0.99), #c1866a 100%);
  background: -webkit-linear-gradient(left, rgba(186, 164, 119, 0.99), #c1866a 100%);
}
#app {
  margin-top: 50px;
}
li {
  list-style-type: none;
}
small {
  color: @vice-color;
}
.back {
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  position: relative;
  z-index: 10;
  cursor: pointer;
}
.view {
  padding: 50px 300px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-100%, 0);
}
</style>
