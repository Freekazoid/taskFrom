<template>
  <div class="loader" v-if="loader">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="80" cy="50" r="5" fill="#17232d">
        <animate attributeName="cx" values="80;35.00000000000001" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>
        <animate attributeName="cy" values="50;75.98076211353316" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>
        <animate attributeName="fill" values="#17232d;#343f52" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>
      </circle><circle cx="35.00000000000001" cy="75.98076211353316" r="5" fill="#343f52">
        <animate attributeName="cx" values="35.00000000000001;34.999999999999986" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>
        <animate attributeName="cy" values="75.98076211353316;24.019237886466847" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>
        <animate attributeName="fill" values="#343f52;#595d7a" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>
      </circle><circle cx="34.999999999999986" cy="24.019237886466847" r="5" fill="#595d7a">
        <animate attributeName="cx" values="34.999999999999986;80" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>
        <animate attributeName="cy" values="24.019237886466847;49.99999999999999" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>
        <animate attributeName="fill" values="#595d7a;#17232d" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animate>
      </circle>
    </svg>
  </div>
</template>

<script>
export default {
  data(){
    return{
      loader: false
    }
  },
  computed:{
    getLoader() {
      return this.$store.state.loader
    },
  },
  watch:{
    getLoader: {
      handler: function (val, oldVal) {
        this.loader = val
      },
      deep: true
    }
  },
}
</script>

<style>
.loader{
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  background: #fff;
}

</style>