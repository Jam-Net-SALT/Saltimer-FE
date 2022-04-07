import {
  Button,
  Space,
  Text,
  TextInput,
  Divider,
  Center,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext, AuthContextInterface } from "../../services/AuthProvider";
import { resetSignInError, selectSignInError } from "../../store/Errors";
import {
  signInErrorMessages,
  SignInFormProps,
  signInInitialValues,
  signInValidationRules,
} from "./helpers";

function LoginForm() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const auth = useContext<AuthContextInterface | null>(AuthContext);
  const errors = useSelector(selectSignInError);

  const form = useForm<SignInFormProps>({
    initialValues: signInInitialValues,
    validationRules: signInValidationRules,
    errorMessages: signInErrorMessages,
  });

  const onSubmitHandler = async (values: SignInFormProps) => {
    setLoading(true);
    dispatch(resetSignInError());

    const loggedIn = await auth?.logInUser(values);

    if (loggedIn) setLoggedIn(true);

    setLoading(false);
  };

  if (loggedIn) return <Navigate to='/' />;

  return (
    <>
      <form
        style={{ justifyContent: "space-between" }}
        onSubmit={form.onSubmit((values: SignInFormProps) =>
          onSubmitHandler(values)
        )}
      >
        <Center>
          <Text size={"xl"} weight={700} align={"center"}>
            Log in to your account
          </Text>
          {loading && <Loader ml='lg' />}
        </Center>
        <Text size={"xs"} color='red' align={"center"}>
          {errors}
        </Text>
        <Space h={"xs"} />
        <TextInput
          label={"Username"}
          placeholder={"Your username"}
          required
          {...form.getInputProps("username")}
        />
        <Space h={"xs"} />
        <TextInput
          label={"Password"}
          placeholder={"Your password"}
          type={"password"}
          required
          {...form.getInputProps("password")}
        />
        <Space h={"xl"} />
        <Button
          variant={"gradient"}
          gradient={{ from: "orange", to: "red" }}
          fullWidth
          type={"submit"}
          disabled={loading}
        >
          Log in
        </Button>
        <Space h={"sm"} />
        <Divider my='xs' labelPosition='center' />
        <Space h={"sm"} />
      </form>
    </>
  );
}

export default LoginForm;
