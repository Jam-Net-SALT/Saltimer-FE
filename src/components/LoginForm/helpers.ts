import {
  UseFormErrors,
  ValidationRule,
} from "@mantine/hooks/lib/use-form/use-form";

export interface SignInFormProps {
  username: string;
  password: string;
}

export const signInInitialValues: SignInFormProps = {
  username: "",
  password: "",
};

export const signInValidationRules: ValidationRule<SignInFormProps> = {
  username: (value) => value?.length > 2 && value?.length < 20,
  password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
};

export const signInErrorMessages: UseFormErrors<SignInFormProps> = {
  username: "Fist name must be 2 to 10 characters",
  password:
    "Password must contain minimum eight characters, at least one letter and one numberFist name must be 2 to 10 characters",
};
