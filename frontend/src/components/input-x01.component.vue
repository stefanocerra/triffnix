<template>
    <q-card class="full-height q-pa-sm">
      <div class="row q-col-gutter-md full-height">
        <div class="col-2" v-for="n in 21" :key="n">
          <q-btn
            @click="$emit('thrownNumber', n -1)"
            class="full-width full-height"
            color="primary"
            :label="n -1" />
        </div>
        <div class="col-2">
          <q-btn
            @click="$emit('thrownNumber', 25)"
            class="full-width full-height"
            color="primary"
            label="25"
          />
        </div>
        <div class="col-4">
          <q-btn disable class="full-width full-height" color="negative" label="Zurück" />
        </div>
        <div class="col-6">
          <q-btn
            @click="$emit('clickedFactor', 2)"
            class="full-width full-height"
            color="amber"
            label="Double" />
        </div>
        <div class="col-6">
          <q-btn
            @click="$emit('clickedFactor', 3)"
            class="full-width full-height"
            color="orange" label="Triple" />
        </div>
      </div>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputX01Component',
})
</script>
