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
  username: (value) => value?.length > 2 && value?.length < 20,
  firstName: (value) => value?.length > 2 && value?.length < 20,
  lastName: (value) => value?.length > 2 && value?.length < 20,
  emailAddress: (value) => /^\S+@\S+$/.test(value),
  password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
};

export const signUpErrorMessages: UseFormErrors<SignUpFormProps> = {
  username: "Fist name must be 2 to 10 characters",
  firstName: "Fist name must be 2 to 10 characters",
  lastName: "Last name must be 2 to 10 characters",
  emailAddress: "Email address is not a valid email address",
  password:
    "Password must contain minimum eight characters, at least one letter and one numberFist name must be 2 to 10 characters",
};
