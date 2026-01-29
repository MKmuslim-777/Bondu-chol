import axios from "axios";
import React, { useEffect } from "react";

import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  //   baseURL: "http://localhost:3000",
  baseURL: "https://bondu-col-server.vercel.app",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  //   console.log(user.accessToken);
  const navigate = useNavigate();
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      // config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4MTFiMDdmMjhiODQxZjRiNDllNDgyNTg1ZmQ2NmQ1NWUzOGRiNWQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiT3AgTWFuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lUQTJ6cEMzWnJIME1NUHQyN0gwY1lkYTcyamZxaTZ5THRkNGItWkw4TWwyOFVFRmczPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2VsZXZhdGUtc2Nob2xhci1tayIsImF1ZCI6ImVsZXZhdGUtc2Nob2xhci1tayIsImF1dGhfdGltZSI6MTc2NTc2NTYwMSwidXNlcl9pZCI6Imw3ZXk4ZWxpSk9UTjVTb0pLUXVEZXFrRXFFWTIiLCJzdWIiOiJsN2V5OGVsaUpPVE41U29KS1F1RGVxa0VxRVkyIiwiaWF0IjoxNzY1NzY1NjAxLCJleHAiOjE3NjU3NjkyMDEsImVtYWlsIjoib3BoYWNrZXJ4eHgxMjM0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTE3NDkwNDkwNzk5ODA4OTgwNzQ1Il0sImVtYWlsIjpbIm9waGFja2VyeHh4MTIzNEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.dfXxMQkJL0J8u-e8V9B7nHVsd1MVpZm3S_eiX63aFjfurhqht1bVh-uxruvCBWzs1H_o6XluUl4ndws7XYDaKKN7bCtAmCVQsJVH0FJA4DnyeiSETSCldr3WOADD_s15JX1DrwEQVG5lb08ut0DKReZ5T49WJimYuHAvLvpa2cmkHJ4j4ve3JHuECLO28vnV_tvZ8k6_ta7HIGeQ1gtdSVquLzpfpfo2mcZg8L8_H1LnDPPG91bIUHhZAqJazUpdOaBRnY-zBsjyJAzSPhRpNR0F7hDDIPQJf1N27CCzQP5eSPZSJdSrbr8zk68ahc5y9-wt_zxgCywZ_mpMwglLDg`;

      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);

        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          signOutUser().then(() => {
            navigate("/auth/login");
          });
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
