import { Button, Card, Checkbox, Space, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerHandler } from "../../store/CurrentUser";

export interface SignUpFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  termsOfService: boolean;
}

const initialValues: SignUpFormProps = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  termsOfService: false,
};

function SignupForm() {
  const dispatch = useDispatch();

  const form = useForm<SignUpFormProps>({
    initialValues: initialValues,
    validationRules: {
      firstName: (value) => value?.length > 2 && value?.length < 20,
      lastName: (value) => value?.length > 2 && value?.length < 20,
      email: (value) => /^\S+@\S+$/.test(value),
      password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
    },
    errorMessages: {
      firstName: "Fist name must be 2 to 10 characters",
      lastName: "Last name must be 2 to 10 characters",
      email: "Email address is not a valid email address",
      password:
        "Password must contain minimum eight characters, at least one letter and one numberFist name must be 2 to 10 characters",
    },
  });

  const onSubmitHandler = (values: SignUpFormProps) => {
    if (form.validate()) dispatch(registerHandler(values));
  };

  return (
    <form
      style={{ justifyContent: "space-between" }}
      onSubmit={form.onSubmit((values: SignUpFormProps) =>
        onSubmitHandler(values)
      )}
    >
      <Text size={"xl"} weight={700} align={"center"}>
        Create an account
      </Text>
      <Space h={"xl"} />
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
        {...form.getInputProps("email")}
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
      <Button type={"submit"}>Sign up</Button>
      <Space h={"sm"} />
    </form>
  );
}

export default SignupForm;
