<template>
  <div class="w-full flex self-center justify-center">
    <Toolbar
      class="!p-4 mt-4 !rounded-lg fixed z-20 w-3/5"
    >
      <template #start>
        <div class="flex items-center gap-2">
          <svg
            width="35"
            height="40"
            viewBox="0 0 35 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="..." fill="var(--p-text-color)" />
            <path d="..." fill="transparent" />
          </svg>
          <Button label="Files" text plain />
          <Button label="Edit" text plain />
          <Button label="View" text plain />
          <Button>Color check</Button>

          <Button severity="contrast">Secondary</Button>
        </div>
      </template>

      <template #end>
        <div class="flex items-center gap-2">
          <Button label="Share" severity="contrast" size="small" />
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            style="width: 32px; height: 32px"
          />
        </div>
      </template>
    </Toolbar>
  </div>
</template>
