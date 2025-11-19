<template>
  <section id="customers" class="py-20 bg-gray-50 dark:bg-gray-800">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12 animate-on-scroll fade-in-up">
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          Our Customers
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Trusted by leading companies across Indonesia
        </p>
      </div>

      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
      >
        <UCard
          v-for="(customer, index) in customers"
          :key="index"
          class="animate-on-scroll fade-in flex items-center justify-center p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          :class="`stagger-${Math.min((index % 6) + 1, 6)}`"
        >
          <p class="text-center font-semibold text-gray-700 dark:text-gray-300">
            {{ customer.name }}
          </p>
        </UCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Customer } from "~/composables/useCompanyData";

const props = defineProps<{
  customers: Customer[];
}>();

const { observeElements } = useScrollAnimation();

onMounted(() => {
  observeElements();
});
</script>
