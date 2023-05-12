import React from "react";
import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useGoogleAuth, useLoginStore } from "../hooks";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import axios, { AxiosError, AxiosResponse } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function SignUp() {
  const { email, setEmail, password, setPassword, name, setName, bio, setBio } =
    useLoginStore();
  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup.string().required("Password is required"),
    bio: yup.string().required("Bio is required"),
    name: yup.string().required("Name is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  const router = useRouter();

  const SignUp = async () => {
    await axios
      .post("http://localhost:8080/users", {
        email: email,
        password: password,
        bio: bio,
        name: name,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.user.token);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        setPassword("");
        setBio("");
        setName("");
        setEmail("");
        router.push("/home");
      })
      .catch((error: AxiosError) => console.log(error.message));
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
          <Box component="form" sx={{ mt: 1 }}>
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
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                sx={{ color: "whitesmoke" }}
                inputRef={...register("email")}
                error={errors.name}
                helperText={errors.name?.message}
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
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                inputRef={...register("password")}
                error={errors.name}
                helperText={errors.name?.message}
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
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                inputRef={...register("name")}
                error={errors.name}
                helperText={errors.name?.message}
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
                value={bio}
                onChange={(e: any) => setBio(e.target.value)}
                inputRef={...register("bio")}
                error={errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Stack direction="column" spacing={2}>
              <Button
                sx={{ fontSize: "2vh" }}
                fullWidth
                onClick={() => SignUp()}
                variant="contained"
                type="submit"
              >
                Sign up
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
        </div>
      </Box>
    </div>
  );
}
