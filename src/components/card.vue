<template>
  <div class="card">
    <a target="_blank" :href="cardData.html_url">
      <h4 class="title">{{ cardData.name }}</h4>
      <div class="author">
        <Icon :nameIcon="cardData.owner.avatar_url" class="avatar"/>
        <span class="author-name">{{ cardData.owner.login }}</span>
      </div>
      <div class="rep">
        <div class="star">
          <Icon :nameIcon="'star.svg'"  class="img"/>
          {{ cardData.stargazers_count }}
        </div>
        <div class="watch">
          <Icon :nameIcon="'eye.svg'"  class="img"/>
          {{ cardData.watchers_count }} 
        </div>
      </div>
    </a>
    <div class="comment d-flex">
      <b-form-input type="text" class="ml-0 mr-0" v-model="comment" placeholder="Комментарий к проекту"></b-form-input>
      <b-button type="submit" class="serch-button ml-0 mr-0 " variant="primary" squared @click="saveComment(cardData)"> 
        <i class="fa-solid fa-pencil"></i>
      </b-button>
    </div>
    <div class="comments">
      <p  v-for="(comment, index) in cardData.comment" :key="index">
        {{comment}}
      </p>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/icon.vue'

export default {
  components: {
    Icon
  },
  props:{
    cardData:{
      type: Object,
      required: false
    },
  },
  data(){
    return {
      comment: ''
    }
  },
  methods:{
    saveComment(cardData){
      this.$store.dispatch('saveCommentToCard', {id: cardData.id, comment: this.comment})
      this.comment = ''
    }
  }
  
}
</script>
<style scoped>
.card{
  max-width: 340px;
  min-height: 180px;
  border: 1px solid #A2A3A4;
  box-shadow: -4px 4px 8px 0px #0000007d;
  padding: 10px 10px;
  border-radius: 0;
  margin: 0 auto 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.title{
  font-size: 18px;
  font-family: Roboto;
  font-weight: 400;
}
.card a{
  color: unset;
  text-decoration: unset;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
}
.comment .form-control{
  width: auto;
}
.author{
  width: 50%;
  height: 40px;
  margin: 0 0 10px 0;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-direction: row;
}
.avatar{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.author-name{
  text-transform: capitalize;
  font-size: 16px;
  font-family: Roboto;
  font-weight: 400;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 0 0 10px;
}
.rep{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: center;
  width: 60%;
  font-size: 14px;
  font-family: Roboto;
  font-weight: 400;
}
.comment{
  max-width: 100%;
}
.img{
  width: 25px;
}
</style>
