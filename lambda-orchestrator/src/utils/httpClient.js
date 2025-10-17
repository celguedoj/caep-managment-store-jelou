export const httpClient = async (url, options = {}) => {
    const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        method: options.method || 'GET',
        body: options.body,
    });

    let data = null;
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    return { ok: res.ok, status: res.status, data };
};
