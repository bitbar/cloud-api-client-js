# List of Working and Tested Resources

Note, that below table assumes that API Client instance is in `apiClient` variable.

Resource | Call | Comment
--- | --- | ---
`/me` | `apiClient.me()` |
`/user-sessions/login` | `apiClient.userSession().login({ ... })` | this method already sets `POST` method
`/user-sessions/logout` | `apiClient.userSession().logout()` | this method already sets `POST` method
`/users/activate` | `apiClient.users().activate()` |
`/users/recoveries` | `apiClient.users().recoveries()` |
`/users/password-recovery` | `apiClient.users().passwordRecovery()` |
`/users/reset-api-key` | `apiClient.users().resetApiKey()` |
`/users/validateVatId` | `apiClient.users().validateVatId()` | resource URL is proper - no idea why only this one is in _camelCase_
`/me/billing-periods/{bpId}/receipt` | `apiClient.me().billingPeriod(bpId).receipt()` |
`/users/{uId}/billing-periods/{bpId}/receipt` | `apiClient.user(uId).billingPeriod(bpId).receipt()` |
