<template>
  <div>
    <h2>QuestionItem</h2>
    <div>
      <choice></choice>
      <ranking></ranking>
      <favorite></favorite>
      <regulator></regulator>
      <like></like>
      <likeDislike></likeDislike>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ChoiceOptions from '@/components/question/ChoiceOption.vue';
import RankingOptions from '@/components/question/RankingOption.vue';
import FavoriteOptions from '@/components/question/FavoriteOption.vue';
import RegulatorOptions from '@/components/question/RegulatorOption.vue';
import LikeOptions from '@/components/question/LikeOption.vue';
import LikeDislikeOptions from '@/components/question/LikeDislikeOption.vue';

@Component({
  components: {
    choice: ChoiceOptions,
    ranking: RankingOptions,
    favorite: FavoriteOptions,
    regulator: RegulatorOptions,
    like: LikeOptions,
    likeDislike: LikeDislikeOptions,
    },
})

export default class QuestionItem extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>