export interface ApiResponse<T> {
    status: 'success' | 'error';
    message: string;
    count?: number;
    data?: T;
}