export interface IActivity{
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    city: string;
    venue: string;
}

export interface IActivityFieldsMessages{
    title: string | null;
    description: string | null;
    category: string | null;
    date: string | null;
    city: string | null;
    venue: string | null;
}

export interface IActivityFieldsValidations{
    title: boolean;
    description: boolean;
    category: boolean;
    date: boolean;
    city: boolean;
    venue: boolean;
}