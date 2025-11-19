<template>
  <Transition name="fade">
    <button
      v-if="showButton"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 z-40 p-4 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
      aria-label="Scroll to top"
    >
      <UIcon name="i-heroicons-arrow-up" class="w-6 h-6" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
const showButton = ref(false);

const handleScroll = () => {
  showButton.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}
</style>
