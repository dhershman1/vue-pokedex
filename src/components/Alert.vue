<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'error'
  },
  text: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div :class="['alert', `alert--${props.type}`]">
    <vue-feather type="x-circle" />
    <p>{{ props.text }}</p>
  </div>
</template>

<style scoped>
.alert {
  border-radius: 5px;
  border: 1px solid var(--char);
  margin-bottom: 1rem;
  width: 50%;
}

.alert i {
  padding: 1rem;
}

.alert p {
  margin: 0 1rem 1rem 1rem;
}

.alert--error {
  color: var(--lightgrey);
  background-color: var(--error);
  border-color: var(--error);
}

@media only screen and (max-width: 768px) {
  .alert {
    width: 100%;
  }
}
</style>
