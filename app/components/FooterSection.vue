<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 class="text-2xl font-bold mb-4">{{ companyName }}</h3>
          <p class="text-gray-400 mb-4">{{ tagline }}</p>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <a
                @click.prevent="scrollToSection('about')"
                class="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                About
              </a>
            </li>
            <li>
              <a
                @click.prevent="scrollToSection('products')"
                class="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Services
              </a>
            </li>
            <li>
              <a
                @click.prevent="scrollToSection('portfolio')"
                class="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                @click.prevent="scrollToSection('contact')"
                class="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">Contact Info</h4>
          <ul class="space-y-2 text-gray-400">
            <li>{{ contact.email }}</li>
            <li>{{ contact.phone }}</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-8 text-center">
        <p class="text-gray-400">
          &copy; {{ new Date().getFullYear() }} {{ companyName }}. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const props = defineProps<{
  companyName: string;
  tagline: string;
  contact: {
    email: string;
    phone: string;
  };
}>();

const scrollToSection = (id: string) => {
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
