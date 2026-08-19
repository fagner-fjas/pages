<script setup lang="ts">
import { computed } from 'vue'
import { ImagePlus } from '@lucide/vue'

const props = defineProps<{
  label: string
  model: Record<string, unknown> | unknown[]
  fieldKey: string | number
}>()

const emit = defineEmits<{
  addItem: [target: unknown[]]
  removeItem: [target: unknown[], index: number]
  imageSelected: [event: Event, object: Record<string, unknown>]
}>()

const value = computed({
  get: () => (props.model as Record<string, unknown>)[props.fieldKey],
  set: (nextValue: unknown) => {
    ;(props.model as Record<string, unknown>)[props.fieldKey] = nextValue
  },
})

const inputType = computed(() => (typeof value.value === 'number' ? 'number' : 'text'))
const isImageObject = computed(() => isRecord(value.value) && 'src' in value.value)

function isRecord(nextValue: unknown): nextValue is Record<string, unknown> {
  return Boolean(nextValue) && typeof nextValue === 'object' && !Array.isArray(nextValue)
}

function fieldLabel(key: string) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase())
}
</script>

<template>
  <div>
    <label v-if="typeof value === 'string' || typeof value === 'number'" class="grid gap-2 text-sm font-bold">
      {{ label }}
      <textarea
        v-if="typeof value === 'string' && value.length > 80"
        v-model="value"
        rows="4"
        class="rounded border border-zinc-300 px-3 py-2 font-normal"
      />
      <input
        v-else
        v-model="value"
        :type="inputType"
        class="rounded border border-zinc-300 px-3 py-2 font-normal"
      />
    </label>

    <label v-else-if="typeof value === 'boolean'" class="flex items-center gap-2 text-sm font-bold">
      <input v-model="value" type="checkbox" />
      {{ label }}
    </label>

    <div v-else-if="Array.isArray(value)">
      <div class="mb-3 flex items-center justify-between gap-3">
        <h3 class="font-black">{{ label }}</h3>
        <button type="button" class="rounded border border-zinc-300 px-3 py-2 text-sm font-bold" @click="emit('addItem', value)">
          Adicionar item
        </button>
      </div>
      <div class="space-y-3">
        <div v-for="(item, index) in value" :key="index" class="rounded bg-zinc-50 p-3">
          <div class="mb-2 flex justify-between gap-3">
            <span class="text-sm font-bold text-zinc-500">Item {{ index + 1 }}</span>
            <button type="button" class="text-sm font-bold text-red-700" @click="emit('removeItem', value, index)">Remover</button>
          </div>
          <input v-if="typeof item === 'string' || typeof item === 'number'" v-model="value[index]" class="w-full rounded border border-zinc-300 px-3 py-2" />
          <div v-else-if="isRecord(item)" class="space-y-3">
            <RecursiveField
              v-for="(_, nestedKey) in item"
              :key="nestedKey"
              :label="fieldLabel(String(nestedKey))"
              :model="item"
              :field-key="String(nestedKey)"
              @add-item="emit('addItem', $event)"
              @remove-item="(target, itemIndex) => emit('removeItem', target, itemIndex)"
              @image-selected="(event, object) => emit('imageSelected', event, object)"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="isRecord(value)">
      <h3 class="mb-3 font-black">{{ label }}</h3>
      <div v-if="isImageObject" class="mb-4 grid gap-3 rounded bg-zinc-100 p-3 md:grid-cols-[120px_1fr]">
        <img v-if="value.src" :src="String(value.src)" alt="" class="h-24 w-full rounded object-cover" />
        <label class="inline-flex cursor-pointer items-center justify-center gap-2 rounded border border-zinc-300 bg-white px-4 py-3 text-sm font-bold">
          <ImagePlus :size="16" />
          Trocar imagem
          <input type="file" accept="image/*" class="hidden" @change="emit('imageSelected', $event, value)" />
        </label>
      </div>
      <div class="space-y-3">
        <RecursiveField
          v-for="(_, nestedKey) in value"
          :key="nestedKey"
          :label="fieldLabel(String(nestedKey))"
          :model="value"
          :field-key="String(nestedKey)"
          @add-item="emit('addItem', $event)"
          @remove-item="(target, itemIndex) => emit('removeItem', target, itemIndex)"
          @image-selected="(event, object) => emit('imageSelected', event, object)"
        />
      </div>
    </div>
  </div>
</template>
