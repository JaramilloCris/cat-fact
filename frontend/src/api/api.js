import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const registerUser = async (username) => {
  const response = await api.post("/register/", { username });
  return response.data;
};

export const loginUser = async (username) => {
  const response = await api.post("/login/", { username });
  return response.data;
};

export const likeCatFact = async (userId, catFactId) => {
  const response = await api.post("/catfact/like/", {
    user_id: userId,
    cat_fact_id: catFactId,
  });
  return response.data;
};

export const getLikedCatFacts = async (userId) => {
  const response = await api.get(`/user/${userId}/likes/`);
  return response.data;
};

export const getPopularCatFacts = async () => {
  const response = await api.get("/catfacts/popular/");
  return response.data;
};
