<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="py-1 pl-2">
    <b-navbar-brand @click="goHome()">
        <v-icon class="icon logo" name="edit"></v-icon>
            <span class="comp logo">OPE</span>
    </b-navbar-brand>
    <b-navbar-nav>
        <b-nav-item @click="goHome()">Home</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
<b-modal centered 
    ref="warningModal"
    title="Warning"
    @ok="changeRouteHome()">
      <div class="d-block text-center">
        <h4>The survey is stopped.</h4>
        <h4>{{message}}</h4>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Header',
  data() {
      return {
          message: '',
      };
  },
  methods: {
      goHome(this: any) {
          // Open Modal if User answers a survey
          if (this.$route.name === 'question' || this.$route.name === 'join') {
            this.message = 'Your votes will not be saved!';
            this.$refs.warningModal.show();
          } else if (this.$route.name === 'master') {
            this.message = 'Are you sure you want to quit?';
            this.$refs.warningModal.show();
          }
      },
      hideModal(this: any) {
          this.$refs.warningModal.hide();
      },
      changeRouteHome(this: any) {
          this.$refs.warningModal.hide();
          this.$router.replace('/');
      },
  },
};
</script>
<style scoped lang="scss">
.bg-info {
    background: #637d8d !important ;
}
.logo {
    cursor: pointer;
}
.icon {
    color: #ffaa66;
    height: 30px;
    width: 30px;
}
.comp {
    color: #ffaa66;
}
</style>

