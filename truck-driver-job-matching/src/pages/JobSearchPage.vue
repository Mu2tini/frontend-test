<template>
  <q-page>
    <div class="row">
      <div class="col-4 q-pa-md window-height">
        <q-select
          outlined
          v-model="selectedTruckDriver"
          use-input
          option-label="name"
          hide-selected
          fill-input
          label="Search for truck driver..."
          input-debounce="0"
          :options="filteredTruckDrivers"
          @filter="filterFn"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-card
          flat
          bordered
          class="q-mt-md"
          v-if="selectedTruckDriver"
        >

          <q-card-section>
            <div class="text-h6">{{selectedTruckDriver.name}}</div>
            <div class="text-subtitle2">{{selectedTruckDriver.email}}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div>Months of driving experience <q-badge>{{selectedTruckDriver.drivingExperienceMonths}}</q-badge>
            </div>
            <div>Has valid driving license
              <q-icon
                name="check_circle"
                size="sm"
                color="green"
                v-if="selectedTruckDriver.hasValidDrivingLicense"
              />
              <q-icon
                v-else
                size="sm"
                name="cancel"
                color="red"
              />
            </div>
            <div>Number of moving violations <q-badge>{{selectedTruckDriver.numberOfMovingViolations}}</q-badge>
            </div>
          </q-card-section>
        </q-card>

      </div>
      <div
        class="col-8"
        style="border-left: 1px solid #CCC"
      >
        <h5 class="q-pa-none q-ma-md">Jobs that meet driver requirements</h5>
        <q-list
          separator
          v-if="selectedTruckDriver"
        >
          <q-item
            :to="{name: 'job-details', params: {jobId: job.id, driverId: selectedTruckDriver.id}}"
            clickable
            v-ripple
            v-for="job in filteredJobs"
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
              <q-icon name="playlist_add_check" /> applied
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'job-search-page',
  setup () {
    const store = useStore()

    const truckDrivers = computed(() => store.state.driver.truckDrivers)
    const applications = computed(() => store.state.driver.applications)
    const jobs = computed(() => store.state.driver.jobs)

    let filteredTruckDrivers = ref([...truckDrivers.value])
    let filteredJobs = ref([])
    let selectedTruckDriver = ref(null)


    watch(selectedTruckDriver, (val) => {

      store.commit('driver/setTruckDriver', val)

      if (val.hasValidDrivingLicense) {
        filteredJobs.value = jobs.value.filter(j => (j.requirements.minDrivingExperienceMonths <= val.drivingExperienceMonths && j.requirements.maxNumberOfMovingViolations >= val.numberOfMovingViolations))
      } else {
        filteredJobs.value = jobs.value.filter(j => (j.requirements.minDrivingExperienceMonths <= val.drivingExperienceMonths && j.requirements.maxNumberOfMovingViolations >= val.numberOfMovingViolations && !j.requirements.requireValidDrivingLicense))
      }

      filteredJobs.value = filteredJobs.value.map(j => {
        let applied = applications.value.some(a => a.truckDriverId === val.id && a.jobId == j.id)
        return { ...j, applied: applied }
      })

    })

    selectedTruckDriver.value = store.state.driver.truckDriver

    let filterFn = (val, update) => {
      update(() => {
        const needle = val.toLocaleLowerCase()
        filteredTruckDrivers.value = truckDrivers.value.filter(v => v.name.toLocaleLowerCase().indexOf(needle) > -1)
      })
    }

    return {
      selectedTruckDriver,
      filteredTruckDrivers,
      filterFn,
      filteredJobs
    }
  }
})
</script>
