import {Controller, FormProvider, SubmitErrorHandler, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import { z } from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {Autocomplete, TextField} from "@mui/material";
// import {useEffect} from "react";

// type FormState = {
//     name: string;
//     gender: string;
//     birth: number;
//     address: string;
//     phoneNumber: number;
//     etc: string;
//     test: {name: string, temp: string}[];
// }

const asyncValidationCheck = async (username) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return username === 'test';
};

const zodSchema = z.object({
    name: z.string()
        .nonempty({message: '이름을 입력해주세요.'})
        .refine(async (data) => {
            return await asyncValidationCheck(data);
        }, 'Username is duplicated'),
    etc: z.string()
        .nonempty({message: '필수값입니다.'})
        .max(5, {message: '5자 이하 사용 가능합니다.'})
    })
    .superRefine((data, ctx) => {
        if (data.name === 'test') {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['etc'],
                message: '동적인 에러 발생'
            })
        }
    });
type ZodSchema = z.infer<typeof zodSchema>

export default function Zod () {
    const methods = useForm<ZodSchema>({resolver: zodResolver(zodSchema)});

    const { register, handleSubmit, control, formState: { errors} } = methods;
    const { fields, append, remove } = useFieldArray({control, name: 'test'})

    const onSubmit:SubmitHandler<ZodSchema> = (data) => {
        console.log('success',data)
    };

    const onError:SubmitErrorHandler<ZodSchema> = (data) => {
        if (data.birth === 'invalid data' || data.name === 'invalid data') {
            console.log('토스트, 스낵바 출력')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                    <input {...register('name')}  />
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
                    {/*<Controller*/}
                    {/*    name='etc'*/}
                    {/*    render={({field}) => (*/}
                    {/*        <Autocomplete*/}
                    {/*            options={['자동', '완성', '테스트입니다']}*/}
                    {/*            {...field}*/}
                    {/*            renderInput={(params) => <TextField {...params} /> }*/}
                    {/*            onChange={(_, value) => field.onChange(value)}*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*/>*/}
                    <Controller
                        name='etc'
                        defaultValue=''
                        render={({field}) => {
                            return (
                                <TextField
                                    name={field.name}
                                    value={field.value}
                                    inputRef={field.ref}
                                    onChange={field.onChange}
                                    // error{errors.etc}
                                    helperText={errors.etc?.message}
                                />
                            )
                        }}
                    />
                </div>
                {errors.etc && <span style={{color: 'red'}}>{errors.etc.message}</span>}
                <input type='submit' value='제출하기' />
            </div>
            </FormProvider>
        </form>
    )
}