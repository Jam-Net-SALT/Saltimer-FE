import {Button, Card, Checkbox, Select, Space, Text, TextInput} from "@mantine/core";
import {useForm} from "@mantine/hooks";
import {useState} from "react";

interface FormProps {
    fullName?: string;
    email?: string;
    password?: string;
    termsOfService?: boolean;
}

SignupFormCard.defaultProps = {
    fullName: '',
    email: '',
    password: '',
    gender: 'male',
    termsOfService: false,
}

function SignupFormCard(props: FormProps) {
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');

    const form = useForm<FormProps>({
        initialValues: props,
        validationRules: {
            email: (value) => /^\S+@\S+$/.test(value || ''),
        },
    });

    return (
        <form
            style={{width: 450}}
            onSubmit={form.onSubmit((values: FormProps) => console.log(values))}
        >
            <Card
                shadow={'xl'}
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
                    {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                />
                <Space h={'xl'}/>
                <Button
                    variant={'gradient'}
                    gradient={{from: 'purple', to: 'pink'}}
                    fullWidth
                    uppercase
                    type={'submit'}
                >
                    Sign up
                </Button>
                <Space h={'xl'}/>
                <Text
                    size={'sm'}
                    align={'center'}
                >
                </Text>
            </Card>
        </form>
    )

}
export default SignupFormCard;