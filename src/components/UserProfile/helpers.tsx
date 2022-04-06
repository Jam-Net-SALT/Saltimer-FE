import { MantineTheme } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { DropzoneStatus } from '@mantine/dropzone';
import {
    UseFormErrors,
    ValidationRule,
} from "@mantine/hooks/lib/use-form/use-form";
import { User } from "../../types/User";

export function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
    return status.accepted
        ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
        : status.rejected
            ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
            : theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[7];
}

export function ImageUploadIcon({
    status,
    ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
    if (status.accepted) {
        return <Upload {...props} />;
    }

    if (status.rejected) {
        return <X {...props} />;
    }

    return <Photo {...props} />;
}

export const userInitialValues: User = {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    fullName: '',
    profileImage: '',
    emailAddress: '',
    createdAt: new Date(),
}

export const userValidationRules: ValidationRule<User> = {
    username: (value) => value?.length > 1 && value?.length < 21,
    firstName: (value) => value?.length > 1 && value?.length < 16,
    lastName: (value) => value?.length > 1 && value?.length < 16,
    emailAddress: (value) => /^\S+@\S+$/.test(value),
};

export const userErrorMessages: UseFormErrors<User> = {
    username: "Username must be 2 to 20 characters",
    firstName: "First name must be 2 to 15 characters",
    lastName: "Last name must be 2 to 15 characters",
    emailAddress: "Email address is not valid",
};
