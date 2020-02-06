<template>
  <div id="app">
    <router-view class="index" />
    <!-- <Index class="index" /> -->
  </div>
</template>

<script>
import Index from './components/Index'
export default {
  name: 'App',
  components: {
    Index
  }
}
</script>

<style scoped>
/** 页面居中 */
/** 页面宽度80% */
/* .index {
  margin: 0 auto;
  width: 80%;
} */
</style>
