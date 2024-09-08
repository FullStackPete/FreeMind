<script lang="ts" setup>
import { ref } from "vue";
import { welcomeTexts } from "~/constants";
import { randomPosition } from "~/helpers/randomPosition";

type welcomeTextType = {
  letter: string;
  position: string;
};

const formClass = ref("");
const timeouts: Array<number | NodeJS.Timeout> = [];
const name = ref<string>("");
const welcomeText = ref<welcomeTextType[]>([]);
const letterShown = ref<boolean[]>([]);

const showText = () => {
  let totalDelay = 0;
  let letterSlideDelay = 500;
  let timeGapBetweenWords = 1500;

  for (let i = 0; i < welcomeTexts.length; i++) {
    const splitInLetters = welcomeTexts[i].split("");
    const textLength = splitInLetters.length;

    timeouts.push(
      setTimeout(() => {
        welcomeText.value = splitInLetters.map((letter) => ({
          letter,
          position: generateRandomPosition(),
        }));

        letterShown.value = new Array(textLength).fill(false);

        for (let j = 0; j < textLength; j++) {
          timeouts.push(
            setTimeout(() => {
              letterShown.value[j] = true;
            }, j * letterSlideDelay)
          );
        }

        timeouts.push(
          setTimeout(() => {
            welcomeText.value = [];
            letterShown.value = [];
          }, textLength * letterSlideDelay + (timeGapBetweenWords - 100))
        );
      }, totalDelay)
    );

    totalDelay += textLength * letterSlideDelay + timeGapBetweenWords;
  }

  timeouts.push(
    setTimeout(() => {
      showText();
    }, totalDelay)
  );
};

const clearAllTimeouts = () => {
  timeouts.forEach((timeout) => clearTimeout(timeout));
  timeouts.length = 0; // Wyczyść tablicę timeoutów
};

const generateRandomPosition = () => {
  const { direction, axis } = randomPosition();
  const position = `${direction}translate-${axis}-[100${
    axis === "x" ? "vw" : "vh"
  }]`;
  return position;
};

showText();

const handleInput = (e: Event) => {
  const newValue = (e.target as HTMLInputElement).value.replace("  ", " ");
  name.value = newValue;
};

const unmountAnimation = () => {
  formClass.value = "translate-y-[70vh]";
  setTimeout(() => {
    initialSetup.setupStep = 1;
  }, 500);
};
const handleNext = () => {
  initialSetup.name = name.value;
  unmountAnimation();
};
onUnmounted(() => {
  clearAllTimeouts();
});
</script>
<template>
  <div>
    <div
      class="h-screen justify-center flex items-center flex-col mb-20 transition-transform duration-500"
      :class="formClass"
    >
      <div
        class="flex flex-row text-7xl absolute md:top-[35vh] top-[30vh] font-bold transition-transform duration-300"
      >
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
  </div>
</template>

<style>
.letter-shown {
  @apply translate-x-0;
}
</style>
