import React, { useState } from "react";
import Navbar from "@/components/NavBar";
import Sidebar from "@/components/SideBar";
import { GetServerSideProps } from "next";
import { getCurrentUserInfo, updateUserInfo } from "@/provider/AuthProvider";
import { getServerSideToken } from "@/hooks/useGetAuthUserInfo";
import { useForm } from "react-hook-form";
import { Button, Container, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Profile({ currentUser, token }) {
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    currentPassword: yup.string().required(""),
    newPassword: yup.string().optional(),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Password does not match"),
    bio: yup.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const { name, bio, oldPassword, confirmNewPassword } = data;
    console.log(data);
    await updateUserInfo(
      {
        name: name,
        email: currentUser.email,
        oldPassword: oldPassword,
        password: confirmNewPassword,
        bio: bio,
      },
      token
    ).then((res) => console.log(res.data));
  };
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const handleToggle = () => setIsSideBarOpen(!isSideBarOpen);
  return (
    <>
      <Navbar
        handleSideBarOpen={handleToggle}
        title={"Profile"}
        userName={currentUser.name}
      />
      <Sidebar handleClose={handleToggle} isOpen={isSideBarOpen} />
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Update your informations
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            disabled
            defaultValue={currentUser.email}
            {...register("email")}
          />
          <TextField
            label="Name"
            type="text"
            fullWidth
            {...register("name")}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            defaultValue={currentUser.name}
          />
          <TextField
            label="Current password"
            type="password"
            fullWidth
            {...register("currentPassword")}
            error={Boolean(errors.currentPassword)}
            helperText={errors.currentPassword?.message}
          />
          <TextField
            label="New password"
            type="password"
            fullWidth
            {...register("newPassword")}
            error={Boolean(errors.newPassword)}
            helperText={errors.newPassword?.message}
          />
          <TextField
            label="Confirm new password"
            type="password"
            fullWidth
            {...register("confirmNewPassword")}
            error={Boolean(errors.confirmNewPassword)}
            helperText={errors.confirmNewPassword?.message}
          />
          <TextField
            label="Bio"
            fullWidth
            multiline
            rows={4}
            defaultValue={currentUser.bio}
            {...register("bio")}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "1rem" }}
          >
            Update Profile
          </Button>
        </form>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const token = getServerSideToken(context);
  if (!token) {
    res.writeHead(302, { Location: "/login" });
    res.end();
  }

  const currentUser = await getCurrentUserInfo(token);

  return {
    props: {
      currentUser,
      token,
    },
  };
};
