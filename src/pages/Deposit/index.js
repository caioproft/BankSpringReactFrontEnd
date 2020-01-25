import React from "react";
import axios from "../../utils/httpClient";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Container, Title, FormContainer, Input, Save } from '../EditUser/styles';
import { Wallet, Money } from './styles'
import Button from '@material-ui/core/Button';

class Deposit extends React.Component {
    state = {
        user: {
            balance: "",
            depositValue: "",
            idAccount: ""
        },
        errors: ""
    };

    componentDidMount() {
        axios
            .get(`/accounts/${this.retrieveUserId()}`)
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
            .post(`/accounts/deposit/${this.retrieveUserId()}`, this.state.user)
            .then(() => this.props.history.push("/users"))
            .catch(({ response }) => {
                console.log(response);
                if (response.status === 400) {
                    this.setState({
                        errors: response.data
                    });
                }
                this.setState({
                    errors: response.data.message
                });
            });
    };

    render() {
        const { user, errors } = this.state;
        return (
            <Container>
                <Title>Realizar Depósito</Title>
                <FormContainer onSubmit={this.handleSubmit}>
                    <Input>
                        <TextField
                            name="balance"
                            label="Saldo do cliente"
                            value={user.balance}
                            errors={errors["balance"]}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Wallet />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Input>

                    <Input>
                        <TextField
                            name="depositValue"
                            label="Valor do depósito"
                            errors={errors}
                            onChange={this.handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Money />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Input>

                    <Button>
                        <Link to="/users">Voltar</Link>
                    </Button>
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
export default Deposit;
