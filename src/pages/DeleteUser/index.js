import React from "react";
import axios from "../../utils/httpClient";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Delete } from './styles';
import { UserIcon, EmailIcon, Container, Title, FormContainer, Input } from '../EditUser/styles';
import Button from '@material-ui/core/Button';



class EditUser extends React.Component {
    state = {
        user: {
            name: "",
            email: ""
        },
        errors: {}
    };

    componentDidMount() {
        axios
            .get(`/users/${this.retrieveUserId()}`)
            .then(({ data }) => {
                this.setState({
                    user: data
                });
            })
            .catch(({ response }) => {
                if (response.status === 404) {
                    this.props.history.push("/not-found");
                }
            });
    }

    retrieveUserId = () => this.props.match.params.id;


    handleRemove = event => {
        event.preventDefault();

        axios
            .delete(`/users/${this.retrieveUserId()}`)
            .then(() => this.props.history.push("/users"))
            .catch(({ response }) => {
                if (response.status === 400) {
                    this.setState({
                        errors: response.data
                    });
                }
            });
    };

    render() {
        const { user, errors } = this.state;

        return (
            <Container>
                <Title>Deseja excluir este cliente?</Title>

                <FormContainer onSubmit={this.handleRemove}>
                    <Input>
                        <TextField
                            name="name"
                            label="Nome do cliente"
                            value={user.name}
                            errors={errors["name"]}
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
                            label="E-mail do cliente"
                            value={user.email}
                            errors={errors["email"]}
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
                        variant="outlined"
                        color="primary">
                        Voltar
                    </Button>
                    <Button type="submit"
                        variant="contained"
                        startIcon={<Delete />}
                        color="secondary">
                        Excluir cliente
                    </Button>
                </FormContainer>
            </Container>
        );
    }
}
export default EditUser;
