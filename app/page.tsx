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
import { install } from "./store/reducers/app";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Home() {
  let theme = createTheme();
  const dispatch = useDispatch<AppDispatch>();
  const app = useSelector((store: RootState) => store.app);
  const [serverUrl, setServerUrl] = useState<string>("");

  useEffect(() => {}, [app.serverUrl]);
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
            {/* <CardHeader
              title={
                <Grid container>
                  <Grid item xs={12} sm={10} md={9} lg={10}>
                    <Typography>{app.serverUrl}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} lg={2}>
                    
                  </Grid>
                </Grid>
              }
              action={
                <Grid container spacing={3} >
                  <Grid item md={4} xs={12} >
                    <Button variant='outlined' color="info"
                      size={useMediaQuery(theme.breakpoints.down("sm")) ? "small" : "medium"}
                      onClick={()=>{
                        dispatch(install({serverUrl: "hien1"}))
                      }}
                      >
                      &nbsp; <Typography>Refesh</Typography>
                    </Button>
                  </Grid>
                  <Grid item  md={8} xs={12}>
                    <Button variant='outlined' size={useMediaQuery(theme.breakpoints.down("sm")) ? "small" : "medium"}>
                      &nbsp; <Typography>View Employee</Typography>
                    </Button>
                  </Grid>
                </Grid>
                
              }
            ></CardHeader> */}
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
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(install({ serverUrl: serverUrl }));
                }}
              >
                {"Install"}
              </Button>
              &nbsp;&nbsp;
              <Link
                href={
                  process.env.BITRIX24_DOMAIN +
                  "oauth/authorize/?client_id=" +
                  process.env.APP_ID +
                  "&response_type=code&redirect_uri=" +
                  window.location.origin
                }
              >
                {window.location.origin}
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
