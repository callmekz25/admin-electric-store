import httpRequest from "@/config/axios.config";

export const getUsers = async () => {
  try {
    const { data } = await httpRequest.get("/tai-khoan");
    return data;
  } catch (error) {
    console.log(error);
  }
};
