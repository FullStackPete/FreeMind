<script setup lang="ts">
import { ref } from "vue";
import { randomPosition } from "~/helpers/randomPosition";

type welcomeTextType = {
  letter: string;
  position: string;
};

const name = ref<string>("");
const welcomeText = ref<welcomeTextType[]>([]);
const letterShown = ref<boolean[]>([]);
const welcomeTexts = [
  "Hello!",
  "Cześć!",
  "Bonjour!",
  "Hola!",
  "Ciao!",
  "你好!",
];

const showText = () => {
  let totalDelay = 0;

  for (let i = 0; i < welcomeTexts.length; i++) {
    const splitInLetters = welcomeTexts[i].split("");
    const textLength = splitInLetters.length;

    setTimeout(() => {
      welcomeText.value = splitInLetters.map((letter) => ({
        letter,
        position: generateRandomPosition(),
      }));

      letterShown.value = new Array(textLength).fill(false);

      for (let j = 0; j < textLength; j++) {
        setTimeout(() => {
          letterShown.value[j] = true;
        }, j * 500);
      }

      setTimeout(() => {
        welcomeText.value = [];
        letterShown.value = [];
      }, textLength * 500);
    }, totalDelay);

    totalDelay += textLength * 500 + 500;
  }
  setTimeout(() => {
    showText();
  }, totalDelay);
};

const generateRandomPosition = () => {
  const { direction, axis } = randomPosition();
  const position = `${direction}translate-${axis}-[70${
    axis === "x" ? "vw" : "vh"
  }]`;
  return position;
};

showText();

const handleInput = (e: Event) => {
  const newValue = (e.target as HTMLInputElement).value.replace("  ", " ");
  name.value = newValue;
};
const handleNext = () => {
  initialSetup.name = name.value;
  initialSetup.setupComplete = true;
};
</script>

<template>
  <div class="h-screen justify-center flex items-center flex-col mb-20">
    <div
      class="flex flex-row text-8xl font-bold transition-transform duration-300"
    >
      <p class="text-transparent">a</p>
      <p
        v-for="(letter, index) in welcomeText"
        :key="index"
        class="transition-transform duration-500"
        :class="letterShown[index] ? 'letter-shown' : letter.position"
      >
        {{ letter.letter }}
      </p>
    </div>
    <p class="text-4xl mt-20">Wanna see magic?</p>
    <p class="text-4xl mb-8">Input your name</p>
    <InputText @input="(e) => handleInput(e)" v-model="name" class="mb-8" />
    <Button @click="handleNext">Next</Button>
  </div>
</template>

<style>
.letter-shown {
  @apply translate-x-0;
}
</style>
