import * as Yup from "yup";
import { useMemo } from "react";

const UseSimpleValidation = () => {
    const schema = useMemo(() => {
        return Yup.object().shape({

            email: Yup.string()
                .email('이메일이 잘못되었습니다.')
                .required('이메일은 필수 항목입니다.'),

            nickname: Yup.string()
                .required('닉네임은 필수 항목입니다.'),

            password: Yup.string()
                .min(4, '비밀번호는 4자 이상이어야 합니다.')
                .required('비밀번호가 필요합니다.'),
            passwordCheck: Yup.string()
                .oneOf([Yup.ref('password'), null], '비밀번호가 일치해야합니다.')
                .required('비밀번호 확인이 필요합니다.')

        });
    }, []);

    return { schema };
};

export default UseSimpleValidation;