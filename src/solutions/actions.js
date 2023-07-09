import {BUG_ADDED, BUG_REMOVED, BUG_RESOLVED} from './actionTypes'

export function bugAdded(description) {
    return {
        type: BUG_ADDED,
        payload :{
            description: description
        }
    }
}

export function bugResolved(id) {
    return {
        type: BUG_RESOLVED,
        payload :{
            id: id,
        }
    }
}

export function bugRemoved(id) {
    return {
        type: BUG_REMOVED,
        payload: {
            id: id
        }
    }
}