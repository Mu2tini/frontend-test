<template>
  <q-page>
    <div
      v-if="job"
      class="q-ma-md column text-grey-9"
      style="max-width: 500px;"
    >
      <h6 class="q-ma-none">{{job.companyName}}</h6>
      <q-img
        style="max-width:500px; border-radius: 5px; margin-bottom: 15px;"
        src="http://assets.vg247.com/current//2016/02/american_truck_simulator_kenworth_w900.jpg"
        alt="truck"
      />
      <h4 class="q-ma-none">{{job.title}}</h4>

      <h5 class="q-ma-none text-green">&#36; {{job.payPerWeek}}/week</h5>
      <ul class="q-px-md">
        <li>Min driving experience in months <q-badge>{{job.requirements.minDrivingExperienceMonths}}</q-badge>
        </li>
        <li>Requires valid driving license
          <q-icon
            name="check_circle"
            size="sm"
            color="green"
            v-if="job.requirements.requireValidDrivingLicense"
          />
          <q-icon
            v-else
            size="sm"
            name="cancel"
            color="red"
          />
        </li>
        <li>Max number of moving violations <q-badge>{{job.requirements.maxNumberOfMovingViolations}}</q-badge>
        </li>
      </ul>
      <p class="text-body1">{{job.description}}</p>
      <q-btn
        @click="createApplication"
        :disabled="job.applied"
        :label="job.applied ? `Already Applied ${formatTimeStamp(job.applicationTimestamp)}` : 'Create Application'"
        color="green"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { api } from '../boot/axios'
import { formatTimeStamp } from '../utilities/filters'

export default defineComponent({
  name: 'job-details-page',
  setup () {
    const route = useRoute()
    const store = useStore()

    store.dispatch('driver/getJob', route.params)
    const job = computed(() => store.state.driver.job)

    let createApplication = () => {
      let newApplication = {
        truckDriverId: route.params.driverId,
        jobId: route.params.jobId,
        applicationTimestamp: Date.now()
      }

      api.post('applications', newApplication)
        .then(res => {
          store.commit('driver/setAppliedToJob', { applied: true, timeStamp: Date.now() })
          store.dispatch('driver/getApplications')
        }).catch(err => console.err(err))
    }

    return { job, createApplication, formatTimeStamp }
  }
})
</script>
