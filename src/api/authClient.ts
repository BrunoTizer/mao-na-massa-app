import axios from "axios";

const authClient = axios.create({
  baseURL: "http://20.63.88.224:8080",
});

export { authClient };
