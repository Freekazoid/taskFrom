<template>
  <img class="icon" :src="iconSrc"/> 
</template>

<script>
export default {
  name: 'Icon',
  props: {
    nameIcon: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      iconSrc: ''
    }
  },
  created(){
    this.iconSrc = (!!this.nameIcon.indexOf('https')? require(`../assets/${this.nameIcon}`) : this.nameIcon )
  }
}
</script>

<style scoped>
.icon{
  width: 100%;
}
</style>