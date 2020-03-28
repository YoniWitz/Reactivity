export interface IUser {
    displayName: string;
    userName: string;
    token: string;
    image?: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface ILoginUserFieldsMessages {
    email: string | null;
    password: string | null;
}

export interface ILoginUserFieldsValidations {
    email: boolean;
    password: boolean;
}

export interface IRegisterUser {
    email: string;
    displayName: string;
    userName: string;
    password: string;
}

export interface IRegisterUserFieldsValidations {
    email: boolean;
    displayName: boolean;
    userName: boolean;
    password: boolean;
}

export interface IRegisterUserFieldsMessages {
    email: string | null;
    displayName: string | null;
    userName: string | null;
    password: string | null;
}

