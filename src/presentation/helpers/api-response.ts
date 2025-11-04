export type ApiMeta = Record<string, any> | null;

export class ApiResponse<T = any> {
    success: boolean;
    message: string;
    data: T | null;
    errors: any | null;
    meta: ApiMeta;
    timestamp: string;

    private constructor(success: boolean, message: string, data: T | null = null, errors: any | null = null, meta: ApiMeta = null) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.errors = errors;
        this.meta = meta;
        this.timestamp = new Date().toISOString();
    }

    static success<T = any>(message = 'OK', data: T | null = null, meta: ApiMeta = null) {
        return new ApiResponse<T>(true, message, data, null, meta);
    }

    static error(message = 'Error', errors: any | null = null, meta: ApiMeta = null) {
        return new ApiResponse(false, message, null, errors, meta);
    }
}