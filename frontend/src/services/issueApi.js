import axios from "axios";

export const createIssue = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    "http://localhost:5000/api/issues",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return res.data;
};
