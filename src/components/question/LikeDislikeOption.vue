<template>
  <ol class="options">
    <li class="like">
      <input type="radio"
             :id="`like-${question.id}`"
             :name="`likedislike-${question.id}`"
             @click="answer(true)" />
      <label class="icon"
             :for="`like-${question.id}`"
             :style="{backgroundImage: `url(${question.likeIcon.url})`}">
      </label>
      <span class="label">
        Like
      </span>
    </li>
    <li class="dislike">
      <input type="radio"
             :id="`dislike-${question.id}`"
             :name="`likedislike-${question.id}`" 
             @click="answer(false)"/>
      <label class="icon"
             :for="`dislike-${question.id}`"
             :style="{backgroundImage: `url(${question.dislikeIcon.url})`}">
      </label>
      <span class="label">
        Like
      </span>
    </li>
  </ol>
</template>

<script lang="ts">
export default {
  name: 'LikeDislikeOption',
  props: {
    id: String,
  },
  data: function (){ 
    return {
      liked: '',
    };
  },
  computed: {
    question(this: any) {
      return this['$store'].getters.getQuestion(this.id);
    },
  },
  methods: {
    answer(this: any, liked) {
      this.liked = liked;
    },
  },
  mounted(this: any) {
    this['$root'].$on('next', data => {
      if (data=="LIKEDISLIKE"){
        this['$store'].dispatch('createAnswerLikeDislike', { question: this.id, likeID: this.liked});
      }
    });
  }
};
</script>


<style scoped="true" lang="scss">
@import "../../scss/variables"; 
  .options {
    padding: 0;
    display: flex;
    flex-direction: row;
    list-style: none;
    margin-bottom: 2rem;
  }
  input[type="radio"]:checked+label+span {
    color: $primaryColor;
  }
  .like, .dislike {
    text-align: center;
    flex-grow: 1;
    input { display: none; }
    .icon {
      display: block;
      cursor: pointer;
      width: 2.5rem;
      margin-bottom: 0.5rem;
      background-size: contain;
      margin: 0 auto 0.5rem;
      height: 2.5rem;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
</style>