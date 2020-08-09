<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'App'
  }
</script>
<style lang="scss">
* {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  img {
    vertical-align: middle;
    border-style: none;
  }
  a {
    text-decoration: none;
  }
  body {
    background-color: steelblue;
  }
  .loading {
    color: white;
    font-size: 24px;
  }
</style>
