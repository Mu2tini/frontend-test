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
            let applied = context.getters.applications.some(a => a.truckDriverId === params.driverId && a.jobId == params.jobId)
            context.commit('setJob', { ...res.data, applied: applied })
        }).catch(err => console.log(err))
}

export function getApplications (context) {
    return api.get('applications')
        .then(res => {
            context.commit('setApplications', res.data)
        }).catch(err => console.log(err))
}

