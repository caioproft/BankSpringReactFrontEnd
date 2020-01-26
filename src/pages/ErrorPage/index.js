import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ButtonContainer } from '../Welcome/styles';


const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '80vh',
    },
    card: {
        width: '300px',
        height: '300px',
        borderStyle: 'solid',
        border: '1.5px',
        borderColor: "#248EFA",
        borderRadius: '15px',
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: '30%',
        color: 'red',
    },
});

export default function NotFound() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} gutterBottom>
                        A página acessada não existe ou foi alterada!
                    </Typography>
                </CardContent>
                <ButtonContainer>
                    <Button color="default" size='large' href="/users" variant="contained">Home</Button>
                </ButtonContainer>
            </Card>
        </div>
    );
}