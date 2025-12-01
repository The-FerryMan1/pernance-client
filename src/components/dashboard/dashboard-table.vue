<script setup lang="ts" generic="T">

defineProps<{
    data: T[]
}>()
</script>

<template>
    <UTable :data="data" class="flex-1 border border-slate-200 rounded-md dark:border-slate-700" />
</template>
