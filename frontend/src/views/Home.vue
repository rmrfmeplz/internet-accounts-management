<script setup>
import InternetAccountList from '@/components/InternetAccountList.vue'
import InternetAccountToolbar from '@/components/InternetAccountToolbar/index.vue'
</script>


<template>
  <main>
    <n-flex>
      <InternetAccountToolbar/>
      <InternetAccountList/>
    </n-flex>
  </main>
</template>


<style scoped>
main {
  padding: 10vh 10vw;
}
</style>