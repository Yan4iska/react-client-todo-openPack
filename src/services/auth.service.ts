import { instance } from "../api/axios.api"
import { IUserData, IResponseUserData } from "../types/types"
export const AuthService = {
    async registration (userData: IUserData): Promise<IResponseUserData | undefined> {
        const {data} = await instance.post< IResponseUserData>('user', userData)
        return data
    },
    async login() {},
    async getMe() {},

}