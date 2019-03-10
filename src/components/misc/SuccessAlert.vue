<template>
  <b-alert :show="show"
           dismissible
           variant="success">
    {{ message }}
  </b-alert>
</template>

<script>
export default {
  name: 'SuccessAlert',
  props: {
    show: {
      type: Boolean,
      required: true,
      default: true,
    },
    message: {
      type: String,
      required: false,
      default: 'Form submission successful',
    }
  },
}
</script>
