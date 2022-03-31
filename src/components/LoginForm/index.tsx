import {Button, Card, Checkbox, Space, Text, TextInput, Divider} from "@mantine/core";
import {useForm} from "@mantine/hooks";
import {useState} from "react";

interface FormProps {
    email?: string;
    password?: string;
}

LoginForm.defaultProps = {
    email: '',
    password: '',
}

function LoginForm(props: FormProps) {

    const form = useForm<FormProps>({
        initialValues: props,
        validationRules: {
            email: (value) => /^\S+@\S+$/.test(value || ''),
        },
    });

    return (
        <>
            <form
                style={{justifyContent: 'space-between'}}
                onSubmit={form.onSubmit((values: FormProps) => console.log(values))}
            >
                <Text
                    size={'xl'}
                    weight={700}
                    align={'center'}
                >
                    Log in to existing account
                </Text>
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
                <Space h={'xl'}/>
                <Button
                    variant={'gradient'}
                    gradient={{from: 'purple', to: 'pink'}}
                    fullWidth
                    type={'submit'}
                >
                    Log in
                </Button>
                <Space h={'sm'}/>
                <Divider my="xs" label="Or" labelPosition="center"/>
                <Space h={'sm'}/>
            </form>
            <Button
                variant={'gradient'}
                gradient={{from: 'dimGrey', to: 'grey'}}
                fullWidth
                type={'submit'}
            >
                Log in as Guest
            </Button>
        </>
    )

}

export default LoginForm;