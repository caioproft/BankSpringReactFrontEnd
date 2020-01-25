import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ButtonContainer } from '../Welcome/styles';
import { Link } from 'react-router-dom';


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
    },
});

export default function SimpleCard() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="initial" gutterBottom>
                        Bem-vindo ao IncubaBank!
        </Typography>
                </CardContent>
                <ButtonContainer>
                    <Link to="/users">
                        <Button color="primary" size='large'>Entrar</Button>
                    </Link>
                </ButtonContainer>
            </Card>
        </div>
    );
}