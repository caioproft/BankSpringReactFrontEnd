import styled from 'styled-components';
import { AiFillDelete } from 'react-icons/ai';
import { FaUserEdit } from 'react-icons/fa';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { TiUserAdd } from 'react-icons/ti';


export const Delete = styled(AiFillDelete)`
    color: red;
    width: 25px;
    height: 25px;
`;

export const Edit = styled(FaUserEdit)`
    color: #248EFA;
    width: 25px;
    height: 25px;
`;

export const Deposit = styled(GiPayMoney)`
    color: green;
    width: 30px;
    height: 30px;
`;

export const Withdraw = styled(GiReceiveMoney)`
    color: green;
    width: 30px;
    height: 30px;
`;

export const NewUser = styled(TiUserAdd)`
    width: 30px;
    height: 30px;
`;

export const Container = styled.div`
  text-align: center;
  padding: 20px 20px;
`;

export const ButtonContainer = styled.div`
    margin-top: 10px;
`;
