"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useState } from "react";
import oauthApi from "../api/oauth2";
import installApi from "../api/install";
import { changeServerUrl } from "../api/axiosClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [serverUrl, setServerUrl] = useState<string>("");
  const installApp = async () => {
    try {
      changeServerUrl(serverUrl);
      const res = await installApi.testConnect();

      if (res.data.message === "ok") {
        localStorage.setItem("serverUrl", serverUrl);
        toast.success("Cài ứng dụng thành công");
        router.push("/");
      } else {
        throw new Error("Wrong server address");
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  return (
    <Box sx={{ m: 2 }}>
      <Grid container spacing={0} rowGap={4}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Grid container>
                  <Grid item xs={12} sm={10} md={9} lg={10}>
                    Bài kiểm tra trung cấp
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} lg={2}></Grid>
                </Grid>
              }
            ></CardHeader>
          </Card>
        </Grid>
        <Grid item xs={12} style={{ height: "20rem" }}>
          <Card style={{ height: "100%" }}>
            <CardContent>
              <TextField
                label={"Địa chỉ server"}
                variant="outlined"
                name="serverUrl"
                defaultValue={""}
                sx={{ width: "45%" }}
                onChange={(e) => {
                  setServerUrl(e.target.value);
                }}
              />
              &nbsp;
              <Button variant="contained" onClick={installApp}>
                {"Install"}
              </Button>
              &nbsp;&nbsp;
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
