import { endpoints } from "./endpoints";
import api from "./interceptor";

const handleLogin = (values: any) => {
  return api.post(endpoints.LOGIN, values);
};

const handleRegister = (values: any) => {
  return api.post(endpoints.REGISTER, values);
};

export default {handleLogin, handleRegister};