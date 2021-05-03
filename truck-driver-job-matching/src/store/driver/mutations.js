export function setTruckDriver (state, truckDriver) {
    state.truckDriver = truckDriver
}

export function setTruckDrivers (state, truckDrivers) {
    state.truckDrivers = truckDrivers
}

export function setJobs (state, jobs) {
    state.jobs = jobs
}

export function setJob (state, job) {
    state.job = job
}

export function setAppliedToJob (state, payload) {
    state.job.applied = payload.applied
    state.job.applicationTimestamp = payload.timeStamp
}

export function setApplications (state, applications) {
    state.applications = applications
}

