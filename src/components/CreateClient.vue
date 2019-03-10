<template>
  <div class="login login--is-centered">
    <b-form class="login__content"
            @submit="login">
      <b-card footer-tag="footer">
        <!-- form title -->
        <h1 class="login__title">
          Create Client
        </h1>

        <!-- alert -->
        <alert :data="error" />

        <!-- email input -->
        <b-form-group label="Owner Email"
                      label-for="input_email">
          <b-form-input id="input_email"
                        v-model.trim="$v.email.$model"
                        :state="state($v.email.$dirty, $v.email.$error)" />

          <b-form-invalid-feedback v-if="!$v.email.required">
            Owner Email is required
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- password input -->
        <b-form-group label="Name"
                      label-for="input_name">
          <b-form-input id="input_name"
                        v-model.trim="$v.name.$model"
                        type="text"
                        :state="state($v.name.$dirty, $v.name.$error)" />

          <b-form-invalid-feedback v-if="!$v.name.required">
            Name is required
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- form submit -->
        <b-button id="login"
                  type="submit"      
                  class="primaryBtn"
                  :block="true">
          Create Client
        </b-button>

        <!-- Card Footer -->
        <div slot="footer"
             class="login__footer">
          Client already exists?
          <router-link :to="{ path: 'login' }">
            Login!
          </router-link>
        </div>
      </b-card>
    </b-form>
  </div>
</template>

<script>
import Alert from '@/components/misc/ErrorAlert.vue';
import { required, alphaNum } from 'vuelidate/lib/validators';
import validationState from '@/mixins/validation';
export default {
  name: 'CreateClient',
  components: {
    alert: Alert,
  },
  mixins: [validationState],
  data() {
    return {
      email: '',
      name: '',
      error: null,
    };
  },
  validations: {
    email: {
      required,
    },
    name: {
      required,
      alphaNum,
    },
  },
  methods: {
    login(event) {
      event.preventDefault();
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch('createPermanentClient', ({ name: this.name, clientOwner: this.email}))
        .then(() => {
          this.$router.push('/');
        }).catch((error) => {
          this.error = error;
        });
      }
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
@import "../scss/variables"; 
  .login {
    display: flex;
    &.login--is-centered {
      align-items: center;
      justify-content: center;
      height: 95vh;
      margin-top: auto;
    }
    .login__content {
      width: 100%;
      max-width: 400px;
      padding: 0 15px;
      margin: 0px auto;
    }
    .login__title {
      font-size: 22px;
      text-align: center;
    }
    .login__footer {
      text-align: center;
      a {
        color: $secondaryBackgroundColor
      }
      a:hover {
        color: $primaryColor
      }
    }
  }
</style>