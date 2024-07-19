import {atom} from "recoil";

export const backdropState = atom({
    key: 'backdropState',
    default: false, // 기본적으로는 비활성화
});