<template>
<b-row class="header">
    <b-col class="header" cols="3">
        <v-icon class="icon" name="edit" ></v-icon>
        <span class="comp">OPE</span>
        </b-col>
        </b-row>
</template>

<script lang="ts">
export default {
  name: 'Header',
};
</script>
<style scoped lang="scss">
.header {
    background: #637d8d;
    padding: 3px 0;
}
.icon {
    color: #ffaa66;
    height: 30px;
    width: 30px;
}
.comp {
    vertical-align: bottom;
    color: #ffaa66;
}
</style>

