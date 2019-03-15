<template>
<div>
<div class="drag">
<!--
  <draggable v-model="question.items"
             @start="drag = true"
             @end="drag = false"
             class="d-flex">
    <div :class="((question.items.length%2)===0) ? 'col-md-6' : 'col-md-4'"
          v-for="(item) in question.items" 
          :key="item.id">
      <b-card no-body class="shadow bg-white">
          <b-card-header>
            <img style="max-width: 100%;"  v-if="item.image && item.image.url" v-img :src="`${item.image.url}`">
          </b-card-header>
          <b-card-text>
            {{item.label}}
            </b-card-text>
      </b-card>
    </div>
  </draggable>

<div class="d-flex">
  <div :class="((question.items.length%2)===0) ? 'col-md-6' : 'col-md-4'"
          v-for="(item, index) in question.items" 
          :key="item.id"
          class="p-0">
      <p>Platz {{index + 1}}</p> 
  </div>
  </div>
-->
<b-row class="dragzone d-flex mb-3">
    <b-col draggable="true" 
    v-for="(item, index) in question.items" :key="index"
    @dragstart="onDragStart($event, item, index)" 
    @dragend="onDragEnd($event)"
    >
      <b-card no-body class="h-100 dragCards shadow bg-white">
          <b-card-header>
            <img class="w-100 h-100"  v-if="item.image && item.image.url" v-img :src="`${item.image.url}`">
          </b-card-header>
          <b-card-text>
            {{item.label}}
            </b-card-text>
      </b-card>
    </b-col>
  </b-row>

<b-row>
  <b-col v-for="(item, index) in position" :key="index" class="dragger p-0" draggable="true" v-bind="item" @drop.prevent="onDrop(index, $event)"
    @dragover.prevent="onOver(index)" @dragleave.prevent="onDragLeave(index)">
      <b-card no-body class="h-100 dropCards shadow bg-white" v-if="item.label">
          <b-card-header>
            <img class="w-100 h-100"  v-if="item.image && item.image.url" v-img :src="`${item.image.url}`">
          </b-card-header>
          <b-card-text>
            {{item.label}}
            </b-card-text>
      </b-card>
      <p class="h-100 emptyCard" v-if="item.name" :id="'text'+index">{{item.name}}</p>
  </b-col>
  </b-row>

</div>
    <b-row>
      <b-col cols="6">
        <div class ="text-center">
          <input type="checkbox" @click="deselectAll()"/>
          <label> Abstain from voting</label>
        </div>
      </b-col>
    </b-row>
</div>
</template>

<script lang="ts">
import draggable from 'vuedraggable';

export default {
  name: 'RankingOption',
  components: {
    draggable,
  },
  props: {
    id: String,
  },
  data() {
    return {
      selected: true,
      answered: false,
      dragedItem: {},
      droppedItem: [],
      position: [],
    };
  },
  watch: {
    dragedItem(this: any) {
      this.question.items.reduce((pre, cur) => {
        return pre
      }, {})
    }
  },
  computed: {
    question(this: any) {
      return this.$store.getters.getQuestion(this.id);
    },
  },
  created(this: any) {
      for (let i=0; i<this.question.items.length; i++) {
            this.position.push({
              'name': 'Position #'+ i,
            })
      }
      return this.position; 
  },
  methods: {
    onDragStart: function (ev, item, index) {
      ev.dataTransfer.setData('text/plain',null);
      this.dragedItem = {item, index}
    },
    onDragEnd: function (this: any, ev) {
      this.dragedItem = {}
    },
    onDrop: function (this: any, index, ev) {
      this.position[index] = this.dragedItem.item;
      this.question.items.splice(this.dragedItem.index, 1);
      let element= document.getElementById('text'+index);
      element!=null ? element.style.backgroundColor="#ffffff" : null;
    },
    onOver: function (this: any, index) {
      let element= document.getElementById('text'+index);
      element!=null ? element.style.backgroundColor="#ffaa66" : null;
    },
    onDragLeave: function (this: any, index) {
      let element= document.getElementById('text'+index);
      element!=null ? element.style.backgroundColor="#eef1f5" : null;
    },
    deselectAll(this: any) {
      this.selected = null;
    },
    getAnswers(this: any) {
      if (this.selected === null ) {
        return null;
      } else {
        // Build array for rankingItems
        // [1,...,n] -> n is best
        const favoriteArray: string[] = [];
        this.question.items.forEach( (element) => {
          favoriteArray.push(element.id);
        });
        return favoriteArray;
      }

    },
    sendAnswer(this: any) {
      this.$store.dispatch('createAnswerRanking', { question: this.id, rankingID: this.getAnswers() });
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
  .rankingLabel {
    display: flex;
    justify-content: center;
    font-size: 2rem;
  }
  .dragCards .card-header {
    padding: 0;
    height: 20vh;
  }
  .dropCards .card-header {
    padding: 0;
    height: 10vh;
  }

  .dragzone {
  display:flex;
  flex-direction: row;
}

.dragger {
  text-align: center;
  border: 1px dashed gray;
  height: 15vh;
  width: 15vh;
  display: table;
}
.emptyCard {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  background: $backgroundColor;
}
</style>