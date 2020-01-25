import React from "react";
import axios from "../../utils/httpClient";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { UserIcon, EmailIcon, Save, Container, Title, FormContainer, Input } from './styles';
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
        event.preventDefault();

        axios
            .put(`/users/${this.retrieveUserId()}`, this.state.user)
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
                <Title>Alterar dados do cliente</Title>

                <FormContainer onSubmit={this.handleSubmit}>
                    <Input>
                        <TextField
                            name="name"
                            label="Nome do cliente"
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
                            label="E-mail do cliente"
                            value={user.email}
                            errors={errors["email"]}
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
                    <Button type="submit"
                        variant="contained"
                        startIcon={<Save />}
                        color="primary">
                        Salvar alterações
                        </Button>
                </FormContainer>
            </Container>
        );
    }
}
export default EditUser;
