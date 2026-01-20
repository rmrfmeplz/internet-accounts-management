<script setup>
import InternetAccountList from '@/components/InternetAccountList.vue'
import InternetAccountToolbar from '@/components/InternetAccountToolbar.vue'
</script>

<template>
  <n-notification-provider>
    <main>
      <InternetAccountToolbar/>
      <InternetAccountList/>
    </main>
  </n-notification-provider>
</template>

<style scoped>
main {
  padding: 10vh 10vw;
}
</style>