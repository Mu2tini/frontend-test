<template>
  <q-card
    flat
    bordered
    class="q-mt-md"
  >

    <q-card-section>
      <div class="text-h6">{{truckDriver.name}}</div>
      <div class="text-subtitle2">{{truckDriver.email}}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div>Months of driving experience <q-badge>{{truckDriver.drivingExperienceMonths}}</q-badge>
      </div>
      <div>Has valid driving license
        <q-icon
          name="check_circle"
          size="sm"
          color="green"
          v-if="truckDriver.hasValidDrivingLicense"
        />
        <q-icon
          v-else
          size="sm"
          name="cancel"
          color="red"
        />
      </div>
      <div>Number of moving violations <q-badge>{{truckDriver.numberOfMovingViolations}}</q-badge>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'truck-driver-card',
  props: {
    truckDriver: {
      type: Object,
      required: true
    }
  }
})
</script>