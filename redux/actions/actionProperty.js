import { createAction } from '@reduxjs/toolkit'

export const setProperties = createAction('property/set')
export const removeProperty = createAction('property/remove')
export const updateProperty = createAction('property/update')

