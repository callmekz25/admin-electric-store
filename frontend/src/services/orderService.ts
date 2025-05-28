import httpRequest from "@/config/axios.config";

export const getOrders = async () => {
  try {
    const { data } = await httpRequest.get("/hoa-don");
    return data;
  } catch (error) {
    console.log(error);
  }
};
