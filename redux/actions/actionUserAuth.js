import { createAction } from '@reduxjs/toolkit'

export const setUserAuth = createAction('userAuth/set')
export const removeUserAuth = createAction('userAuth/remove')
export const updateUserAuthDoc = createAction('userAuth/updateDoc')
export const updateUserAuthDocFields = createAction('userAuth/updateUserAuthDocField')