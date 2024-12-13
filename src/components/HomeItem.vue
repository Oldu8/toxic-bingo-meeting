<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeItem',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput(event: Event) {
      const value = (event.target as HTMLInputElement).value
      this.$emit('update:modelValue', value) // Emit the updated value to the parent
    },
  },
})
</script>

<template>
  <div>
    <label v-if="label" for="input">{{ label }}</label>
    <input id="input" type="text" :value="modelValue" @input="handleInput" />
    <slot></slot>
  </div>
</template>
