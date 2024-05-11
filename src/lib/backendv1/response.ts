
export type ServerResponse<T = null> = {
    status: number;
    body: {
        msg: string;
        field?: string;
        data?: T;
    };
};
