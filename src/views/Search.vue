<template>
  <div id="search">
   
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true
  }),
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 3000)
  }
}
</script>

<style></style>
