export interface Handler {
    data: {
        'token': string,
        'id': string
    };
    message: string;
    status: number;
}