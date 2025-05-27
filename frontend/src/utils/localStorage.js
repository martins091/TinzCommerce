// utils/localStorage.js
export const getUserInfoFromStorage = () => {
  try {
    const userInfo = localStorage.getItem('userInfo')
    return userInfo ? JSON.parse(userInfo) : null
  } catch (error) {
    console.error('Error reading userInfo from localStorage', error)
    return null
  }
}

export const setUserInfoToStorage = (userInfo) => {
  try {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  } catch (error) {
    console.error('Error saving userInfo to localStorage', error)
  }
}

export const removeUserInfoFromStorage = () => {
  try {
    localStorage.removeItem('userInfo')
  } catch (error) {
    console.error('Error removing userInfo from localStorage', error)
  }
}
