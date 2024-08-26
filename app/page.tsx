"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  createTheme,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import installApi from "./api/install";
import { changeServerUrl, serverAxiosClient } from "./api/axiosClient";
import toast from "react-hot-toast";
import { contactApi } from "./api/contact";
import { login } from "./store/reducers/app";

export default function Home() {
  const router = useRouter();
  let theme = createTheme();
  const dispatch = useDispatch<AppDispatch>();
  const app = useSelector((store: RootState) => store.app);
  const [serverUrl, setServerUrl] = useState<string>("");

  const uninstallApp = () => {
    localStorage.removeItem("serverUrl");
    router.push("install");
  };

  const testUserId = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const res = await contactApi.getListContact(+userId);
        if (res) {
          dispatch(login(userId as any));
          router.push("home");
        }
      }
    } catch (error) {}
  };

  const testUrl = async () => {
    try {
      const serverUrl = localStorage.getItem("serverUrl");

      if (!serverUrl) {
        router.push("install");
      } else {
        changeServerUrl(serverUrl);
        const res = await installApi.testConnect();
        if (res.data.message === "ok") {
          toast.success("Kết nối thành công");
        } else {
          throw new Error("Wrong server address");
        }
      }
    } catch (err: any) {
      router.push("/install");
      toast.error(err.message);
    }
  };
  useEffect(() => {
    testUrl();
    testUserId();
  }, []);
  return (
    <Box sx={{ m: 2 }}>
      <Grid container spacing={0} rowGap={4}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              &nbsp;
              <Button variant="contained" onClick={uninstallApp}>
                {"Uninstall"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} style={{ height: "20rem" }}>
          <Card style={{ height: "100%" }}>
            <Button>
              <Link
                href={
                  process.env.BITRIX24_DOMAIN +
                  "oauth/authorize/?client_id=" +
                  process.env.APP_ID +
                  "&response_type=code&redirect_uri=" +
                  window.location.origin
                }
              >
                "Login with bitrix24"
              </Link>
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
