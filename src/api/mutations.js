import { useMutation } from 'react-query';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;


const singUpUser = async (userData) => {

    const response = await axios.post(`${apiUrl}/v1/signup`, userData);
    return response.data;
};

export function useSignupMutation(onSuccess, onError){
    return useMutation(singUpUser, {
        onSuccess,
        onError
    });
}


const loginUser = async (userData) => {
    console.log(apiUrl)
    const response = await axios.post(`${apiUrl}/v1/login`, userData);
    return response.data;
};

export function useLoginMutation(onSuccess, onError){
    return useMutation(loginUser, {
        onSuccess,
        onError
    });
}

const uploadImage = async (formData) => {
    const token = localStorage.getItem('id_token');
    const response = await axios.post(
        `${apiUrl}/v1/image-upload`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
                'accept': 'application/json',
            },
        }
    );
    return response.data;
};

export function useImageUploadMutation(onSuccess, onError){
    return useMutation(uploadImage, {
        onSuccess,
        onError
    });
}

const businessCreate = async (businessData) => {
    const token = localStorage.getItem('id_token');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
    };
    const response = await axios.post(`${apiUrl}/v1/business`, businessData, { headers });
    return response.data;
};

export function useBusinessCreateMutation(onSuccess, onError){
    return useMutation(businessCreate, {
        onSuccess,
        onError
    });
}

export const fetchBusinessList = async () => {
    const token = localStorage.getItem('id_token')
    const headers = {
        'Authorization' : `Bearer ${token}`
    };
    const response = await axios.get(`${apiUrl}/v1/business`, { headers });
    return response.data;
}

export const fetchUserInfo = async () => {
    const token = localStorage.getItem('id_token');
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    const response = await axios.get(`${apiUrl}/v1/me`, { headers });
    return response.data;
};


//회사 정보 가져오기
export const fetchBusinessInfo = async () => {
    const token = localStorage.getItem('id_token')
    const company_id = localStorage.getItem('company_id')
    const headers = {
        'Authorization' : `Bearer ${token}`
    };
    if (!token || !company_id) {
        console.log('Token 또는 company_id가 없습니다.');
        return null; // 또는 적절한 에러 처리
    }
    const response = await axios.get(`${apiUrl}/v1/business/${company_id}`, { headers });
    return response.data;
}

export const fetchBusinessItemsInfo = async () => {
    const token = localStorage.getItem('id_token')
    const company_id = localStorage.getItem('company_id')
    const headers = {
        'Authorization' : `Bearer ${token}`
    };
    const response = await axios.get(`${apiUrl}/v1/business/${company_id}/items`, { headers });
    return response.data;
}

// 매장 업데이트
const businessUpdate = async (businessData) => {
    const token = localStorage.getItem('id_token');
    const company_id = localStorage.getItem('company_id')
    const headers = {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
    };
    const response = await axios.put(`${apiUrl}/v1/business/${company_id}`, businessData, { headers });
    return response.data;
};


export function useBusinessUpdateMutation(onSuccess, onError){
    return useMutation(businessUpdate, {
        onSuccess,
        onError
    });
}

const businessItemsUpdate = async (businessItemsData) => {
    const token = localStorage.getItem('id_token');
    const company_id = localStorage.getItem('company_id')
    const headers = {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
    };
    const response = await axios.post(`${apiUrl}/v1/business/${company_id}/items`, businessItemsData, { headers });
    return response.data;
};


export function useBusinessItemsUpdateMutation(onSuccess, onError){
    return useMutation(businessItemsUpdate, {
        onSuccess,
        onError
    });
}

// gpt 사용해보기
const GPTChat = async (prompt) => {
    const response = await axios.post(`${apiUrl}/prompt`, prompt);
    return response.data;
};


export function useGPTChatMutation(onSuccess, onError){
    return useMutation(GPTChat, {
        onSuccess,
        onError
    });
}

export const fetchBusinessPromptInfo = async () => {
    const token = localStorage.getItem('id_token')
    const company_id = localStorage.getItem('company_id')
    const headers = {
        'Authorization' : `Bearer ${token}`
    };
    const response = await axios.get(`${apiUrl}/v1/business/${company_id}/prompt`, { headers });
    return response.data;
}


const promptCreate = async (promptData) => {
    const token = localStorage.getItem('id_token');
    const company_id = localStorage.getItem('company_id')
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    const response = await axios.post(`${apiUrl}/v1/business/${company_id}/prompt`, promptData, { headers });
    return response.data;
};

export function usePromptCreateMutation(onSuccess, onError){
    return useMutation(promptCreate, {
        onSuccess,
        onError
    });
}

const promptUpdate = async (props) => {
    const token = localStorage.getItem('id_token');
    const company_id = localStorage.getItem('company_id')
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    const response = await axios.put(`${apiUrl}/v1/business/${company_id}/prompt/${props.id}`, {question : props.question, answer: props.answer, items:props.items}, { headers });
    return response.data;
};

export function usePromptUpdateMutation(onSuccess, onError){
    return useMutation(promptUpdate, {
        onSuccess,
        onError
    });
}

