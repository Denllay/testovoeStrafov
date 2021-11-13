import axios from "axios";

export const createRequest = axios.create({ baseURL: "https://test-task.shtrafovnet.com/" });
