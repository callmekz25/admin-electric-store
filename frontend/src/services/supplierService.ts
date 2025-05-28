import httpRequest from "@/config/axios.config";

export const getSuppliers = async () => {
  try {
    const { data } = await httpRequest.get("/nha-cung-cap");
    return data;
  } catch (error) {
    console.log(error);
  }
};
