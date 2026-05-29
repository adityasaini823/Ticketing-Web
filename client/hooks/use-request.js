import { useState } from 'react';
import axios from 'axios';
export function useRequest({ url, method, body, onSuccess }) {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const response = await axios[method](url, body, {
                withCredentials: true,
            });

            if (onSuccess) {
                onSuccess(response.data);
            }
            console.log('Response from API:', response.data);
            return response.data;
        } catch (err) {
            console.error(err);

            const apiErrors = err?.response?.data?.errors;
            setErrors(
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold text-red-500">Error:</span>
                        <ul className="list-disc pl-5">
                            {Array.isArray(apiErrors) && apiErrors.length > 0 ? (
                                apiErrors.map((error) => (
                                    <li key={error.message || Math.random()}>
                                        {error.message || 'An error occurred'}
                                    </li>
                                ))
                            ) : (
                                <li>An unexpected error occurred. Please try again.</li>
                            )}
                        </ul>
                    </div>
                </div>
            );
        }
    };

    return { doRequest, errors };
};   