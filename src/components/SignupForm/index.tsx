import {Button, Card, Checkbox, Space, Text, TextInput} from "@mantine/core";
import {useForm} from "@mantine/hooks";
import {useState} from "react";


interface FormProps {
    fullName?: string;
    email?: string;
    password?: string;
    termsOfService?: boolean;
}

SignupForm.defaultProps = {
    fullName: '',
    email: '',
    password: '',
    termsOfService: false,
}

function SignupForm(props: FormProps) {
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');

    const form = useForm<FormProps>({
        initialValues: props,
        validationRules: {
            email: (value) => /^\S+@\S+$/.test(value || ''),
        },
    });

    return (
        <form
            style={{justifyContent: "space-between"}}
            onSubmit={form.onSubmit((values: FormProps) => console.log(values))}
        >
            <Text
                size={'xl'}
                weight={700}
                align={'center'}
            >
                Create an account
            </Text>
            <Space h={'xl'}/>
            <TextInput
                label={'Full name'}
                placeholder={'Your name'}
                required
                {...form.getInputProps('fullName')}
            />
            <Space h={'xs'}/>
            <TextInput
                label={'Email'}
                placeholder={'Your email'}
                type={'email'}
                required
                {...form.getInputProps('email')}
            />
            <Space h={'xs'}/>
            <TextInput
                label={'Password'}
                placeholder={'Your password'}
                type={'password'}
                required
                {...form.getInputProps('password')}
            />
            <Space h={'xs'}/>
            <TextInput
                value={passwordRepeat}
                onChange={(event) => setPasswordRepeat(event.currentTarget.value)}
                label={'Repeat password'}
                placeholder={'Repeat your password'}
                type={'password'}
                error={!(form.getInputProps('password').value === passwordRepeat)}
                required
            />
            <Space h={'xl'}/>
            <Checkbox
                label={'I agree to sell my privacy to JamNet'}
                required
                color={'teal'}
                {...form.getInputProps('termsOfService', {type: 'checkbox'})}
            />
            <Space h={'xl'}/>
            <Button
                variant={'gradient'}
                gradient={{from: 'purple', to: 'pink'}}
                type={'submit'}
            >
                Sign up
            </Button>
            <Space h={'sm'}/>
        </form>
    )

}

export default SignupForm;