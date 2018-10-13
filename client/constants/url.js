import { IP, PORT } from './config'
const SERVER = `http://${IP}:${PORT}`

export const URL_USER_SIGNIN = `${SERVER}/user/signin`
export const URL_USER_SIGNUP = `${SERVER}/user/signup`

export const URL_COMPETITION_GET = `${SERVER}/api/competition/get`
export const URL_COMPETITION_GETALL = `${SERVER}/api/competition/getall`
export const URL_COMPETITION_CREATE = `${SERVER}/api/competition/create`
