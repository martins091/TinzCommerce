export const getAuthHeaders = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (userInfo?.token) {
    return {
      Authorization: `Bearer ${userInfo.token}`,
    }
  }
  return {}
}
