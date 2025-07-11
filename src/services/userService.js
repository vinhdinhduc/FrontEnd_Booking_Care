import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", {
    email,
    password,
  });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  console.log("Check data from service");

  return axios.post("/api/create-new-user", data);
};
const deleteUser = (userId) => {
  console.log(userId);

  return axios.delete("/api/delete-user", {
    data: { id: userId },
  });
};
const updateUser = (inputData) => {
  console.log("edit user", inputData);

  return axios.put("/api/edit-user", inputData);
};
const getAllCodeService = (inputType) => {
  return axios(`/api/allcode?type=${inputType}`);
};

const getTopDoctorService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
  return axios.get("/api/get-all-doctors");
};
const saveInfoDoctor = (data) => {
  return axios.post("/api/save-info-doctor", data);
};

const getDetailDoctorById = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUser,
  updateUser,
  getAllCodeService,
  getTopDoctorService,
  getAllDoctors,
  saveInfoDoctor,
  getDetailDoctorById,
};
