<template>
  <h1>Pokemon: #{{ id }}</h1>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {};
  },

  created() {
    const { id } = this.$route.params;
    console.log(id);
    this.id = id;
  },
};
</script>