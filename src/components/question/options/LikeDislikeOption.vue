<template>
<div>
  <ol class="options">
    <li class="like">
      <div v-if="question.likeIcon && question.likeIcon.url">
        <input type="radio"
              :id="`like-${question.id}`"
              :name="`likedislike-${question.id}`"
              @click="answer(true)" />
        <label class="icon"
              :for="`like-${question.id}`"
              :style="{backgroundImage: `url(${question.likeIcon.url})`}">
        </label>
      </div>
      <div v-if="!question.likeIcon">
        <input type="radio" 
             class="icon"
             :id="`like-${question.id}`"
             :name="`likedislike-${question.id}`"
             @click="answer(true)" />
      </div>
      <span class="label">
        Like
      </span>
    </li>
    <li class="dislike">
      <div v-if="question.dislikeIcon && question.dislikeIcon.url">>
        <input type="radio"
              :id="`dislike-${question.id}`"
              :name="`likedislike-${question.id}`" 
              @click="answer(false)"/>
        <label class="icon"
              :for="`dislike-${question.id}`"
              :style="{backgroundImage: `url(${question.dislikeIcon.url})`}">
        </label>
      </div>
      <div v-if="!question.dislikeIcon">
        <input type="radio"
              class="icon"
             :id="`dislike-${question.id}`"
             :name="`likedislike-${question.id}`"
             @click="answer(false)" />
        </div>
      <span class="label">
        Dislike
      </span>
    </li>
  </ol>
  <b-row>
    <b-col cols="6">
      <div class ="text-center">
        <input type="checkbox"/>
        <label>enthalten</label>
      </div>
    </b-col>
    <b-col cols="6" class="text-center" v-if="!answered">
      <b-button variant="primary" @click="sendAnswer()">ANTWORTEN</b-button>
    </b-col>
  </b-row>
</div>
</template>

<script lang="ts">
export default {
  name: 'LikeDislikeOption',
  props: {
    id: String,
  },
  data() {
    return {
      liked: '',
      answered: false,
    };
  },
  computed: {
    question(this: any) {
      return this.$store.getters.getQuestion(this.id);
    },
  },
  methods: {
    answer(this: any, liked) {
      this.liked = liked;
    },
    sendAnswer(this: any) {
      this.$store.dispatch('createAnswerLikeDislike', { question: this.id, likeID: this.liked});
      this.answered = true;
      this.$root.$emit('answered');
    },
  },
};
</script>


<style scoped="true" lang="scss">
@import "../../../scss/variables"; 
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
    font-size: 1.5rem;
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