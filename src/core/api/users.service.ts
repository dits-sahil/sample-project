import { endpoints } from "./endpoints";
import api from "./interceptor";

const getAllUsers = () => {
  return api.get(endpoints.ALL_USERS);
};

const updateUser = (id:number | string,data:any) => {
  return api.put(`${endpoints.UPDATE_USER}/${id}`,data);
};


export default { getAllUsers, updateUser };