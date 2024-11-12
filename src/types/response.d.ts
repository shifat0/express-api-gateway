import { boolean } from 'zod';

export interface IResponse<T> {
    isSuccess: boolean;
    message: string;
    data: T;
}

export type IPagination = {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    nextPage: number | null;
};

export interface IPaginatedResponse<T> {
    isSuccess: boolean;
    message: string;
    pagination?: IPagination;
    data: T;
}

export interface IErrResponse {
    isSuccess: false;
    message: string | string[];
}
