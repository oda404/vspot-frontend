
export type ServerResponse<T> = {
    status: number;
    body: {
        msg: string;
        field?: string;
        data?: T;
    };
};
