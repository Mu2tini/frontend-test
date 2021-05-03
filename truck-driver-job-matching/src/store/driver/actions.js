import { api } from '../../boot/axios'

export function getTruckDrivers (context) {
    return api.get('truckDrivers')
        .then(res => {
            context.commit('setTruckDrivers', res.data)
        }).catch(err => console.log(err))
}

export function getJobs (context) {
    return api.get('jobs')
        .then(res => {
            context.commit('setJobs', res.data)
        }).catch(err => console.log(err))
}

export function getJob (context, params) {
    return api.get(`jobs/${params.jobId}`)
        .then(res => {
            const appliedJob = context.getters.applications.find(a => a.truckDriverId === params.driverId && a.jobId == params.jobId)
            if (appliedJob) {
                context.commit('setJob', { ...res.data, applied: true, applicationTimestamp: appliedJob.applicationTimestamp })
            } else {
                context.commit('setJob', { ...res.data, applied: false, applicationTimestamp: '' })
            }

        }).catch(err => console.log(err))
}

export function getApplications (context) {
    return api.get('applications')
        .then(res => {
            context.commit('setApplications', res.data)
        }).catch(err => console.log(err))
}

