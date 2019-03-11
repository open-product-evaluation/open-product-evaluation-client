<template>
<div>
  <ol class="options">
    <li class="like">
      <div v-if="question.likeIcon && question.likeIcon.url">
        <input type="radio"
              :id="`like-${question.id}`"
              :name="`likedislike-${question.id}`"
              :checked="liked==true"
              @click="updateValue(true)" />
        <label class="icon"
              :for="`like-${question.id}`"
              :style="{backgroundImage: `url(${question.likeIcon.url})`}">
        </label>
        <span class="label">
        Like
      </span>
      </div>
      <div v-if="!question.likeIcon">
        <label class="like-checkbox">
            <input type="checkbox"
                :id="`like-${question.id}`"
                :name="`likedislike-${question.id}`"
                :checked="liked==true"
                @click="updateValue(true)"/>
            <v-icon class="icon" name="thumbs-up" ></v-icon>
            <span class="label">
        Like
      </span>
            </label>
      </div>
    </li>
    <li class="dislike">
      <div v-if="question.dislikeIcon && question.dislikeIcon.url">>
        <input type="radio"
              :id="`dislike-${question.id}`"
              :name="`likedislike-${question.id}`" 
              :checked="liked==false"
              @click="updateValue(false)"/>
        <label class="icon"
              :for="`dislike-${question.id}`"
              :style="{backgroundImage: `url(${question.dislikeIcon.url})`}">
        </label>
        <span class="label">
        Dislike
      </span>
      </div>
      <div v-if="!question.dislikeIcon">
          <label class="dislike-checkbox">
            <input type="checkbox"
                :id="`dislike-${question.id}`"
                :name="`likedislike-${question.id}`"
                :checked="liked==false"
                @click="updateValue(false)"/>
            <v-icon class="icon" name="thumbs-down" ></v-icon>
            <span class="label">
        Dislike
      </span>
            </label>
        </div>
      
    </li>
  </ol>
  <b-row>
    <b-col cols="6">
      <div class ="text-center">
        <input type="checkbox" @click="deselectAll()" :checked="liked==null"/>
        <label> Abstain from voting</label>
      </div>
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
      liked: null,
      answered: false,
    };
  },
  computed: {
    question(this: any) {
      return this.$store.getters.getQuestion(this.id);
    },
  },
  methods: {
    updateValue(this: any, liked) {
      this.liked = liked;
    },
    deselectAll(this: any) {
      this.liked = null;
    },
    sendAnswer(this: any) {
      this.$store.dispatch('createAnswerLikeDislike', { question: this.id, likeID: this.liked});
      this.answered = true;
      this.$root.$emit('answered');
    },
  },
  beforeDestroy(this: any) {
    this.$eventBus.$off();
  },
  mounted(this: any) {
    this.$eventBus.$on('answer', (data) => {
      this.sendAnswer();
    });
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
  .like-checkbox input[type="checkbox"], .dislike-checkbox input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"]:checked ~ .icon, input[type="checkbox"]:hover ~ .icon
  {
      color: $primaryColor;
  }

  input[type="checkbox"]:checked ~ .label, input[type="checkbox"]:hover ~ .label
  {
      color: $primaryColor;
  }
  .like, .dislike {
    text-align: center;
    flex-grow: 1;
    font-size: 1.25rem;
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
      color: $secondaryBackgroundColor;
    }
  }
</style>