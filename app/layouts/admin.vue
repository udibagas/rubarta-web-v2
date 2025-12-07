<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Top Navigation -->
    <header class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <!-- Left: Logo & Brand -->
          <div class="flex items-center gap-4">
            <UButton
              icon="i-heroicons-bars-3"
              color="neutral"
              variant="ghost"
              class="lg:hidden"
              @click="mobileMenuOpen = !mobileMenuOpen"
            />
            <NuxtLink to="/admin" class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-500 rounded-lg flex items-center justify-center"
              >
                <UIcon
                  name="i-heroicons-building-office-2"
                  class="w-6 h-6 text-white"
                />
              </div>
              <div class="hidden sm:block">
                <h1 class="text-lg font-bold text-gray-900 dark:text-white">
                  Rubarta
                </h1>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Admin Panel
                </p>
              </div>
            </NuxtLink>
          </div>

          <!-- Right: Actions -->
          <div class="flex items-center gap-3">
            <UButton
              icon="i-heroicons-eye"
              color="neutral"
              variant="ghost"
              label="View Site"
              to="/"
              class="hidden sm:flex"
            />
            <ColorModeButton />
          </div>
        </div>
      </div>
    </header>

    <div class="flex h-[calc(100vh-4rem)]">
      <!-- Sidebar Navigation -->
      <aside
        class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0"
        :class="
          mobileMenuOpen
            ? 'translate-x-0 fixed inset-y-16 z-40'
            : '-translate-x-full lg:relative'
        "
      >
        <nav class="p-4 space-y-1">
          <!-- Dashboard -->
          <NuxtLink
            to="/admin"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            :class="
              isActive('/admin')
                ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            "
            @click="mobileMenuOpen = false"
          >
            <UIcon name="i-heroicons-home" class="w-5 h-5" />
            Dashboard
          </NuxtLink>

          <!-- Companies -->
          <NuxtLink
            to="/admin/companies"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            :class="
              isActive('/admin/companies')
                ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            "
            @click="mobileMenuOpen = false"
          >
            <UIcon name="i-heroicons-building-office" class="w-5 h-5" />
            Companies
          </NuxtLink>

          <div class="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
            <p
              class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
            >
              Quick Links
            </p>

            <NuxtLink
              to="/"
              class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              @click="mobileMenuOpen = false"
            >
              <UIcon
                name="i-heroicons-arrow-top-right-on-square"
                class="w-5 h-5"
              />
              Visit Website
            </NuxtLink>

            <button
              @click="handleLogout"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <UIcon
                name="i-heroicons-arrow-right-on-rectangle"
                class="w-5 h-5"
              />
              Logout
            </button>
          </div>
        </nav>

        <!-- Footer -->
        <div
          class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <div v-if="user" class="mb-2 px-2">
            <p class="text-xs font-medium text-gray-700 dark:text-gray-300">
              {{ user.name }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ user.email }}
            </p>
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 text-center">
            <p>&copy; 2025 Rubarta</p>
            <p class="mt-1">Content Management System</p>
          </div>
        </div>
      </aside>

      <!-- Mobile Menu Overlay -->
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 bg-black/50 z-30 lg:hidden"
        @click="mobileMenuOpen = false"
      />

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const mobileMenuOpen = ref(false);
const user = ref<any>(null);

const isActive = (path: string) => {
  if (path === "/admin") {
    return route.path === "/admin";
  }
  return route.path.startsWith(path);
};

// Fetch current user
onMounted(async () => {
  const { data } = await useFetch("/api/auth/me");
  user.value = data.value;
});

const handleLogout = async () => {
  await $fetch("/api/auth/logout", { method: "POST" });
  router.push("/login");
};

// Close mobile menu on route change
watch(
  () => route.path,
  () => {
    mobileMenuOpen.value = false;
  }
);
</script>
