<template>
  <section id="contact" class="py-20 bg-white dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12 animate-on-scroll fade-in-up">
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          Contact Us
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Get in touch with us for more information
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div class="space-y-6 animate-on-scroll slide-in-left stagger-2">
          <UCard class="hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-start space-x-4">
              <div
                class="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                :class="iconBgClass"
              >
                <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3
                  class="text-lg font-bold mb-2 text-gray-900 dark:text-white"
                >
                  Email
                </h3>
                <a
                  :href="`mailto:${contact.email}`"
                  class="text-primary-600 hover:text-primary-700"
                >
                  {{ contact.email }}
                </a>
              </div>
            </div>
          </UCard>

          <UCard class="hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-start space-x-4">
              <div
                class="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                :class="iconBgClass"
              >
                <UIcon name="i-heroicons-phone" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3
                  class="text-lg font-bold mb-2 text-gray-900 dark:text-white"
                >
                  Phone
                </h3>
                <a
                  :href="`tel:${contact.phone}`"
                  class="text-primary-600 hover:text-primary-700"
                >
                  {{ contact.phone }}
                </a>
              </div>
            </div>
          </UCard>

          <UCard class="hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-start space-x-4">
              <div
                class="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                :class="iconBgClass"
              >
                <UIcon name="i-heroicons-map-pin" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3
                  class="text-lg font-bold mb-2 text-gray-900 dark:text-white"
                >
                  Address
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ contact.address }}
                </p>
              </div>
            </div>
          </UCard>

          <UCard
            v-if="contact.social"
            class="hover:shadow-lg transition-shadow duration-300"
          >
            <div class="flex items-start space-x-4">
              <div
                class="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                :class="iconBgClass"
              >
                <UIcon name="i-heroicons-share" class="w-6 h-6 text-white" />
              </div>
              <div class="flex-1">
                <h3
                  class="text-lg font-bold mb-4 text-gray-900 dark:text-white"
                >
                  Follow Us
                </h3>
                <div class="flex gap-3">
                  <UButton
                    v-if="contact.social.facebook"
                    icon="i-simple-icons-facebook"
                    color="secondary"
                    :to="contact.social.facebook"
                    target="_blank"
                    size="lg"
                  />
                  <UButton
                    v-if="contact.social.instagram"
                    icon="i-simple-icons-instagram"
                    color="error"
                    :to="contact.social.instagram"
                    target="_blank"
                    size="lg"
                  />
                  <UButton
                    v-if="contact.social.linkedin"
                    icon="i-simple-icons-linkedin"
                    color="secondary"
                    :to="contact.social.linkedin"
                    target="_blank"
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <div class="animate-on-scroll slide-in-right stagger-3">
          <UCard class="hover:shadow-lg transition-shadow duration-300">
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <UFormGroup label="Name" required>
                <UInput v-model="form.name" placeholder="Your name" size="lg" />
              </UFormGroup>

              <UFormGroup label="Email" required>
                <UInput
                  v-model="form.email"
                  type="email"
                  placeholder="your@email.com"
                  size="lg"
                />
              </UFormGroup>

              <UFormGroup label="Phone">
                <UInput
                  v-model="form.phone"
                  placeholder="Your phone number"
                  size="lg"
                />
              </UFormGroup>

              <UFormGroup label="Message" required>
                <UTextarea
                  v-model="form.message"
                  placeholder="Your message"
                  :rows="5"
                  size="lg"
                />
              </UFormGroup>

              <UButton type="submit" size="lg" block color="primary">
                Send Message
              </UButton>
            </form>
          </UCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  contact: {
    email: string;
    phone: string;
    address: string;
    social?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      twitter?: string;
    };
  };
  primaryColor: string;
}>();

const form = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const iconBgClass = computed(() => {
  const colorMap: Record<string, string> = {
    orange: "bg-gradient-to-br from-orange-500 to-amber-600",
    blue: "bg-gradient-to-br from-blue-500 to-indigo-700",
    green: "bg-gradient-to-br from-green-600 to-emerald-500",
  };
  return (
    colorMap[props.primaryColor] ||
    "bg-gradient-to-br from-green-600 to-emerald-500"
  );
});

const handleSubmit = () => {
  // Handle form submission
  console.log("Form submitted:", form.value);
  alert("Thank you for your message! We will get back to you soon.");
  form.value = { name: "", email: "", phone: "", message: "" };
};

const { observeElements } = useScrollAnimation();

onMounted(() => {
  observeElements();
});
</script>
