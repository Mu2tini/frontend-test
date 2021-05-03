import { date } from 'quasar'

export function formatTimeStamp (timeStamp) {
    return timeStamp ? date.formatDate(timeStamp, 'D MMM HH:mm') : ''
}