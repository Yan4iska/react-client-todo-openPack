export interface IUser{
    id: number
    email: string
    token: string

}

export interface IUserData{
    email: string,
    password: string
}
export interface  IResponseUser{
    email: string
    id: number
    createdAt: string
    updatedAt: string
    password: string
}
export interface IResponseUserData{
    token: string
    user: IResponseUser
}

export interface ICategory{
    title: string
    id: number
    createdAt: string
    updatedAt: string
    problems: []
}

export type Id = string | number;

export interface IColumn{
    title: string
    id: number
    createdAt: string
    updatedAt: string
    problems: []
}

export interface IProblem{
    id: number
    title: string
    content: string
    status: boolean
    createdAt: string
    updatedAt: string
    category: ICategory
    descendants: IProblem[]
    parent: IProblem

}