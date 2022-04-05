import {
  UseFormErrors,
  ValidationRule,
} from "@mantine/hooks/lib/use-form/use-form";

export interface SignUpFormProps {
  username: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  termsOfService: boolean;
}

export const signUpInitialValues: SignUpFormProps = {
  username: "",
  firstName: "",
  lastName: "",
  emailAddress: "",
  password: "",
  termsOfService: false,
};

export const signUpValidationRules: ValidationRule<SignUpFormProps> = {
  username: (value) => value?.length > 1 && value?.length < 21,
  firstName: (value) => value?.length > 1 && value?.length < 16,
  lastName: (value) => value?.length > 1 && value?.length < 16,
  emailAddress: (value) => /^\S+@\S+$/.test(value),
  password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
};

export const signUpErrorMessages: UseFormErrors<SignUpFormProps> = {
  username: "Username must be 2 to 20 characters",
  firstName: "First name must be 2 to 15 characters",
  lastName: "Last name must be 2 to 15 characters",
  emailAddress: "Email address is not valid",
  password:
    "Password must contain minimum eight characters, at least one letter and one number",
};
