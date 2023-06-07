import React, {useState} from "react";
import Navbar from "@/components/NavBar";
import Sidebar from "@/components/SideBar";
import {GetServerSideProps} from "next";

export default function Profile() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)

  const handleToggle = () => setIsSideBarOpen(!isSideBarOpen)
  return (
      <>
          <Navbar handleSideBarOpen={handleToggle} title={"Profile"}/>
          <Sidebar handleClose={handleToggle} isOpen={isSideBarOpen} />
      </>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const token = req.cookies.token;

    if (!token) {
        res.writeHead(302, { Location: '/login' });
        res.end();
    }

    return {
        props: {}, // Vous pouvez également transmettre des données supplémentaires ici
    };
};

//TODO: implement profile layout