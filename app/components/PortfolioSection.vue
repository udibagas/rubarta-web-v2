<template>
  <section id="portfolio" class="py-20 bg-white dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12 animate-on-scroll fade-in-up">
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          Our Portfolio
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Successful projects and satisfied clients
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <UCard
          v-for="(item, index) in portfolio"
          :key="index"
          class="animate-on-scroll scale-in hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          :class="`stagger-${Math.min(index + 2, 6)}`"
        >
          <template #header>
            <div class="space-y-2">
              <UBadge :color="primaryColor" variant="subtle">
                {{ item.category }}
              </UBadge>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ item.title }}
              </h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-300">
            {{ item.description }}
          </p>
        </UCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PortfolioItem } from "~/composables/useCompanyData";

const props = defineProps<{
  portfolio: PortfolioItem[];
  primaryColor: string;
}>();

const { observeElements } = useScrollAnimation();

onMounted(() => {
  observeElements();
});
</script>
