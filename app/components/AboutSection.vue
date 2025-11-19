<template>
  <section id="about" class="py-20 bg-white dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h2
          class="animate-on-scroll fade-in-up text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          {{ about.title }}
        </h2>

        <div
          class="animate-on-scroll fade-in-up stagger-2 prose prose-lg dark:prose-invert max-w-none mb-12"
        >
          <p
            class="text-xl text-gray-700 dark:text-gray-300 text-center leading-relaxed"
          >
            {{ about.description }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mt-12">
          <UCard
            class="animate-on-scroll slide-in-left stagger-3 hover:shadow-xl transition-all duration-300"
          >
            <template #header>
              <div class="flex items-center space-x-3">
                <UIcon
                  name="i-heroicons-rocket-launch"
                  class="w-8 h-8 text-green-600"
                />
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                  Our Mission
                </h3>
              </div>
            </template>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              {{ about.mission }}
            </p>
          </UCard>

          <UCard
            class="animate-on-scroll slide-in-right stagger-4 hover:shadow-xl transition-all duration-300"
          >
            <template #header>
              <div class="flex items-center space-x-3">
                <UIcon name="i-heroicons-eye" class="w-8 h-8 text-green-600" />
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                  Our Vision
                </h3>
              </div>
            </template>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              {{ about.vision }}
            </p>
          </UCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
  };
}>();

const { observeElements } = useScrollAnimation();

onMounted(() => {
  observeElements();
});
</script>
