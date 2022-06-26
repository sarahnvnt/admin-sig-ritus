import axios from "axios";

const BASE_URL = "https://api-sig.herokuapp.com/api/";
// const TOKEN =
//     JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//         .currentUser === null
//         ? ""
//         : JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//               .currentUser.accessToken;
// const TOKEN =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjdkNWZkMDM0MjMyM2ZmODlhZDFjNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNTI1NTgzNiwiZXhwIjoxNjM1NTE1MDM2fQ.azxlE9NUbxrwXzbaR22IzVZN-CGAGnV6mNsL2ig6B3o";

// console.log(
//     JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//         .currentUser.accessToken
// );

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
