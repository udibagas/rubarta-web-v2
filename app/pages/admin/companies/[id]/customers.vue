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
          {{ company?.name }} - Customers
        </h1>
      </div>
      <UButton
        v-if="!showForm"
        color="primary"
        icon="i-heroicons-plus"
        @click="createCustomer"
      >
        Add Customer
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
              {{ editingCustomer ? "Edit Customer" : "New Customer" }}
            </h3>
            <UButton
              icon="i-heroicons-x-mark"
              color="neutral"
              variant="ghost"
              @click="cancelForm"
            />
          </div>
        </template>

        <form @submit.prevent="saveCustomer" class="space-y-6">
          <UFormField label="Name" required>
            <UInput v-model="form.name" placeholder="Customer name" />
          </UFormField>

          <UFormField label="Logo URL">
            <UInput v-model="form.logo" placeholder="https://..." />
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
              {{ editingCustomer ? "Update" : "Create" }}
            </UButton>
          </div>
        </form>
      </UCard>
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <UCard v-for="customer in customers" :key="customer.id">
        <div class="space-y-3">
          <img
            v-if="customer.logo"
            :src="customer.logo"
            :alt="customer.name"
            class="w-full h-32 object-contain"
          />
          <h3
            class="text-sm font-semibold text-gray-900 dark:text-white text-center"
          >
            {{ customer.name }}
          </h3>
          <div class="text-xs text-gray-500 text-center">
            Order: {{ customer.order }}
          </div>

          <div class="flex justify-center gap-2 pt-3 border-t">
            <UButton
              icon="i-heroicons-pencil"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="editCustomer(customer)"
            />
            <UButton
              icon="i-heroicons-trash"
              color="error"
              variant="ghost"
              size="sm"
              @click="deleteCustomer(customer.id)"
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
const editingCustomer = ref<any>(null);
const company = ref<any>(null);
const customers = ref<any[]>([]);

const form = ref({
  name: "",
  logo: "",
  order: 0,
});

async function loadData() {
  loading.value = true;
  try {
    const [companyRes, customersRes] = await Promise.all([
      $fetch(`/api/admin/companies/${companyId}`),
      $fetch(`/api/admin/companies/${companyId}/customers`),
    ]);
    company.value = companyRes;
    customers.value = customersRes;
  } catch (error) {
    console.error("Failed to load data:", error);
  } finally {
    loading.value = false;
  }
}

function createCustomer() {
  editingCustomer.value = null;
  resetForm();
  showForm.value = true;
}

function editCustomer(customer: any) {
  editingCustomer.value = customer;
  form.value = { ...customer };
  showForm.value = true;
}

function resetForm() {
  form.value = {
    name: "",
    logo: "",
    order: customers.value.length,
  };
}

function cancelForm() {
  showForm.value = false;
  editingCustomer.value = null;
  resetForm();
}

async function saveCustomer() {
  saving.value = true;
  try {
    const url = editingCustomer.value
      ? `/api/admin/companies/${companyId}/customers/${editingCustomer.value.id}`
      : `/api/admin/companies/${companyId}/customers`;

    const method = editingCustomer.value ? "PUT" : "POST";

    await $fetch(url, {
      method,
      body: form.value,
    });

    await loadData();
    cancelForm();
  } catch (error) {
    console.error("Failed to save customer:", error);
    alert("Failed to save customer");
  } finally {
    saving.value = false;
  }
}

async function deleteCustomer(id: string) {
  if (!confirm("Are you sure you want to delete this customer?")) return;

  try {
    await $fetch(`/api/admin/companies/${companyId}/customers/${id}`, {
      method: "DELETE",
    });
    await loadData();
  } catch (error) {
    console.error("Failed to delete customer:", error);
    alert("Failed to delete customer");
  }
}

onMounted(() => {
  loadData();
});
</script>
