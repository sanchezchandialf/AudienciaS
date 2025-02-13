const API_URL: Readonly<string> ="https://localhost:7255/api";

interface FetchApiParams {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  payload?: Record<string, any> | FormData | string;
  requiresAuth?: boolean;
  contentType?: string;
  token?: string;
}

interface FetchApiResponse<T = any> {
  code: number;
  data: T | null;
  message: string;
}

const createFetchApi = () => {
  return async function FetchApi<T = any>({
    path,
    method,
    payload,
    requiresAuth = false,
    contentType,
    token,
  }: FetchApiParams): Promise<FetchApiResponse<T>> {
    const headers: Record<string, string> = {
      "Content-Type": contentType || "application/json",
    };

    let url = `${API_URL}${path}`;

    if (requiresAuth) {
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      } else {
        return { code: 401, data: null, message: "Authentication required" };
      }
    }

    let body: BodyInit | null = null;
    if (method === "GET" && payload !== undefined) {
      if (typeof payload === "object" && !(payload instanceof FormData)) {
        const queryString = new URLSearchParams(payload as Record<string, string>).toString();
        url += `?${queryString}`;
      } else {
        url += `?${String(payload)}`;
      }
    } else if (payload instanceof FormData) {
      body = payload;
    } else if (payload !== undefined) {
      body = JSON.stringify(payload);
    }

    const options: RequestInit = {
      method,
      headers,
      body: method !== "GET" ? body : null,
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        return { code: response.status, data: null, message: errorData.message || "Error en la solicitud" };
      }

      if (method === "DELETE") {
        return { code: response.status, data: null, message: "Success" };
      }

      const responseData: any = await response.json();
      return {
        code: response.status,
        data: responseData.data ?? responseData,
        message: "Success",
      };
    } catch (error) {
      return { code: 500, data: null, message: "Network error" };
    }
  };
};

export const FetchApi = createFetchApi();
