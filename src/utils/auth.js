import Cookies from 'js-cookie'

const TokenKey = 'hrsass-token'
const TimeOutKey = 'time-out-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 获取得到存入token的时间戳
export function getTokenTime () {
  return Cookies.get(TimeOutKey)
}

// 设置得到token时间戳
export function setTokenTime () {
  Cookies.set(TimeOutKey, Date.now())
}