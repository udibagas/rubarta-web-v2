<template>
  <div>
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Companies
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Manage your company information
        </p>
      </div>
      <UButton
        v-if="!showForm"
        color="primary"
        icon="i-heroicons-plus"
        @click="createCompany"
      >
        Add Company
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
              {{ editingCompany ? "Edit Company" : "New Company" }}
            </h3>
            <UButton
              icon="i-heroicons-x-mark"
              color="neutral"
              variant="ghost"
              @click="cancelForm"
            />
          </div>
        </template>

        <form @submit.prevent="saveCompany" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField label="Name" required>
              <UInput v-model="form.name" placeholder="Company Name" />
            </UFormField>

            <UFormField label="Slug" required>
              <UInput v-model="form.slug" placeholder="company-slug" />
            </UFormField>

            <UFormField label="Tagline" class="md:col-span-2" required>
              <UInput v-model="form.tagline" placeholder="Company tagline" />
            </UFormField>

            <UFormField label="Description" class="md:col-span-2" required>
              <UTextarea v-model="form.description" :rows="3" />
            </UFormField>

            <UFormField label="Logo URL">
              <UInput v-model="form.logo" placeholder="https://..." />
            </UFormField>
          </div>

          <div class="border-t pt-6">
            <h4 class="text-lg font-semibold mb-4">Hero Section</h4>
            <div class="grid grid-cols-1 gap-6">
              <UFormField label="Hero Title" required>
                <UInput v-model="form.heroTitle" />
              </UFormField>
              <UFormField label="Hero Subtitle" required>
                <UInput v-model="form.heroSubtitle" />
              </UFormField>
              <UFormField label="Hero Description" required>
                <UTextarea v-model="form.heroDescription" :rows="3" />
              </UFormField>
              <UFormField label="Hero Image URL">
                <UInput v-model="form.heroImage" placeholder="https://..." />
              </UFormField>
            </div>
          </div>

          <div class="border-t pt-6">
            <h4 class="text-lg font-semibold mb-4">About Section</h4>
            <div class="grid grid-cols-1 gap-6">
              <UFormField label="About Title" required>
                <UInput v-model="form.aboutTitle" />
              </UFormField>
              <UFormField label="About Description" required>
                <UTextarea v-model="form.aboutDescription" :rows="3" />
              </UFormField>
              <UFormField label="Mission" required>
                <UTextarea v-model="form.aboutMission" :rows="3" />
              </UFormField>
              <UFormField label="Vision" required>
                <UTextarea v-model="form.aboutVision" :rows="3" />
              </UFormField>
            </div>
          </div>

          <div class="border-t pt-6">
            <h4 class="text-lg font-semibold mb-4">Contact Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UFormField label="Email" required>
                <UInput v-model="form.contactEmail" type="email" />
              </UFormField>
              <UFormField label="Phone" required>
                <UInput v-model="form.contactPhone" />
              </UFormField>
              <UFormField label="Address" class="md:col-span-2" required>
                <UTextarea v-model="form.contactAddress" :rows="2" />
              </UFormField>
              <UFormField label="Facebook">
                <UInput
                  v-model="form.socialFacebook"
                  placeholder="https://facebook.com/..."
                />
              </UFormField>
              <UFormField label="Instagram">
                <UInput
                  v-model="form.socialInstagram"
                  placeholder="https://instagram.com/..."
                />
              </UFormField>
              <UFormField label="LinkedIn">
                <UInput
                  v-model="form.socialLinkedin"
                  placeholder="https://linkedin.com/..."
                />
              </UFormField>
              <UFormField label="Twitter">
                <UInput
                  v-model="form.socialTwitter"
                  placeholder="https://twitter.com/..."
                />
              </UFormField>
            </div>
          </div>

          <div class="border-t pt-6">
            <h4 class="text-lg font-semibold mb-4">Theme Colors</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UFormField label="Primary Color" required>
                <UInput
                  v-model="form.themePrimaryColor"
                  placeholder="#10B981"
                />
              </UFormField>
              <UFormField label="Secondary Color" required>
                <UInput
                  v-model="form.themeSecondaryColor"
                  placeholder="#34D399"
                />
              </UFormField>
              <UFormField label="Gradient From">
                <UInput
                  v-model="form.themeGradientFrom"
                  placeholder="#10B981"
                />
              </UFormField>
              <UFormField label="Gradient To">
                <UInput v-model="form.themeGradientTo" placeholder="#34D399" />
              </UFormField>
            </div>
          </div>

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
              {{ editingCompany ? "Update" : "Create" }}
            </UButton>
          </div>
        </form>
      </UCard>
    </div>

    <div v-else class="space-y-4">
      <UCard v-for="company in companies" :key="company.id">
        <div class="flex items-start justify-between">
          <div class="flex items-start space-x-4">
            <img
              v-if="company.logo"
              :src="company.logo"
              :alt="company.name"
              class="w-16 h-16 object-contain"
            />
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ company.name }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ company.tagline }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {{ company.description }}
              </p>
              <div class="flex gap-4 mt-3 text-sm text-gray-500">
                <span>{{ company._count?.products || 0 }} Products</span>
                <span>{{ company._count?.portfolios || 0 }} Portfolio</span>
                <span>{{ company._count?.customers || 0 }} Customers</span>
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <UButton
              icon="i-heroicons-pencil"
              color="neutral"
              variant="ghost"
              @click="editCompany(company)"
            />
            <UButton
              icon="i-heroicons-cube"
              color="neutral"
              variant="ghost"
              :to="`/admin/companies/${company.id}/products`"
            />
            <UButton
              icon="i-heroicons-photo"
              color="neutral"
              variant="ghost"
              :to="`/admin/companies/${company.id}/portfolio`"
            />
            <UButton
              icon="i-heroicons-users"
              color="neutral"
              variant="ghost"
              :to="`/admin/companies/${company.id}/customers`"
            />
            <UButton
              icon="i-heroicons-trash"
              color="error"
              variant="ghost"
              @click="deleteCompany(company.id)"
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

const loading = ref(true);
const saving = ref(false);
const showForm = ref(false);
const editingCompany = ref<any>(null);
const companies = ref<any[]>([]);

const form = ref({
  name: "",
  slug: "",
  tagline: "",
  description: "",
  logo: "",
  heroTitle: "",
  heroSubtitle: "",
  heroDescription: "",
  heroImage: "",
  aboutTitle: "",
  aboutDescription: "",
  aboutMission: "",
  aboutVision: "",
  contactEmail: "",
  contactPhone: "",
  contactAddress: "",
  socialFacebook: "",
  socialInstagram: "",
  socialLinkedin: "",
  socialTwitter: "",
  themePrimaryColor: "#10B981",
  themeSecondaryColor: "#34D399",
  themeGradientFrom: "",
  themeGradientTo: "",
});

async function loadCompanies() {
  loading.value = true;
  try {
    const { data } = await useFetch("/api/admin/companies");
    if (data.value) {
      companies.value = data.value;
    }
  } catch (error) {
    console.error("Failed to load companies:", error);
  } finally {
    loading.value = false;
  }
}

function createCompany() {
  editingCompany.value = null;
  resetForm();
  showForm.value = true;
}

function editCompany(company: any) {
  editingCompany.value = company;
  Object.keys(form.value).forEach((key) => {
    form.value[key as keyof typeof form.value] = company[key] || "";
  });
  showForm.value = true;
}

function resetForm() {
  form.value = {
    name: "",
    slug: "",
    tagline: "",
    description: "",
    logo: "",
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    heroImage: "",
    aboutTitle: "",
    aboutDescription: "",
    aboutMission: "",
    aboutVision: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    socialFacebook: "",
    socialInstagram: "",
    socialLinkedin: "",
    socialTwitter: "",
    themePrimaryColor: "#10B981",
    themeSecondaryColor: "#34D399",
    themeGradientFrom: "",
    themeGradientTo: "",
  };
}

function cancelForm() {
  showForm.value = false;
  editingCompany.value = null;
  resetForm();
}

async function saveCompany() {
  saving.value = true;
  try {
    const url = editingCompany.value
      ? `/api/admin/companies/${editingCompany.value.id}`
      : "/api/admin/companies";

    const method = editingCompany.value ? "PUT" : "POST";

    await $fetch(url, {
      method,
      body: form.value,
    });

    await loadCompanies();
    cancelForm();
  } catch (error) {
    console.error("Failed to save company:", error);
    alert("Failed to save company");
  } finally {
    saving.value = false;
  }
}

async function deleteCompany(id: string) {
  if (!confirm("Are you sure you want to delete this company?")) return;

  try {
    await $fetch(`/api/admin/companies/${id}`, {
      method: "DELETE",
    });
    await loadCompanies();
  } catch (error) {
    console.error("Failed to delete company:", error);
    alert("Failed to delete company");
  }
}

onMounted(() => {
  loadCompanies();
});
</script>
