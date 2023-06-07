import React, {  useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
//import FacebookIcon from "@mui/icons-material/FacebookRounded";
//import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { Box, Grid, Link, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useGoogleAuth } from "../hooks";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from 'js-cookie';
import axios from "axios";
import {loginWithEmail} from "../provider/AuthProvider";


export default function Login() {
  const router = useRouter();
  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup.string().required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema), mode: "all" });

  const login = async (user) => {
     await loginWithEmail(user)
          .then((response) => {
           response.data ? Cookies.set('token', response.data.user.token): console.log("Tsy mety");
            router.push("/profile")
          })
  };

  return (
    <div
      style={{
        width: "60%",
        margin: "auto",
        position: "relative",
        background: "none",
      }}
    >
      <Box
        maxWidth={"xl"}
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="input"
          style={{
            width: "50%",
            marginTop: "1rem",
          }}
        >
          <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(login)}>
            <Grid item xs={8}>
              <TextField
                margin="normal"
                fullWidth
                required
                autoFocus
                id="filled-basic"
                type="email"
                label="Email"
                variant="outlined"
                sx={{ color: "whitesmoke" }}
                {...register("email")}
                error={errors.email}
                helperText={errors.email?.message}
                name={"email"}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                margin="normal"
                required
                fullWidth
                autoFocus
                id="filled-basic"
                type="password"
                label="Password"
                variant="outlined"
                {...register("password")}
                name="password"
                error={errors.password} // Utilisez errors.password au lieu de errors.name
                helperText={errors.password?.message} //
              />
            </Grid>

            <Stack direction="column" spacing={2}>
              <Button
                sx={{ fontSize: "2vh" }}
                fullWidth
                variant="contained"
                type="submit"
              >
                Sign in
              </Button>

              <Grid item xs={8}>
                <Typography
                  sx={{
                    marginLeft: "40%",
                  }}
                >
                  Or sign in with
                </Typography>
              </Grid>
              <Stack
                direction="column"
                spacing={2}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Grid item xs={8}>
                  <Button
                    sx={{ width: "10vw", fontSize: "0.8rem" }}
                    fullWidth
                    onClick={() => useGoogleAuth(router)}
                    variant="contained"
                    color="error"
                  >
                    <span> Google</span> <GoogleIcon />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Link href={"/sign-up"}>Don't have an account ?</Link>
                </Grid>
                {/**  <Grid item xs={12} sm={4}>
                  <Button
                    sx={{ width: "10vw", fontSize: "0.8rem" }}
                    onClick={() => signInWithGithub(router)}
                    variant="contained"
                    color="secondary"
                  >
                    <span> github</span> <GitHubIcon />{" "}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    sx={{ width: "10vw", fontSize: "0.8rem" }}
                    onClick={() => signInWithFacebook(router)}
                    variant="contained"
                    color="primary"
                  >
                    <span> facebook</span> <FacebookIcon />
                  </Button>
                </Grid>
              */}
              </Stack>
            </Stack>
          </Box>
        </div>
      </Box>
    </div>
  );
}
