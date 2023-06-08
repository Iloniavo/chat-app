import {addChannelMembers, getChannelById} from "@/provider/ChannelProvider";
import Navbar from "@/components/NavBar";
import Sidebar from "@/components/SideBar";
import React, {useState} from "react";
import {Box, Button, Checkbox, FormControlLabel, List, ListItem, ListItemText, TextField} from "@mui/material";
import {getAllUsers} from "@/provider/AuthProvider";
import {useRouter} from "next/router";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function EditChannel({users, idChannel, token}){

    const router = useRouter();
    const { push } = router.query

    const [isSideBarOpen, setIsSideBarOpen] = useState(true)
    const handleToggle = () => setIsSideBarOpen(!isSideBarOpen)

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
        const [searchTerm, setSearchTerm] = useState('');

        const handleSearchChange = (event) => {
            setSearchTerm(event.target.value);
        };

        const filteredItems = users ? users.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ): []



    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (event.target.checked) {
            setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id])
        } else {
            setSelectedIds((prevSelectedIds) =>
                prevSelectedIds.filter((selectedId) => selectedId !== id)
            );
        }
        console.log(selectedIds)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        console.log(selectedIds+ " Sekle")
        e.preventDefault()
        await addChannelMembers(idChannel, token, {members: selectedIds}).then((res) => {
            console.log(res.data);
            toast.success('Users added succesfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
    }

    return (
        <>
            <Navbar handleSideBarOpen={handleToggle} title={"Profile"}/>
            <Sidebar handleClose={handleToggle} isOpen={isSideBarOpen} />
            <Box component={'form'} onSubmit={handleSubmit} >
                <TextField
                    label="Search by username"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    fullWidth
                    sx={{ marginBottom: '16px' }}
                />
                <List>
                    {filteredItems.map((item) => (
                        <ListItem key={item.id}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label={<ListItemText primary={item.name} />}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCheckboxChange(event, item.id)}
                                checked={selectedIds.includes(item.id)}
                            />
                        </ListItem>
                    ))}
                </List>
                <Button type={'submit'}>
                    Add members
                </Button>
                <ToastContainer style={{zIndex: '999999'}} />
            </Box>
        </>
    )
}

export async function getServerSideProps({req, res, params}){
    const token = req.cookies.token;
    const { id } = params;
    if (!token) {
        res.writeHead(302, { Location: '/login' });
        res.end();
    }

    const channel = await getChannelById(id, token);
    const users = await getAllUsers(token);

    return {
        props: {
            channel,
            users,
            token,
            idChannel: id
        },
    };
}