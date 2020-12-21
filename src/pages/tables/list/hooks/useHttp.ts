import { http } from "src/utils/http";
import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { method } from "lodash";

interface IConfig {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  deps?: any[];
  manual?: boolean;
}

export const useHttp = (req: string | AxiosRequestConfig, config?: IConfig) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(undefined);
  const didInitRequestRef = useRef<boolean>(false);

  const run = useCallback(
    async (data?: any) => {
      if (req) {
        setLoading(true);
        let axiosConfig: AxiosRequestConfig = {};
        if (typeof req === "string") {
          axiosConfig = {
            method: "GET",
            url: req,
            params: data,
          };
        } else {
          const append = req.method !== "GET" ? { data } : { params: data };
          axiosConfig = { ...append, ...req };
        }
        try {
          const result = await http(axiosConfig);
          setData(result);
          config?.onSuccess?.(result);
        } catch (e) {
          config?.onError?.(e);
        }

        setLoading(false);
      }
    },
    [req, config]
  );

  useEffect(() => {
    if (config?.manual) {
      if (didInitRequestRef.current) {
        run(config?.deps);
      } else {
        didInitRequestRef.current = true;
      }
    } else {
      run(config?.deps);
    }
  }, [config?.deps, config?.manual]);

  return { data, loading, run };
};
