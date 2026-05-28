import { useState } from 'react';
import axios from 'axios';
export function useRequest({ url, method, body }) {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const response = await axios[method](url, body,onSuccess);
            if(onSuccess){
                onSuccess(response.data);
            }
            return response.data;
        }   catch (err) {
            console.log(err);
            setErrors(<div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
              <div className="flex flex-col gap-1"> 
                <span className="font-semibold text-red-500">Error:</span>
                <ul className="list-disc pl-5">
                    {err.response.data.errors.map((error) => (
                    <li key={error.message}>
                        {error.message}
                    </li>
                    ))}
                </ul>
                </div>
            </div>);
        }
    };

    return { doRequest, errors };
};   