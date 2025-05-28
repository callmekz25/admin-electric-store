import httpRequest from "@/config/axios.config";

export const getTypesProduct = async () => {
  try {
    const { data } = await httpRequest.get("/loai-san-pham");
    return data;
  } catch (error) {
    console.log(error);
  }
};
