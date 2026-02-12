export const ObjectToParams = (obj: { [key: string]: unknown }) => {
  return Object.keys(obj)
    .filter(
      (key) => obj[key] !== undefined || obj[key] !== null || obj[key] !== ""
    )
    .map((key) => key + "=" + obj[key])
    .join("&");
};

export const ParamsToObject = (params: string) => {
  return params.split("&").reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    return { ...acc, [key]: value };
  }, {});
};
