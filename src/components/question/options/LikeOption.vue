<template>
  <div>
    <ol class="options">
      <li class="like">
        <div v-if="question.likeIcon && question.likeIcon.url">
          <input type="checkbox"
                :id="`like-${question.id}`"
                :name="`like-${question.id}`" 
                @click="answer(true)"/>
          <label class="icon"
                :for="`like-${question.id}`"
                v-if="question.likeIcon && question.likeIcon.url"
                :style="{backgroundImage: `url(${question.likeIcon.url})`}">
          </label>
        </div>
        <div v-if="!question.likeIcon">
          <input type="checkbox" class="icon"
                :id="`like-${question.id}`"
                :name="`like-${question.id}`"
                @click="answer(true)"/>
          </label>
        </div>
        <span class="label">
          Like
        </span>
      </li>
    </ol>
    <b-row>
      <b-col cols="6">
        <div class ="neutral text-center">
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
  name: 'LikeOption',
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
      this.$store.dispatch('createAnswerLike', { question: this.id, likeID: this.liked});
      this.answered = true;
      this.$root.$emit('answered');
    }
  },
};
</script>

<style scoped="true" lang="scss">
@import "../../../scss/variables"; 
  .options {
    list-style: none;
    padding: 0;
  }
  input[type="checkbox"]:checked+label+span {
    color: $primaryColor;
  }
  .like {
    font-size: 1.5rem;
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