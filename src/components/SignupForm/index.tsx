import {
  Button,
  Center,
  Checkbox,
  Loader,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext, AuthContextInterface } from "../../services/AuthProvider";
import { resetSignUpError, selectSignupError } from "../../store/Errors";
import {
  signUpErrorMessages,
  SignUpFormProps,
  signUpInitialValues,
  signUpValidationRules,
} from "./helpers";

function SignupForm() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const auth = useContext<AuthContextInterface | null>(AuthContext);
  const errors = useSelector(selectSignupError);
  const form = useForm<SignUpFormProps>({
    initialValues: signUpInitialValues,
    validationRules: signUpValidationRules,
    errorMessages: signUpErrorMessages,
  });

  const onSubmitHandler = async (values: SignUpFormProps) => {
    setLoading(true);
    dispatch(resetSignUpError());

    const registered = await auth?.registerUser(values);

    if (registered) setSignedIn(true);
    setLoading(false);
  };

  if (signedIn) return <Navigate to='/' />;

  return (
    <form
      style={{ justifyContent: "space-between" }}
      onSubmit={form.onSubmit((values: SignUpFormProps) =>
        onSubmitHandler(values)
      )}
    >
      <Center>
        <Text size={"xl"} weight={700} align={"center"}>
          Create an account
        </Text>
        {loading && <Loader ml='lg' />}
      </Center>
      <Text size={"xs"} color='red' align={"center"}>
        {errors}
      </Text>
      <Space h={"xl"} />
      <TextInput
        label={"Username"}
        placeholder={"Your username"}
        {...form.getInputProps("username")}
      />
      <TextInput
        label={"First name"}
        placeholder={"Your first name"}
        {...form.getInputProps("firstName")}
      />
      <Space h={"xs"} />
      <TextInput
        label={"Last name"}
        placeholder={"Your last name"}
        required
        {...form.getInputProps("lastName")}
      />
      <Space h={"xs"} />
      <TextInput
        label={"Email"}
        placeholder={"Your email"}
        required
        {...form.getInputProps("emailAddress")}
      />
      <Space h={"xs"} />
      <TextInput
        label={"Password"}
        placeholder={"Your password"}
        type={"password"}
        required
        {...form.getInputProps("password")}
      />
      <Space h={"xs"} />
      <Checkbox
        label={"I agree to sell my privacy to JamNet"}
        required
        color={"teal"}
        {...form.getInputProps("termsOfService", { type: "checkbox" })}
      />
      <Space h={"xl"} />
      <Button disabled={loading} type={"submit"}>
        Sign up
      </Button>
      <Space h={"sm"} />
    </form>
  );
}

export default SignupForm;
