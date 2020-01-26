import React from "react";
import axios from "../../utils/httpClient";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Container, Title, FormContainer, Input, Done } from '../EditUser/styles';
import { Wallet, Money } from './styles'
import Button from '@material-ui/core/Button';

class Deposit extends React.Component {

    state = {
        depositValue: "",
        idAccount: "",

        account: {
            balance: "",
            user: {
                name: ""
            }
        },
        errors: ""
    }

    componentDidMount() {

        const params = this.props.match.params
        if (params.id) {
            axios
                .get(`/accounts/${params.id}`)
                .then(({ data }) => {
                    this.setState({
                        idAccount: data.id,
                        account: data
                    });
                })
        }
    }

    handleChange = event => {
        let field = event.target.name;
        let value = event.target.value;

        this.setState({ [field]: value })
    };

    handleSubmit = event => {
        event.preventDefault();

        axios
            .post("/accounts/deposit/", this.state)
            .then(() => this.props.history.push("/users"))
            .catch(({ response }) => {
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

        const { depositValue } = this.state

        const { balance } = this.state.account

        return (
            <Container>
                <Title>Realizar Depósito</Title>
                <FormContainer onSubmit={this.handleSubmit}>
                    <Input>
                        <TextField
                            name="balance"
                            label="Saldo do cliente"
                            value={balance}
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
                            value={depositValue}
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

                    <Button
                        href="/users"
                        variant="contained">
                        Voltar
                    </Button>
                    <Button type="submit"
                        variant="contained"
                        startIcon={<Done />}
                        color="primary">
                        Confirmar
                    </Button>
                </FormContainer>
            </Container>
        );
    }
}
export default Deposit;
