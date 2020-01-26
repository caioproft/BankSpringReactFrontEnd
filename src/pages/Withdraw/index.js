import React from "react";
import axios from "../../utils/httpClient";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { Container, Title, FormContainer, Input, Done } from '../EditUser/styles';
import { Wallet, Money } from '../Deposit/styles'



class Withdraw extends React.Component {
    // state = {
    //     user: {
    //         balance: ""
    //     },
    //     errors: ""
    // };

    state = {
        withdrawValue: "",
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

    // retrieveUserId = () => this.props.match.params.id;

    handleChange = event => {
        let field = event.target.name;
        let value = event.target.value;

        this.setState({ [field]: value })
    };

    handleSubmit = event => {
        event.preventDefault();

        axios
            .post("/accounts/withdraw/", this.state)
            .then(() => this.props.history.push("/users"))
            .catch(({ response }) => {
                console.log(response.data.message);
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
        const { withdrawValue } = this.state

        const { balance } = this.state.account

        return (
            <Container>
                <Title>Realizar Saque</Title>
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
                            name="withdrawValue"
                            label="Valor do saque"
                            value={withdrawValue}
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

                    <Button href="/users">
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
export default Withdraw;
