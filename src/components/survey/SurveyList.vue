<template>
  <div class="surveycards">
    <div class="header">
      <p> OPE </p>
      <h2> Umfragen </h2>
      <h5> Suche dir eine Umfrage aus oder Suche hier: </h5>
    </div>

    <!--
<b-carousel id="carouselCards"
      controls
      indicators
      img-width="1024"
      img-height="480"
      :interval="0"
      v-model="pageIndex"
    >
      <b-carousel-slide img-blank v-for="page in pageAll" :key="page">
        <b-card-group deck>
          <b-card no-body v-for="survey in currentPageSurveys" :key="survey.id" >
            <b-card-header v-if="survey.activeSurvey.previewImage && survey.activeSurvey.previewImage.url">
             <img v-img width="100%"/>
            </b-card-header>
          <b-card-body style="color: #333333">
            <b-card-title> {{survey.activeSurvey.title}} </b-card-title>
            <b-card-text> {{survey.activeSurvey.description}} </b-card-text>
            <b-button @click="startSurvey(survey.id)">Starten</b-button>
          </b-card-body>
        </b-card>
      </b-card-group>
      </b-carousel-slide>
    </b-carousel>
    <p class="mt-4">
      Slide #: {{ pageIndex }}<br />
      Sliding: {{ pageAll }}
    </p>

-->

    <b-row align-v="center">
      <b-col cols="1" align-self="center">
        <label v-if="pages > 1">
            <input type="button"
                @click="goto(-1)"/>
            <v-icon variant="primary" class="icon" name="angle-left" ></v-icon>
            </label>
        </b-col>

      <b-col cols="10" align-self="center">
        <transition :name="animation" >
          <b-card-group deck :key="pageIndex" :style="{display: dis}">
            <b-card no-body v-for="survey in currentPageSurveys" :key="survey.id">
            <b-card-header v-if="survey.activeSurvey.previewImage && survey.activeSurvey.previewImage.url">
              <img v-img width="100%"/>
            </b-card-header>
            <b-card-body>
              <b-card-title> {{survey.activeSurvey.title}} </b-card-title>
              <b-card-text> {{survey.activeSurvey.description}} </b-card-text>
              <b-button @click="startSurvey(survey.id)">Starten</b-button>
            </b-card-body>
            </b-card>
          </b-card-group>
        </transition>
        
        
      <div class="card-pagination" v-if="pages > 1">
      <div
        class="page-index"
        v-for="i in pages"
        :key="i"
        :class="{ active: (i - 1 === pageIndex)} "
      ></div>
      
    </div>
        </b-col>
      <b-col cols="1" align-self="center">
        <label v-if="pages > 1">
            <input type="button"
                @click="goto(1)"/>
            <v-icon variant="primary" class="icon" name="angle-right" ></v-icon>
            </label>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export default {
  name: 'SurveyEdit',
  data() {
    return {
      splittedSurveys: [],
      pages: 0,
      maxCards: 2,
      pageIndex: 0,
      animation: null,
    }
  },
  created(this: any) {
      this.$store.dispatch('getSurveys').then((result) => {
        // received Surveys
      },
      (error) => {
        // console.log(error.message);
        // Authorization failed
      });
  },
  computed: {
    surveys(this: any) {
      return this.$store.getters.getSurveys;
    },
    currentPageSurveys(this: any) {
      this.createPages();
      return this.splittedSurveys[this.pageIndex];
    },
    /*pageAll(this: any) {
      this.createPages();
      return this.pages;
    },*/
  },
  methods: {
    // Update Client
    startSurvey(this: any, domainID) {
      const client = localStorage.getItem('client');
      this.$store.dispatch('updateClient', {
        id: client,
        domainId: domainID,
      });
      this.$router.push({name: 'question', params: {cID: domainID}});
    },
    createPages(this: any) {
      // Count all Pages
      this.pages = 0;
      for (let i = 0; i < this.surveys.length; i = i + this.maxCards) {
        // Seperate Pages
        this.splittedSurveys[this.pages] = this.surveys.slice(i,i + this.maxCards);
        this.pages++;
      }
    },
    goto(this: any, value){
      value > 0 ? this.animation="next" : this.animation="prev";
        if (this.pageIndex + value < 0 ) {
          this.pageIndex = this.pages - 1;
        }
        else if (this.pageIndex + value >= this.pages) {
          this.pageIndex = 0;
        }
        else {
          this.pageIndex += value;
        }
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../scss/variables"; 

h3 {
  margin: 40px 0 0;
}
.card-deck {
  margin: 0 15px;
}
.header {
  margin: 3rem 0;
}
.card-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}
.page-index {
  margin-left: 10px;
  width: 50px;
  height: 3px;
  background: #aaaaaa;
}
.page-index.active {
  background: $primaryColor;
  width: 55px;
  height: 4px;
}
.icon {
  width: 55px;
  height: 55px;
  color: #aaaaaa;
}
input[type="button"] {
  display: none;
}
.icon:hover {
  color: $primaryColor;
  width: 60px;
  height: 60px;
}
.card-header {
  padding: 0;
}
#carouselCards {
   background: #aaaaaa;
}

.next-leave-to, .prev-leave-to {
  transform: translateX(-20px);
  transition: all .7s;
  opacity: 0;
}
.prev-leave-to {
  transform: translateX(20px);
  transition: all .7s;
  opacity: 0;
}
.next-enter-active{
  transition: all .5s ease;
  transition-delay: .6s;
}
.prev-enter-active{
  transition: all .5s ease;
  transition-delay: .6s;
}
.next-enter {
  transform: translateX(10px);
  opacity: 0;
}
.prev-enter {
  transform: translateX(-10px);
  opacity: 0;
}

</style>
