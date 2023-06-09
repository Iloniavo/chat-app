import React from "react";
import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useAuthStore, useLoginStore } from "../hooks";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUser } from "../provider/AuthProvider";
import Cookies from "js-cookie";

export default function SignUp() {
  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup.string().required("Password is required"),
    bio: yup.string().required("Bio is required"),
    name: yup.string().required("Name is required"),
    confirmPassword: yup
      .string()
      .required("Confirm your password")
      .oneOf([yup.ref("password")], "Password does not matches"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
    shouldUnregister: false,
    criteriaMode: "all",
  });

  const router = useRouter();

  const SignUp = async (data: any) => {
    await createUser(data)
      .then((response) => {
        response.data
          ? Cookies.set("token", response.data.user.token)
          : console.log("Tsy mety");
        router.push("/profile");
      })
      .catch((error) => console.error(error));
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
          <form onSubmit={handleSubmit(SignUp)}>
            <Box sx={{ mt: 1 }}>
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
                  name="email"
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
                  name="password"
                  variant="outlined"
                  {...register("password")}
                  name="password"
                  error={errors.password} // Utilisez errors.password au lieu de errors.name
                  helperText={errors.password?.message} //
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
                  label="Confirm password"
                  name="confirmPassword"
                  variant="outlined"
                  {...register("confirmPassword")}
                  error={errors.confirmPassword}
                  helperText={errors.confirmPassword?.message} //
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                  id="filled-basic"
                  type="text"
                  label="Name"
                  variant="outlined"
                  {...register("name")}
                  error={errors.name}
                  helperText={errors.name?.message}
                  name={"name"}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                  id="filled-basic"
                  type="text"
                  label="Bio"
                  variant="outlined"
                  {...register("bio")}
                  error={errors.bio}
                  helperText={errors.bio?.message}
                  name={"bio"}
                />
              </Grid>

              <Stack direction="column" spacing={2}>
                <Button
                  sx={{ fontSize: "2vh" }}
                  fullWidth
                  variant="contained"
                  type="submit"
                  className="registerButton"
                >
                  Register
                </Button>
                <Stack
                  direction="column"
                  spacing={2}
                  sx={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Grid item xs={12}>
                    <Link href={"/login"}>Already have an account ?</Link>
                  </Grid>
                </Stack>
              </Stack>
            </Box>
          </form>
        </div>
      </Box>
    </div>
  );
}
