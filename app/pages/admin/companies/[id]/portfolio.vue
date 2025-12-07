<template>
  <div>
    <div class="mb-8 flex justify-between items-center">
      <div>
        <UButton
          icon="i-heroicons-arrow-left"
          color="neutral"
          variant="ghost"
          to="/admin/companies"
          class="mb-4"
        >
          Back to Companies
        </UButton>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ company?.name }} - Portfolio
        </h1>
      </div>
      <UButton
        v-if="!showForm"
        color="primary"
        icon="i-heroicons-plus"
        @click="createPortfolio"
      >
        Add Portfolio
      </UButton>
    </div>

    <div v-if="loading" class="text-center py-12">
      <UIcon
        name="i-heroicons-arrow-path"
        class="w-8 h-8 animate-spin text-green-600"
      />
    </div>

    <div v-else-if="showForm" class="mb-8">
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">
              {{ editingPortfolio ? "Edit Portfolio" : "New Portfolio" }}
            </h3>
            <UButton
              icon="i-heroicons-x-mark"
              color="neutral"
              variant="ghost"
              @click="cancelForm"
            />
          </div>
        </template>

        <form @submit.prevent="savePortfolio" class="space-y-6">
          <UFormField label="Title" required>
            <UInput v-model="form.title" placeholder="Portfolio title" />
          </UFormField>

          <UFormField label="Description" required>
            <UTextarea v-model="form.description" :rows="4" />
          </UFormField>

          <UFormField label="Category" required>
            <UInput
              v-model="form.category"
              placeholder="e.g., Construction, Mining"
            />
          </UFormField>

          <UFormField label="Image URL">
            <UInput v-model="form.image" placeholder="https://..." />
          </UFormField>

          <UFormField label="Display Order">
            <UInput v-model.number="form.order" type="number" />
          </UFormField>

          <div class="flex justify-end gap-3 pt-6 border-t">
            <UButton
              type="button"
              color="neutral"
              variant="outline"
              @click="cancelForm"
            >
              Cancel
            </UButton>
            <UButton type="submit" color="primary" :loading="saving">
              {{ editingPortfolio ? "Update" : "Create" }}
            </UButton>
          </div>
        </form>
      </UCard>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard v-for="item in portfolio" :key="item.id">
        <template #header>
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.title"
            class="w-full h-48 object-cover rounded-t-lg"
          />
        </template>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ item.title }}
            </h3>
            <UBadge color="primary" variant="soft">{{ item.category }}</UBadge>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            {{ item.description }}
          </p>
          <div class="text-sm text-gray-500">Order: {{ item.order }}</div>

          <div class="flex justify-end gap-2 pt-3 border-t">
            <UButton
              icon="i-heroicons-pencil"
              color="neutral"
              variant="ghost"
              @click="editPortfolio(item)"
            />
            <UButton
              icon="i-heroicons-trash"
              color="error"
              variant="ghost"
              @click="deletePortfolio(item.id)"
            />
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const route = useRoute();
const companyId = route.params.id as string;

const loading = ref(true);
const saving = ref(false);
const showForm = ref(false);
const editingPortfolio = ref<any>(null);
const company = ref<any>(null);
const portfolio = ref<any[]>([]);

const form = ref({
  title: "",
  description: "",
  category: "",
  image: "",
  order: 0,
});

async function loadData() {
  loading.value = true;
  try {
    const [companyRes, portfolioRes] = await Promise.all([
      $fetch(`/api/admin/companies/${companyId}`),
      $fetch(`/api/admin/companies/${companyId}/portfolio`),
    ]);
    company.value = companyRes;
    portfolio.value = portfolioRes;
  } catch (error) {
    console.error("Failed to load data:", error);
  } finally {
    loading.value = false;
  }
}

function createPortfolio() {
  editingPortfolio.value = null;
  resetForm();
  showForm.value = true;
}

function editPortfolio(item: any) {
  editingPortfolio.value = item;
  form.value = { ...item };
  showForm.value = true;
}

function resetForm() {
  form.value = {
    title: "",
    description: "",
    category: "",
    image: "",
    order: portfolio.value.length,
  };
}

function cancelForm() {
  showForm.value = false;
  editingPortfolio.value = null;
  resetForm();
}

async function savePortfolio() {
  saving.value = true;
  try {
    const url = editingPortfolio.value
      ? `/api/admin/companies/${companyId}/portfolio/${editingPortfolio.value.id}`
      : `/api/admin/companies/${companyId}/portfolio`;

    const method = editingPortfolio.value ? "PUT" : "POST";

    await $fetch(url, {
      method,
      body: form.value,
    });

    await loadData();
    cancelForm();
  } catch (error) {
    console.error("Failed to save portfolio:", error);
    alert("Failed to save portfolio");
  } finally {
    saving.value = false;
  }
}

async function deletePortfolio(id: string) {
  if (!confirm("Are you sure you want to delete this portfolio item?")) return;

  try {
    await $fetch(`/api/admin/companies/${companyId}/portfolio/${id}`, {
      method: "DELETE",
    });
    await loadData();
  } catch (error) {
    console.error("Failed to delete portfolio:", error);
    alert("Failed to delete portfolio");
  }
}

onMounted(() => {
  loadData();
});
</script>
