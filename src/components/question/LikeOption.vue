<template>
  <ol class="options">
    <li class="like">
      <input type="checkbox"
             :id="`like-${question.id}`"
             :name="`like-${question.id}`" />
      <label class="icon"
             :for="`like-${question.id}`"
             :style="{backgroundImage: `url(${question.likeIcon.url})`}">
      </label>
      <span class="label">
        Like
      </span>
    </li>
  </ol>
</template>

<script lang="ts">
export default {
  name: 'LikeOption',
  props: {
    id: String,
  },
  computed: {
    question() {
      return JSON.parse(JSON.stringify(this.$store.getters.getQuestion(this.id)))
    },
  },
}
</script>

<style scoped="true" lang="scss">
@import "../../scss/variables"; 
  .options {
    list-style: none;
    padding: 0;
  }
  input[type="checkbox"]:checked+label+span {
    color: $primaryColor;
  }
  .like {
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