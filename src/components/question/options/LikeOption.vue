<template>
  <div>
    <ol class="options">
      <li class="like">
        <div v-if="question.likeIcon && question.likeIcon.url">
          <input type="checkbox"
                :id="`like-${question.id}`"
                :name="`like-${question.id}`" 
                :checked="liked==true"
                @click="updateValue(true)"/>
          <label class="icon"
                :for="`like-${question.id}`"
                :style="{backgroundImage: `url(${question.likeIcon.url})`}">
          </label>
        </div>
        <div v-if="!question.likeIcon">
          <label class="like-checkbox">
            <input type="checkbox"
                :id="`like-${question.id}`"
                :name="`like-${question.id}`"
                :checked="liked==true"
                @click="updateValue(true)"/>
            <v-icon class="icon" name="thumbs-up" ></v-icon>
            </label>
        </div>
        <span class="label">
          Like
        </span>
      </li>
    </ol>
    <b-row>
      <b-col cols="6">
        <div class ="text-center">
          <input type="checkbox" @click="deselectAll()" :checked="liked==null"/>
          <label>keine Angabe</label>
        </div>
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
      this.liked === true ? this.liked = false : this.liked = true;
    },
    deselectAll(this: any) {
      this.liked = null;
    },
    sendAnswer(this: any) {
      this.$store.dispatch('createAnswerLike', { question: this.id, likeID: this.liked});
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
    list-style: none;
    padding: 0;
  }
  input[type="checkbox"]:checked+label+span {
    color: $primaryColor;
  }
.like-checkbox input[type="checkbox"]{
    display: none;
}
.like-checkbox input[type="checkbox"]:checked ~ .icon, .like-checkbox input[type="checkbox"]:hover ~ .icon
{
    color: $primaryColor;
}
  .like {
    font-size: 1.25rem;
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
      color: $secondaryBackgroundColor;
    }
  }
</style>