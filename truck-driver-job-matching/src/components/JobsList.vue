<template>
  <q-list separator>
    <q-item
      :to="{name: 'job-details', params: {jobId: job.id, driverId: driverId}}"
      clickable
      v-ripple
      v-for="job in jobs"
      :key="job.id"
      class="q-py-lg"
    >
      <q-item-section>
        <q-item-label class="text-subtitle1">{{job.title}}</q-item-label>
        <q-item-label class="text-overline">{{job.companyName}}</q-item-label>
        <q-item-label class="text-subtitle1 text-green q-pt-md">&#36; {{job.payPerWeek}}/week</q-item-label>
      </q-item-section>
      <q-item-section
        side
        class="text-green"
        v-if="job.applied"
      >
        <q-icon name="playlist_add_check" /> applied {{formatTimeStamp(job.applicationTimestamp)}}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent } from 'vue'
import { formatTimeStamp } from '../utilities/filters'

export default defineComponent({
  name: 'jobs-list',
  props: {
    jobs: {
      type: Array,
      required: true
    },
    driverId: {
      type: String,
      required: true
    }
  },
  setup () {
    return { formatTimeStamp }
  }
})
</script>
