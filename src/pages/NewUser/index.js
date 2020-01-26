import React from "react";
import axios from "../../utils/httpClient";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { UserIcon, EmailIcon, Done, Container, Title, FormContainer, Input } from '../EditUser/styles';




class NewUser extends React.Component {
    state = {
        user: {
            name: "",
            email: "",
        },
        errors: {},
        globalError: ""
    };

    handleChange = event => {
        let field = event.target.name;
        let value = event.target.value;

        this.setState(({ user }) => ({
            user: {
                ...user,
                [field]: value
            }
        }));
    };

    handleSubmit = event => {
        axios
            .post("/users", this.state.user)
            .then(() => this.props.history.push("/users"))
            .catch(({ response }) => {
                if (response.status === 400) {
                    this.setState({
                        errors: response.data
                    });
                }
                this.setState({
                    globalError: response.data.message
                });
            });
        event.preventDefault();
    };

    render() {
        const { user, errors, globalError } = this.state;
        return (
            <Container>
                <Title>Novo Cliente</Title>

                {globalError ? <div>{globalError}</div> : <></>}
                <FormContainer onSubmit={this.handleSubmit}>
                    <Input>
                        <TextField
                            name="name"
                            label="Nome"
                            value={user.name}
                            errors={errors["name"]}
                            onChange={this.handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <UserIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Input>

                    <Input>
                        <TextField
                            name="email"
                            label="E-mail"
                            value={user.email}
                            erros={errors["email"]}
                            onChange={this.handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Input>
                    <Button
                        href="/users"
                        variant="contained">
                        Voltar
                    </Button>
                    <Button type="submit"
                        variant="contained"
                        startIcon={<Done />}
                        color="primary">
                        Cadastrar cliente
                    </Button>
                </FormContainer>
            </Container>
        );
    }
}
export default NewUser;
