import * as yup from "yup";
import {FormProvider, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {InferType} from "yup";
import {TextField} from "@mui/material";

// type FormState = {
//     name: string;
//     gender: string;
//     birth: number;
//     address: string;
//     phoneNumber: number;
//     etc: string;
//     test: {name: string, temp: string}[];
// }

export default function Yup () {
    // const asyncValidationCheck = async (username) => {
    //     await new Promise((resolve) => setTimeout(resolve, 2000));
    //     return username === 'test';
    // };

    const testValidationSchema = yup.object({
        name: yup
            .string()
            .required('이름을 입력해주세요.'),
            // .test('unique-username',
            //     'Username is duplicated',
            //     async(value) => await asyncValidationCheck(value)
            // ),
        gender: yup.string().required('성별을 선택해주세요.'),
        birth: yup.number().required('생년월일을 입력해주세요.').typeError('숫자만 입력해주세요.'),
        address: yup
            .string()
            .when("etc", {
            is: 'test',
            then: () => yup.string().required('동적인 에러 발생'),
            otherwise: () => yup.string().notRequired(),
        }),
        phoneNumber: yup.number().required('전화번호를 입력해주세요.').typeError('숫자만 입력해주세요.'),
        etc: yup
            .string().required('안녕'),
        // test: yup.array().of(yup.object({
        //     name: yup.string(),
        //     temp: yup.string()
        // })).min(1, '최소 1개').test(
        //     'all-fields',
        //     '모든 test 항목의 이름과 temp를 입력해주세요.',
        //     (value) =>
        //         Array.isArray(value) &&
        //         value.every(
        //             (item) =>
        //                 item.name && item.name.trim().length > 0 && item.temp && item.temp.trim().length > 0
        //         )
        // )
    })
    type Test = InferType<typeof testValidationSchema>
    const methods = useForm<Test>({resolver: yupResolver(testValidationSchema)});
    const { register, handleSubmit, control,formState: { errors} } = methods;
    const { fields, append, remove } = useFieldArray({control, name: 'test'})

    const onSubmit:SubmitHandler<Test> = (data) => {
        console.log(data)
    };

    // testValidationSchema.validate({})
    //     .then((validatedData) => {
    //         console.log('유효성 검사 성공:', validatedData);
    //     })
    //     .catch((err) => {
    //         console.error('유효성 검사 실패:', err.errors);
    //     });

    // console.log(errors)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button type='button' onClick={() => append({name: ''})}>APPEND</button>
                {fields.map((field, index) => {
                    return (
                        <div key={field.id}>
                            <input {...register(`test.${index}.name` )} />
                            <input {...register(`test.${index}.temp` )} />
                            <button type='button' onClick={() => remove(index)}>DELETE</button>
                        </div>
                    )
                })}
                {errors.test && <span style={{color: 'red'}}>{errors.test.message || errors.test.root?.message}</span>}
                {errors.test &&
                    Array.isArray(errors.test) &&
                    errors.test.map((err, idx) =>
                            err?.name ? (
                                <span key={idx} style={{ color: 'red' }}>
                                    {err.name.message}
                                </span>
                    ) : null
                )}
                <div>
                    <label>이름: </label>
                    <input {...register('name')} />
                </div>
                {errors.name && <span style={{color: 'red'}}>{errors.name?.message}</span>}
                <div>
                    <span>성별: </span>
                    <label>
                        <input type='radio' {...register('gender')} value={'남자'} />
                        남자
                    </label>
                    <label>
                        <input type='radio' {...register('gender')} value={'여자'} />
                        여자
                    </label>
                </div>
                {errors.gender && <span style={{color: 'red'}}>{errors.gender.message}</span>}
                <div>
                    <label>생년월일: </label>
                    <input type='number' {...register('birth')} />
                    {/*<input type='number' {...register('birth', { valueAsNumber: true, required: '생년월일을 입력해주세요.', validate: value => !isNaN(value) || '숫자를 입력해주세요' })} />*/}
                </div>
                {errors.birth && <span style={{ color: 'red' }}>{errors.birth.message}</span>}
                <div>
                    <label>주소: </label>
                    <input {...register('address')} />
                    {/*<input {...register('address', {required: '주소를 입력해주세요'})} />*/}
                </div>
                {errors.address && <span style={{ color: 'red' }}>{errors.address?.message}</span>}
                <div>
                    <label>전화번호: </label>
                    <input type='number' {...register('phoneNumber')} />
                    {/*<input type='number' {...register('phoneNumber', { valueAsNumber: true, required: '전화번호를 입력해주세요.', validate: value => !isNaN(value) || '숫자를 입력해주세요' })} />*/}
                </div>
                {errors.phoneNumber && <span style={{ color: 'red' }}>{errors.phoneNumber?.message}</span>}
                <div>
                    <label>비고: </label>
                    <input {...register('etc')} />
                </div>
                {errors.etc && <span style={{color: 'red'}}>{errors.etc.message}</span>}
                <input type='submit' value='제출하기' />
            </div>
            </FormProvider>
        </form>
    )
}
// const maxLengthValidationSchema = yup.string().max(5);

// const validateString = (e: React.ChangeEvent<HTMLInputElement>) => {
//     try {
//         maxLengthValidationSchema.validateSync(e.target.value);
//         clearErrors('name')
//     } catch (error) {
//         setError('name', {message: '5자 이하로 입력하세요'})
//     }
// }
//
// const handleChange = (e) => {
//     validateString(e);
// }