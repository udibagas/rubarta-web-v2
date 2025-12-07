<template>
  <div
    class="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4"
  >
    <div class="max-w-6xl w-full">
      <div class="text-center mb-12 animate-on-scroll fade-in-up">
        <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Rubarta Group
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Select a company to explore our services
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Rubarta Prima Abadi Card -->
        <UCard
          class="animate-on-scroll scale-in stagger-2 hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-105"
          @click="navigateTo('/rubarta-prima-abadi')"
        >
          <template #header>
            <div
              class="flex flex-col items-center justify-center h-48 bg-linear-to-br from-green-600 to-emerald-500 space-y-4"
            >
              <img src="/logo.png" alt="Rubarta Logo" class="h-20 w-20" />
              <UIcon name="i-heroicons-truck" class="w-16 h-16 text-white" />
            </div>
          </template>

          <div class="p-6">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Rubarta Prima Abadi
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Heavy Equipment Provider
            </p>
            <p class="text-gray-500 dark:text-gray-400 mb-6">
              Leading provider of heavy equipment solutions for construction,
              mining, and industrial projects.
            </p>
            <UButton
              color="success"
              size="lg"
              block
              trailing-icon="i-heroicons-arrow-right"
              class="bg-green-600 hover:bg-green-700"
            >
              Explore Services
            </UButton>
          </div>
        </UCard>

        <!-- Rubarta Logistic Indonesia Card -->
        <UCard
          class="animate-on-scroll scale-in stagger-4 hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-105"
          @click="navigateTo('/rubarta-logistic-indonesia')"
        >
          <template #header>
            <div
              class="flex flex-col items-center justify-center h-48 bg-linear-to-br from-emerald-600 to-green-500 space-y-4"
            >
              <img src="/logo.png" alt="Rubarta Logo" class="h-20 w-20" />
              <UIcon name="i-heroicons-cube" class="w-16 h-16 text-white" />
            </div>
          </template>

          <div class="p-6">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Rubarta Logistic Indonesia
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Supply Chain Solution
            </p>
            <p class="text-gray-500 dark:text-gray-400 mb-6">
              Comprehensive supply chain and logistics solutions for businesses
              of all sizes.
            </p>
            <UButton
              color="success"
              size="lg"
              block
              trailing-icon="i-heroicons-arrow-right"
              class="bg-emerald-600 hover:bg-emerald-700"
            >
              Explore Services
            </UButton>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: companies } = await useFetch("/api/companies");

const { observeElements } = useScrollAnimation();

onMounted(() => {
  observeElements();
});
</script>
