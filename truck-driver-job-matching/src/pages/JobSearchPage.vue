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

        <truck-driver-card
          v-if="selectedTruckDriver"
          :truckDriver="selectedTruckDriver"
        ></truck-driver-card>
      </div>

      <div
        class="col-8"
        style="border-left: 1px solid #CCC"
      >
        <h5 class="q-pa-none q-ma-md">Jobs that meet driver requirements</h5>
        <jobs-list
          v-if="selectedTruckDriver"
          :jobs="filteredJobs"
          :driverId="selectedTruckDriver.id"
        ></jobs-list>
      </div>

    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import TruckDriverCard from '../components/TruckDriverCard.vue'
import JobsList from '../components/JobsList.vue'

export default defineComponent({
  name: 'job-search-page',
  components: {
    TruckDriverCard,
    JobsList
  },
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
