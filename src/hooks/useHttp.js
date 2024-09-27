import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong");
  }
  return resData;
}

export default function useHttp() {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useCallback(async function sendRequest() {
    setLoading(true);
    try {
      const resData = sendHttpRequest();
      setData(resData);
    } catch (error) {
      setError(error.message || "Something went wrong");
    }
    setLoading(false);

    useEffect(()=>{
        sendRequest()
    }, [sendRequest])

    return {
      data,
      loading,
      error
    };
  }, [])
}
