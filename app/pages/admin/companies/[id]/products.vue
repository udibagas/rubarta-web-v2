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
          {{ company?.name }} - Products
        </h1>
      </div>
      <UButton
        v-if="!showForm"
        color="primary"
        icon="i-heroicons-plus"
        @click="createProduct"
      >
        Add Product
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
              {{ editingProduct ? "Edit Product" : "New Product" }}
            </h3>
            <UButton
              icon="i-heroicons-x-mark"
              color="neutral"
              variant="ghost"
              @click="cancelForm"
            />
          </div>
        </template>

        <form @submit.prevent="saveProduct" class="space-y-6">
          <UFormField label="Name" required>
            <UInput v-model="form.name" placeholder="Product name" />
          </UFormField>

          <UFormField label="Description" required>
            <UTextarea v-model="form.description" :rows="4" />
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
              {{ editingProduct ? "Update" : "Create" }}
            </UButton>
          </div>
        </form>
      </UCard>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard v-for="product in products" :key="product.id">
        <template #header>
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.name"
            class="w-full h-48 object-cover rounded-t-lg"
          />
        </template>

        <div class="space-y-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ product.name }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            {{ product.description }}
          </p>
          <div class="text-sm text-gray-500">Order: {{ product.order }}</div>

          <div class="flex justify-end gap-2 pt-3 border-t">
            <UButton
              icon="i-heroicons-pencil"
              color="neutral"
              variant="ghost"
              @click="editProduct(product)"
            />
            <UButton
              icon="i-heroicons-trash"
              color="error"
              variant="ghost"
              @click="deleteProduct(product.id)"
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
const editingProduct = ref<any>(null);
const company = ref<any>(null);
const products = ref<any[]>([]);

const form = ref({
  name: "",
  description: "",
  image: "",
  order: 0,
});

async function loadData() {
  loading.value = true;
  try {
    const [companyRes, productsRes] = await Promise.all([
      $fetch(`/api/admin/companies/${companyId}`),
      $fetch(`/api/admin/companies/${companyId}/products`),
    ]);
    company.value = companyRes;
    products.value = productsRes;
  } catch (error) {
    console.error("Failed to load data:", error);
  } finally {
    loading.value = false;
  }
}

function createProduct() {
  editingProduct.value = null;
  resetForm();
  showForm.value = true;
}

function editProduct(product: any) {
  editingProduct.value = product;
  form.value = { ...product };
  showForm.value = true;
}

function resetForm() {
  form.value = {
    name: "",
    description: "",
    image: "",
    order: products.value.length,
  };
}

function cancelForm() {
  showForm.value = false;
  editingProduct.value = null;
  resetForm();
}

async function saveProduct() {
  saving.value = true;
  try {
    const url = editingProduct.value
      ? `/api/admin/companies/${companyId}/products/${editingProduct.value.id}`
      : `/api/admin/companies/${companyId}/products`;

    const method = editingProduct.value ? "PUT" : "POST";

    await $fetch(url, {
      method,
      body: form.value,
    });

    await loadData();
    cancelForm();
  } catch (error) {
    console.error("Failed to save product:", error);
    alert("Failed to save product");
  } finally {
    saving.value = false;
  }
}

async function deleteProduct(id: string) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    await $fetch(`/api/admin/companies/${companyId}/products/${id}`, {
      method: "DELETE",
    });
    await loadData();
  } catch (error) {
    console.error("Failed to delete product:", error);
    alert("Failed to delete product");
  }
}

onMounted(() => {
  loadData();
});
</script>
