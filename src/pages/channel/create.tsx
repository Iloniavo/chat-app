import Navbar from "../../components/NavBar";
import React, {useState} from "react";
import Sidebar from "../../components/SideBar";
import {
    alertClasses,
    Autocomplete,
    Box,
    Button,
    Chip,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {UserData, UserMember} from "../../utils/type";
import {Add} from "@mui/icons-material";
import {createChannel} from "../../provider/ChannelProvider";
import {useRouter} from "next/router";
import {getToken} from "../../hooks/useGetAuthUserInfo";
import { globalAxios as axios } from "../../config/axiosConf";
import BasicModal from "../../components/Modal";
import {getAllUsers} from "@/provider/AuthProvider";
import {GetServerSideProps} from "next";

export default function CreateChannel({suggestedMembers, token}){
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [members, setMembers] = useState([]);
    const [memberInput, setMemberInput] = useState('');
    const [ isSideBarOpen , setIsSideBarOpen ] = useState(true)
    const [ memberId, setMemberId ] = useState([])
    const [ isModalOpen , setIsModalOpen ] = useState(false)

    const { push } = useRouter()

    const membersMapped = suggestedMembers.map((item: UserMember) => item.name)
    const allMembersId = suggestedMembers.map((item: UserMember) => item.id)

    const handleToggle = () => {
        setIsSideBarOpen(!isSideBarOpen)
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleMemberAdd = () => {
        if (memberInput.trim() !== '' && membersMapped.includes(memberInput) && !members.includes(memberInput)) {
            setMembers([...members, memberInput]);
            setMemberId([...memberId, suggestedMembers.id])
            setMemberInput('');
        }
    };

    const handleMemberRemove = (index) => {
        const updatedMembers = [...members];
        updatedMembers.splice(index, 1);
        setMembers(updatedMembers);
    };

    const handleAutocompleteInputChange = (event, value) => {
        setMemberInput(value);
    };

    const handleAutocompleteKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleMemberAdd();
            event.preventDefault();
        }
    };

    const handleAutocompleteSelect = (event, value) => {
        if (value) {
            setMemberInput(value);
            handleMemberAdd();
        }
    };

    const filterOptions = (options, { inputValue }) => {
        const filteredOptions = options.filter((option) =>
            option.toLowerCase().includes(inputValue.toLowerCase())
        );
        return filteredOptions.filter((filteredOption) => !members.includes(filteredOption));
    };

    const addChannel = async (channel: object) => {
        await createChannel(channel, token)
            .then((response) => push(`/channel/${response.data.channel.id}`))
    }

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }
    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    return (<>
            <BasicModal  open={isModalOpen} handleClose={handleModalClose}/>
            <Navbar handleSideBarOpen={handleToggle} title={"Create a channel"}/>
        <Sidebar handleClose={handleToggle} isOpen={isSideBarOpen} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box component={'form'} sx={{
                width: 300,
                height: 600,
                mt: 5
            }}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <br />
                <FormControl variant="outlined" margin="normal" fullWidth >
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={type}
                        onChange={handleTypeChange}
                        label="Type"
                        fullWidth
                    >
                        <MenuItem value="private">Private</MenuItem>
                        <MenuItem value="public">Public</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <Autocomplete
                    value={memberInput}
                    inputValue={memberInput}
                    onChange={handleAutocompleteSelect}
                    onInputChange={handleAutocompleteInputChange}
                    onKeyDown={handleAutocompleteKeyDown}
                    options={membersMapped}
                    filterOptions={filterOptions}
                    fullWidth
                    disabled={type === "public"}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Members"
                            variant="outlined"
                            margin="normal"
                            helperText="Press Enter to add"
                        />
                    )}
                />
                <br />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '20vh',
                    overflow: 'auto'
                }} >
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gridGap: '10px'
                    }} >
                    {members.map((member, index) => (
                        <Chip
                            key={index}
                            label={member}
                            onDelete={() => handleMemberRemove(index)}
                            style={{ margin: '0.5rem' }}
                            deleteIcon={<IconButton><CloseIcon /></IconButton>}
                        />
                    ))}
                    </div>
                    <Button sx={{ mt: 5 }} variant="outlined" color="primary" endIcon={<Add/>} onClick={() => {
                        if(name == '' || type == ''){
                            handleModalOpen()
                        } else {
                            type === "private" ? addChannel({name: name, type: type, members: memberId}) : addChannel({name: name, type: type, members: allMembersId})
                            console.log(memberId)
                            console.log("all ", allMembersId)
                        }
                    }} >Add </Button>
                </div>

            </Box>
        </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    let token = "";

    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
        const cookies = cookieHeader.split("; ");
        const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
        if (tokenCookie) {
            token = tokenCookie.split("=")[1];
        }
    } else {
       if (!token) {
                res.writeHead(302, { Location: '/login' });
                res.end();
            }
        }

    let users = await getAllUsers(token)

    const dataUsers = users.data.users

        return {
            props: {
                suggestedMembers: dataUsers,
                token
            }
        }
}