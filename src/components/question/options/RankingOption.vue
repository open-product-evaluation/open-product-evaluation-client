<template>
<div>
<div class="drag">
<b-row class="dragzone d-flex mb-3 mx-2">
    <b-col draggable="true" 
    v-for="(item, index) in allItems" :key="index"
    @dragstart="onDragStart($event, item, index)" 
    @dragend="onDragEnd($event)"
    :class="((question.items.length%2)===0) ? 'col-md-6' : 'col-md-4'"
    cols="6"
    class="p-2"
    >
      <b-card no-body class="h-100 dragCards shadow bg-white">
          <b-card-header>
            <img class="w-100 h-100 imagePrev"  v-if="item.image && item.image.url" v-img :src="`${item.image.url}`">
          </b-card-header>
          <b-card-text>
            {{item.label}}
            </b-card-text>
      </b-card>
    </b-col>
  </b-row>

<b-row class="mx-2">
  <b-col v-for="(item, index) in position" :key="index" class="dragger p-0 mx-2" draggable="true" v-bind="item" @drop.prevent="onDrop(index, $event)"
    @dragover.prevent="onOver(index)" @dragleave.prevent="onDragLeave(index)">
      <b-card no-body class="h-100 dropCards shadow bg-white" v-if="item.label">
          <b-card-header>
            <img class="imageVote w-100 h-100" v-if="item.image && item.image.url" v-img :src="`${item.image.url}`">
          </b-card-header>
          <b-card-text>
            {{item.label}}
            </b-card-text>
      </b-card>
      <p class="h-100 emptyCard" v-if="item.name" :id="'text'+index">{{item.name}}</p>
  </b-col>
  </b-row>

</div>
    <b-row class="mx-2 neutral" align-h="end">
          <input type="checkbox" :checked="selected==null" @click="deselectAll()"/>
          <label> abstain from voting</label>
    </b-row>
    <b-row>
      <b-col cols="6">
        <b-btn variant="primaryBtn" style="min-width: auto" @click="preset">Reset</b-btn>
      </b-col>
    </b-row>
    <b-modal centered 
    ref="warningModal" 
    hide-footer 
    title="Warning">
      <div class="d-block text-center">
        <h3>The answer is incomplete!</h3>
      </div>
    </b-modal>
</div>
</template>

<script lang="ts">
export default {
  name: 'RankingOption',
  props: {
    id: String,
  },
  data() {
    return {
      selected: null,
      answered: false,
      allItems: [],
      dragedItem: {},
      droppedItem: [],
      position: [],
    };
  },
  watch: {
    dragedItem(this: any) {
      this.allItems.reduce((pre, cur) => {
        return pre;
      }, {});
    },
  },
  computed: {
    question(this: any) {
      return this.$store.getters.getQuestion(this.id);
    },
  },
  created(this: any) {
    this.preset();
  },
  methods: {
    preset(this: any) {
      this.position = [];
      for (let i = 0; i < this.question.items.length; i++) {
            this.position.push({
              name: 'Position #' + (i + 1),
            });
      }
      this.allItems = this.question.items.slice();
      this.selected=null;
      return this.position;
    },
    onDragStart(this: any, ev, item, index) {
      ev.dataTransfer.setData('text/plain', null);
      this.dragedItem = {item, index};
    },
    onDragEnd(this: any, ev) {
      this.dragedItem = {};
      this.selected=true;
    },
    onDrop(this: any, index, ev) {
      this.position[index] = this.dragedItem.item;
      this.allItems.splice(this.dragedItem.index, 1);
      let element = document.getElementById('text' + index);
      if (element != null) element.style.backgroundColor = '#ffffff';
    },
    onOver(this: any, index) {
      let element = document.getElementById('text' + index);
      if (element != null) element.style.backgroundColor = '#ffaa66';
    },
    onDragLeave(this: any, index) {
      let element = document.getElementById('text' + index);
      if (element != null) element.style.backgroundColor = '#eef1f5';
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
        this.position.forEach( (element) => {
          favoriteArray.unshift(element.id);
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
      // Check if all positions have an item
      if (this.allItems.length === 0 || this.selected == null) {
        this.sendAnswer();
      } else {
        this.$refs.warningModal.show();
      }
    });
  },
};
</script>

<style scoped="true" lang="scss">
@import "../../../scss/variables"; 
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
.imageVote {
    object-fit: contain;
    }

@media (min-width: 720px) {
.imagePrev
 {
    object-fit: contain;
    }
}
@media (max-width: 720px) {
.imagePrev {
    object-fit: fill;
    }
}
</style>