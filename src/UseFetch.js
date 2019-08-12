import { useEffect, useState } from "react";

/**
 * Utility function to make fetching data from a RESTful
 * api and updating state simpler.
 *
 * @param host {string} name of host
 * @param port {string} host's port
 * @param url {string} resource url relative to host:port/ which
 * we whish to query
 * @param defaultData {obj} - Default data for useState call
 *
 * @returns managed state variable, which will be updated asynchronously
 */
function useFetch(host, port, url, defaultData) {
  const [data, updateData] = useState(defaultData);
  const query = `http://${host}:${port}/${url}`;
  useEffect(async () => {
    const resp = await fetch(query);
    const json = await resp.json();
    updateData(json);
  }, [url]);

  return data;
}

export default useFetch;
