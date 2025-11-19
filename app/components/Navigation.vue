<template>
  <header
    class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
  >
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <img v-if="logo" :src="logo" alt="Rubarta Logo" class="h-10 w-10" />
            <span class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ companyName }}
            </span>
          </NuxtLink>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="item in menuItems"
            :key="item.id"
            @click.prevent="scrollToSection(item.id)"
            class="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 cursor-pointer font-medium"
          >
            {{ item.label }}
          </a>
          <NuxtLink to="/">
            <UButton color="neutral" variant="ghost"> Change Company </UButton>
          </NuxtLink>
        </div>

        <div class="md:hidden">
          <UButton
            icon="i-heroicons-bars-3"
            color="neutral"
            variant="ghost"
            @click="mobileMenuOpen = !mobileMenuOpen"
          />
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 pb-4 space-y-2">
        <a
          v-for="item in menuItems"
          :key="item.id"
          @click.prevent="scrollToSection(item.id)"
          class="block py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 cursor-pointer font-medium"
        >
          {{ item.label }}
        </a>
        <NuxtLink to="/" class="block py-2">
          <UButton color="neutral" variant="ghost" block>
            Change Company
          </UButton>
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  companyName: string;
  logo?: string;
}>();

const mobileMenuOpen = ref(false);

const menuItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "products", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "customers", label: "Customers" },
  { id: "contact", label: "Contact" },
];

const scrollToSection = (id: string) => {
  mobileMenuOpen.value = false;
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
</script>
