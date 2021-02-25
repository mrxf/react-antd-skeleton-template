import { useEffect } from "react";
import useSWR from "swr";

export function useValuePool() {
  const { isValidating: loading, data, mutate } = useSWR(
    "/antd/value-pool/config",
    {
      revalidateOnMount: false,
    }
  );

  useEffect(() => {
    if (!data) {
      mutate();
    }
  }, [data, mutate]);

  return { loading, data: data ? data.data.result : {}, refresh: mutate };
}
