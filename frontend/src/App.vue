<script setup>
import InternetAccountList from '@/components/InternetAccountList.vue'
import InternetAccountToolbar from '@/components/InternetAccountToolbar.vue'
</script>

<template>
  <n-notification-provider>
    <main>
      <n-flex>
        <InternetAccountToolbar/>
        <InternetAccountList/>
      </n-flex>
    </main>
  </n-notification-provider>
</template>

<style scoped>
main {
  padding: 10vh 10vw;
}
</style>