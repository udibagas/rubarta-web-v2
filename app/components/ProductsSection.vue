<template>
  <section id="products" class="py-20 bg-gray-50 dark:bg-gray-800">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12 animate-on-scroll fade-in-up">
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          Our Services
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Comprehensive solutions tailored to your needs
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <UCard
          v-for="(product, index) in products"
          :key="index"
          class="animate-on-scroll scale-in hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          :class="`stagger-${Math.min(index + 2, 6)}`"
        >
          <template #header>
            <div class="flex items-center space-x-3">
              <div
                class="w-12 h-12 rounded-lg flex items-center justify-center"
                :class="iconBgClass"
              >
                <UIcon
                  name="i-heroicons-check-circle"
                  class="w-6 h-6 text-white"
                />
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                {{ product.name }}
              </h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-300">
            {{ product.description }}
          </p>
        </UCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Product } from "~/composables/useCompanyData";

const props = defineProps<{
  products: Product[];
  primaryColor: string;
}>();

const iconBgClass = computed(() => {
  const colorMap: Record<string, string> = {
    orange: "bg-gradient-to-br from-orange-500 to-amber-600",
    blue: "bg-gradient-to-br from-blue-500 to-indigo-700",
    green: "bg-gradient-to-br from-green-600 to-emerald-500",
  };
  return (
    colorMap[props.primaryColor] ||
    "bg-gradient-to-br from-green-600 to-emerald-500"
  );
});

const { observeElements } = useScrollAnimation();

onMounted(() => {
  observeElements();
});
</script>
