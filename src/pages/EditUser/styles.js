import styled from 'styled-components';
import { TiUser } from 'react-icons/ti';
import { MdEmail } from 'react-icons/md';
import { FiSave } from 'react-icons/fi';

export const UserIcon = styled(TiUser)`
    width: 20px;
    height: 20px;
`;

export const EmailIcon = styled(MdEmail)`
    width: 20px;
    height: 20px;
`;

export const Save = styled(FiSave)`
    width: 25px;
    height: 25px;
`;

export const Container = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 80vh;
`;

export const Title = styled.span`
    font-size: 26px;
    text-align: center;
    margin-bottom:20px;
`;

export const FormContainer = styled.form`
    text-align: center;
`;

export const Input = styled.div`
    margin: 30px;
`;
