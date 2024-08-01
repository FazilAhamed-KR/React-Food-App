import { useCallback, useEffect, useState } from "react";

const sendHttpRequest = async (url, config) => {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "somthing went wrong, failed to sent request"
    );
  }

  return resData;
};
const useHttp = (url, config, sartingData) => {
  const [data, setData] = useState(sartingData);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const response = await sendHttpRequest(url, { ...config, body: data });
        setData(response);
      } catch (error) {
        setError(error.message || "somthing went worng");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    error,
    isLoading,
    sendRequest,
  };
};

export default useHttp;
