<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br"
      :class="gradientClass"
      :style="{ transform: `translateY(${scrollY * 0.5}px)` }"
    ></div>
    <div class="absolute inset-0 bg-black/20"></div>

    <!-- Decorative elements -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative container mx-auto px-4 py-20 text-center text-white">
      <h1
        class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in tracking-tight"
      >
        {{ hero.title }}
      </h1>
      <p class="text-2xl md:text-3xl mb-4 animate-fade-in-delay-1 font-light">
        {{ hero.subtitle }}
      </p>
      <p
        class="text-lg md:text-xl max-w-3xl mx-auto mb-8 animate-fade-in-delay-2 leading-relaxed font-light"
      >
        {{ hero.description }}
      </p>
      <div
        class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3"
      >
        <UButton
          size="xl"
          color="neutral"
          @click="scrollTo('contact')"
          class="shadow-xl hover:shadow-2xl transition-shadow bg-white text-gray-900 hover:bg-gray-100"
        >
          Get in Touch
        </UButton>
        <UButton
          size="xl"
          variant="outline"
          color="neutral"
          @click="scrollTo('about')"
          class="border-2 border-white text-white hover:bg-white/10 transition-all"
        >
          Learn More
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image?: string;
  };
  primaryColor: string;
}>();

const gradientClass = computed(() => {
  const colorMap: Record<string, string> = {
    orange: "from-orange-500 to-amber-600",
    blue: "from-blue-500 to-indigo-700",
    green: "from-green-600 to-emerald-500",
  };
  return colorMap[props.primaryColor] || "from-green-600 to-emerald-500";
});

const scrollY = ref(0);

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const scrollTo = (id: string) => {
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

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-fade-in-delay-1 {
  animation: fadeIn 0.8s ease-out 0.2s backwards;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 0.8s ease-out 0.4s backwards;
}

.animate-fade-in-delay-3 {
  animation: fadeIn 0.8s ease-out 0.6s backwards;
}
</style>
