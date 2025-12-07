<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Welcome to Rubarta Admin Panel
      </p>
    </div>

    <div v-if="loading" class="text-center py-12">
      <UIcon
        name="i-heroicons-arrow-path"
        class="w-8 h-8 animate-spin text-green-600"
      />
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Companies
            </h3>
            <UIcon
              name="i-heroicons-building-office"
              class="w-5 h-5 text-green-600"
            />
          </div>
        </template>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ stats.companies }}
        </p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Products
            </h3>
            <UIcon name="i-heroicons-cube" class="w-5 h-5 text-green-600" />
          </div>
        </template>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ stats.products }}
        </p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Portfolio
            </h3>
            <UIcon name="i-heroicons-photo" class="w-5 h-5 text-green-600" />
          </div>
        </template>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ stats.portfolios }}
        </p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Customers
            </h3>
            <UIcon name="i-heroicons-users" class="w-5 h-5 text-green-600" />
          </div>
        </template>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ stats.customers }}
        </p>
      </UCard>
    </div>

    <div class="mt-8">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Quick Actions
          </h3>
        </template>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UButton
            to="/admin/companies"
            color="primary"
            size="lg"
            block
            icon="i-heroicons-building-office"
          >
            Manage Companies
          </UButton>
          <UButton
            to="/"
            color="neutral"
            variant="outline"
            size="lg"
            block
            icon="i-heroicons-eye"
          >
            View Website
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const loading = ref(true);
const stats = ref({
  companies: 0,
  products: 0,
  portfolios: 0,
  customers: 0,
});

onMounted(async () => {
  try {
    const { data } = await useFetch("/api/admin/stats");
    if (data.value) {
      stats.value = data.value;
    }
  } catch (error) {
    console.error("Failed to load stats:", error);
  } finally {
    loading.value = false;
  }
});
</script>
