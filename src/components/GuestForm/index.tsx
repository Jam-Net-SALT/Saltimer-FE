import {Button, Space, TextInput} from "@mantine/core";
import {useForm} from "@mantine/hooks";

interface GuestProps {
    name?: string;
}

GuestForm.defaultProps = {
    name: '',
}

function GuestForm(props: GuestProps) {
    const form = useForm<GuestProps>({initialValues: props});
    return (
        <form
            style={{justifyContent: 'space-between', marginTop: '-15px'}}
            onSubmit={form.onSubmit((values: GuestProps) => console.log(values))}
        >
            <TextInput
                label={'Full name'}
                placeholder={'Your name'}
                type={'text'}
                required
                {...form.getInputProps('name')}
            />
            <Space h={'xl'}/>
            <Button
                variant={'gradient'}
                gradient={{from: 'dimGrey', to: 'grey'}}
                fullWidth
                type={'submit'}
            >
                Log in as Guest
            </Button>
        </form>
    )
}

export default GuestForm;