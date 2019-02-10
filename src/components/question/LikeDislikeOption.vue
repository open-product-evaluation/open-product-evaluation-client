<template>
  <ol class="options">
    <li class="like">
      <input type="radio"
             :id="`like-${question.id}`"
             :name="`likedislike-${question.id}`" />
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
             :name="`likedislike-${question.id}`" />
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
  computed: {
    question(this: any) {
      return JSON.parse(JSON.stringify(this['$store'].getters.getQuestion(this.id)))
    },
  },
}
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