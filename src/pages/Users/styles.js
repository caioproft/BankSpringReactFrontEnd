import styled from 'styled-components';
import { AiFillDelete } from 'react-icons/ai';
import { FaUserEdit } from 'react-icons/fa';
import { GiPayMoney } from 'react-icons/gi';
import { GiReceiveMoney } from 'react-icons/gi';


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

export const Container = styled.div`
  font-size: 17px;
  padding: 20px 20px;
  -webkit-align-items: flex-start;
  -webkit-box-align: flex-start;
  -ms-flex-align: flex-start;
  align-items: flex-start;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  text-align: center;
  margin-top: 10px;
`;
