# List of Working and Tested Resources

Note, that below table assumes that API Client instance is in `apiClient` variable.

## End-User

Resource | Call | Comment
--- | --- | ---
`/me` | `apiClient.me()` |
`/me/account/additional-users` | `apiClient.me().account().additionalUsers()` |
`/me/account/additional-users/{auId}` | `apiClient.me().account().additionalUser(auId)` |
`/me/account/additional-users/{auId}/resend-activation` | `apiClient.me().account().additionalUser(auId).resendActivation()` |
`/me/account/roles` | `apiClient.me().account().roles()` |
`/me/account/roles/{rId}` | `apiClient.me().account().role(rId)` |
`/me/billing-periods` | `apiClient.me().billingPeriods()` |
`/me/billing-periods/{bpId}` | `apiClient.me().billingPeriod(bpId)` |
`/me/billing-periods/{bpId}/receipt` | `apiClient.me().billingPeriod(bpId).receipt()` |
`/me/projects` | `apiClient.me().projects()` |
`/me/projects/{pId}` | `apiClient.me().project(pId)` |
`/me/runs` | `apiClient.me().runs()` |
`/me/statistics` | `apiClient.me().statistics()` |
`/user-sessions/login` | `apiClient.userSession().login({ ... })` | this method already sets `POST` method
`/user-sessions/logout` | `apiClient.userSession().logout()` | this method already sets `POST` method
`/users/activate` | `apiClient.users().activate()` |
`/users/password-recovery` | `apiClient.users().passwordRecovery()` |
`/users/recoveries` | `apiClient.users().recoveries()` |
`/users/reset-api-key` | `apiClient.users().resetApiKey()` |
`/users/validateVatId` | `apiClient.users().validateVatId()` | resource URL is proper - no idea why only this one is in _camelCase_

## Admin

Resource | Call | Comment
--- | --- | ---
`/admin/devices` | `apiClient.admin().devices()` |
`/admin/devices/{dId}` | `apiClient.admin().device(dId)` |
`/admin/device-models` | `apiClient.admin().deviceModels()` |
`/admin/device-models/{dmId}` | `apiClient.admin().deviceModel(dmId)` |
`/admin/interactive-queue` | `apiClient.admin().interactiveQueue()` |
`/admin/overview` | `apiClient.admin().overview()` |
`/clusters` | `apiClient.admin().clusters()` |
`/clusters/{cId}` | `apiClient.admin().cluster(cId)` |
`/clusters/{cId}/devices` | `apiClient.admin().cluster(cId).devices()` |
`/projects` | `apiClient.admin().projects()` |
`/runs` | `apiClient.admin().runs()` |
`/users` | `apiClient.admin().users()` |
