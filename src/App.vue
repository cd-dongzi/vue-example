<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
#app {
    margin-top: 50px;
}
li {
    list-style-type: none;
}
small {
    color: @vice-color;
}
</style>
