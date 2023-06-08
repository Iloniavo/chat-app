import React from "react";
import {Avatar, Grid, Paper, Typography} from "@mui/material";
{
    /*
    paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  senderName: {
    fontWeight: 'bold',
  },
  date: {
    color: theme.palette.text.secondary,
  },
  content: {
    wordBreak: 'break-word',
  },
    * */
}
export default function MessageItem({content, date, sender}){
    return (
        <Paper
            elevation={2}
            sx={{
                padding: '8px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                '&:last-child': {
                    marginBottom: 0,
                },
            }}
        >
            <Grid container direction="column">
                <Grid item>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 'bold',
                        }}
                    >
                        {sender}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        variant="body1"
                        sx={{
                            wordBreak: 'break-word',
                        }}
                    >
                        {content}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        variant="caption"
                        sx={{
                            color: (theme) => theme.palette.text.secondary,
                        }}
                    >
                        {date}
                    </Typography>
                </Grid>

            </Grid>
        </Paper>
    )
}