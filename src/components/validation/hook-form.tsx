import {Controller, FormProvider, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import { z } from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {Autocomplete, Snackbar, TextField} from "@mui/material";

type FormState = {
    name: string;
    gender: string;
    birth: number;
    address: string;
    phoneNumber: number;
    etc: string;
    test: {name: string, temp: string}[];
}

export default function HookForm () {
    const methods = useForm<FormState>();
    const { register, handleSubmit, control, formState: { errors} } = methods;
    const { fields, append, remove } = useFieldArray({control, name: 'test'})

    const asyncValidationCheck = async (username) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return username === 'test';
    };

    const onSubmit:SubmitHandler<FormState> = (data) => {
        console.log(data)
    };

    // const stringValidation = {
    //     required: "필수 입력 항목입니다.",
    //     minLength: { value: 8, message: "최소 8자 이상 입력해야 합니다." },
    //     maxLength: { value: 20, message: "최대 20자까지 입력 가능합니다." },
    //     pattern: { value: /^[a-zA-Z0-9가-힣]+$/, message: "특수문자는 사용할 수 없습니다." },
    //     validate: {
    //         noWhitespace: (value: string) => !/\s/.test(value) || "공백을 포함할 수 없습니다.",
    //         noTestWord: (value: string) => !value.includes("test") || "'test'를 포함할 수 없습니다.",
    //     },
    // };
    // console.log(errors.test)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button type='button' onClick={() => append({name: ''})}>APPEND</button>
                    {fields.map((field, index) => {
                        return (
                            <div key={field.id}>
                                <input {...register(`test.${index}.name`)} />
                                <input {...register(`test.${index}.temp`)} />
                                <button type='button' onClick={() => remove(index)}>DELETE</button>
                            </div>
                        )
                    })}
                    {errors.test && <span style={{color: 'red'}}>{errors.test.message}</span>}
                    <div>
                        <label>이름: </label>
                        <input
                            {...register('name', {
                                validate: async (value) =>
                                    (await asyncValidationCheck(value)) || 'Username is duplicated',
                            })}
                        />
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
                        {/*<input type='number' {...register('birth')} />*/}
                        <input type='number' {...register('birth', { valueAsNumber: true, required: '생년월일을 입력해주세요.', validate: value => !isNaN(value) || '숫자를 입력해주세요' })} />
                    </div>
                    {errors.birth && <span style={{ color: 'red' }}>{errors.birth.message}</span>}
                    <div>
                        <label>주소: </label>
                        {/*<input {...register('address')} />*/}
                        <input {...register('address', {required: '주소를 입력해주세요'})} />
                    </div>
                    {errors.address && <span style={{ color: 'red' }}>{errors.address?.message}</span>}
                    <div>
                        <label>전화번호: </label>
                        {/*<input type='number' {...register('phoneNumber')} />*/}
                        <input type='number' {...register('phoneNumber', { valueAsNumber: true, required: '전화번호를 입력해주세요.', validate: value => !isNaN(value) || '숫자를 입력해주세요' })} />
                    </div>
                    {errors.phoneNumber && <span style={{ color: 'red' }}>{errors.phoneNumber?.message}</span>}
                    <div>
                        <label>비고: </label>
                        <Controller
                            name='etc'
                            rules={{
                                required: '필수값입니다.', maxLength: {value: 5, message: '5자 이하 사용가능합니다.'}
                            }}
                            render={({field}) => (
                                <Autocomplete
                                    options={['자동', '완성', '테스트입니다']}
                                    {...field}
                                    renderInput={(params) => <TextField {...params} /> }
                                    onChange={(_, value) => field.onChange(value)}
                                />
                            )}
                        />
                        {/*<TextField {...register('etc', {required: '필수값입니다.'})} />*/}
                    </div>
                    {errors.etc && <span style={{color: 'red'}}>{errors.etc.message}</span>}
                    <input type='submit' value='제출하기' />
                </div>
            </FormProvider>
        </form>
    )
}