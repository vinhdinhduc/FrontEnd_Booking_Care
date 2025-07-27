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
  return axios.post("/api/create-new-user", data);
};
const deleteUser = (userId) => {
  return axios.delete("/api/delete-user", {
    data: { id: userId },
  });
};
const updateUser = (inputData) => {
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
const bulkCreateSchedule = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};
const getScheduleDoctorByDate = (doctorID, date) => {
  return axios.get(
    `/api/get-schedule-by-date?doctorId=${doctorID}&date=${date}`
  );
};
const getExtraInfoById = (doctorID) => {
  return axios.get(`/api/get-extra-info-by-id?doctorId=${doctorID} `);
};
const getProfileDoctorById = (doctorID) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorID} `);
};
const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};
const postVerifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};
const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};
const getAllSpecialty = () => {
  return axios.get("/api/get-specialty");
};
const getDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};
const getAllClinic = () => {
  return axios.get("/api/get-clinic");
};
const getDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}}`);
};

const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};
const getPatientAppointment = (doctorId, date) => {
  return axios.get(
    `/api/get-patient-appointment?doctorId=${doctorId}&date=${date}`
  );
};

const postSendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
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
  bulkCreateSchedule,
  getScheduleDoctorByDate,
  getExtraInfoById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getDetailClinicById,
  getPatientAppointment,
  postSendRemedy,
};
