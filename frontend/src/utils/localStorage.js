// utils/localStorage.js

export const setUserInfoToStorage = (userInfo, expiresInMs = 3600000) => {
  try {
    const expiresAt = new Date().getTime() + expiresInMs
    const data = { ...userInfo, expiresAt }
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    console.error('Error saving userInfo to localStorage', error)
  }
}

export const getUserInfoFromStorage = () => {
  try {
    const userInfoRaw = localStorage.getItem('userInfo')
    if (!userInfoRaw) return null

    const userInfo = JSON.parse(userInfoRaw)
    const now = new Date().getTime()

    if (userInfo.expiresAt && now > userInfo.expiresAt) {
      removeUserInfoFromStorage()
      return null
    }

    return userInfo
  } catch (error) {
    console.error('Error reading userInfo from localStorage', error)
    return null
  }
}

export const removeUserInfoFromStorage = () => {
  try {
    localStorage.removeItem('userInfo')
  } catch (error) {
    console.error('Error removing userInfo from localStorage', error)
  }
}

export const autoLogout = (onLogout) => {
  const userInfo = getUserInfoFromStorage()
  if (!userInfo || !userInfo.expiresAt) return

  const now = new Date().getTime()
  const timeout = userInfo.expiresAt - now

  if (timeout <= 0) {
    removeUserInfoFromStorage()
    onLogout?.()
    return
  }

  setTimeout(() => {
    removeUserInfoFromStorage()
    onLogout?.()
  }, timeout)
}
