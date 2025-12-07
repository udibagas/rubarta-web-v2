<template>
  <div
    class="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 px-4"
  >
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center">
          <div
            class="w-16 h-16 bg-linear-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <UIcon
              name="i-heroicons-building-office-2"
              class="w-10 h-10 text-white"
            />
          </div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Rubarta Admin
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sign in to manage your content
          </p>
        </div>
      </template>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <UFormField label="Email" required>
          <UInput
            v-model="email"
            type="email"
            placeholder="admin@rubarta.com"
            icon="i-heroicons-envelope"
            :disabled="loading"
            required
            class="w-full"
          />
        </UFormField>

        <UFormField label="Password" required>
          <UInput
            v-model="password"
            type="password"
            placeholder="Enter your password"
            icon="i-heroicons-lock-closed"
            :disabled="loading"
            required
            class="w-full"
          />
        </UFormField>

        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          :title="error"
          icon="i-heroicons-exclamation-circle"
        />

        <UButton
          type="submit"
          color="primary"
          block
          size="lg"
          :loading="loading"
        >
          Sign In
        </UButton>
      </form>

      <template #footer>
        <div class="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Default credentials:</p>
          <p class="font-mono text-xs mt-1">admin@rubarta.com / admin123</p>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const router = useRouter();
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

// Check if already logged in
onMounted(async () => {
  const { data: user } = await useFetch("/api/auth/me");
  if (user.value) {
    router.push("/admin");
  }
});

const handleLogin = async () => {
  loading.value = true;
  error.value = "";

  try {
    const { data, error: fetchError } = await useFetch("/api/auth/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    if (fetchError.value) {
      error.value = fetchError.value.data?.message || "Login failed";
      return;
    }

    if (data.value) {
      // Redirect to admin dashboard
      router.push("/admin");
    }
  } catch (e: any) {
    error.value = e.message || "An error occurred";
  } finally {
    loading.value = false;
  }
};
</script>
