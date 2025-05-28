import httpRequest from "@/config/axios.config";

export const getProducts = async () => {
  try {
    const { data } = await httpRequest.get("/san-pham");
    return data;
  } catch (error) {
    console.log(error);
  }
};
