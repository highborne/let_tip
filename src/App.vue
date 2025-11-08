<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

import { Button } from '@/components/ui/button'
import BillForm from '@/components/billForm/BillForm.vue'
import SplitBillPane from './components/splitBillPanel/SplitBillPanel.vue'
import IconChevronRight from '@/assets/icons/IconChevronRight.vue';
import IconChevronLeft from '@/assets/icons/IconChevronLeft.vue';

const isMobile = ref(window.innerWidth < 768);
const handleResize = () => (isMobile.value = window.innerWidth < 768);

const currentSectionIndex = ref(0);
const appSections = [
  { name: 'Bill Form', component: BillForm },
  { name: 'Split Check Panel', component: SplitBillPane },
];

const currentSection = computed(() => appSections[currentSectionIndex.value]);

const nextSection = () => {
  if (currentSectionIndex.value < appSections.length - 1) {
    currentSectionIndex.value++;
  }
};

const prevSection = () => {
  if (currentSectionIndex.value > 0) {
    currentSectionIndex.value--;
  }
};

onMounted(() => window.addEventListener("resize", handleResize));
onUnmounted(() => window.removeEventListener("resize", handleResize));
</script>

<template>
 <div class="app flex flex-col items-center min-h-screen bg-white p-8">
  <p class="app__title text-6xl font-medium tracking-tight mb-10 mt-10">Le/Tip</p>

  <div v-if="!isMobile" class="app__layout app__layout--desktop flex flex-col p-6 max-w-4xl">
    <div class="app__grid grid grid-cols-2 gap-16 max-w-7xl">
      <BillForm class="app__form" />
      <SplitBillPane class="app__pane" />
    </div>
  </div>

  <div v-else class="app__layout app__layout--mobile relative w-full max-w-sm h-[60vh] flex flex-col items-center">
    <component :is="currentSection.component" class="app__section w-full grow" />

    <div class="app__controls fixed bottom-3 left-0 right-0 w-full flex justify-end px-4">
      <Button
        v-if="currentSectionIndex > 0"
        @click="prevSection"
        class="app__controls-button w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg"
      >
        <IconChevronLeft class="app__controls-icon w-3 h-6" />
      </Button>

      <Button
        v-if="currentSectionIndex < appSections.length - 1"
        @click="nextSection"
        class="app__controls-button w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg"
      >
        <IconChevronRight class="app__controls-icon app__controls-icon--tall w-3 h-8" />
      </Button>
    </div>
  </div>
</div>
</template>