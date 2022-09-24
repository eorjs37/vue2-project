import apiInstance from "@/utils/axios";

const login = (param) => {
    return apiInstance.post("/api/ionic/user/login", param);
};

export { login };
