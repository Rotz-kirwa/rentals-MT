export class ApiError extends Error {
  statusCode: number;
  code?: string;
  detail?: string;

  constructor(message: string, statusCode: number, code?: string, detail?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.detail = detail;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}, token?: string | null): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`/api/v1${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(
      data.detail || data.title || data.message || 'An unexpected error occurred.',
      res.status,
      data.code,
      data.detail
    );
  }

  return data as T;
}

export const apiClient = {
  get: <T = any>(endpoint: string, token?: string | null) => request<T>(endpoint, { method: 'GET' }, token),
  post: <T = any>(endpoint: string, body?: any, token?: string | null) => request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }, token),
  patch: <T = any>(endpoint: string, body?: any, token?: string | null) => request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }, token),
  delete: <T = any>(endpoint: string, token?: string | null) => request<T>(endpoint, { method: 'DELETE' }, token),
};

export const api = apiClient;
