import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React from "react";
import { useDispatch } from "react-redux";
import { editMember } from "../../store/LocalMobSession";
import { AnonymsUser } from "../../types/User";
import { EditLocalMemberFormProps, EditLocalMemberProps } from "./type";

const EditLocalMember = (props: EditLocalMemberProps) => {
  const dispatch = useDispatch();
  const form = useForm<EditLocalMemberFormProps>({
    initialValues: { name: props.user.name, imageUrl: props.user.imageUrl },
    validationRules: {
      name: (value) => value.length > 0,
      imageUrl: (value) =>
        /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(value),
    },
    errorMessages: {
      name: "Name is required.",
      imageUrl: "Image url must be a valid image address.",
    },
  });

  const onSubmitHandler = (values: EditLocalMemberFormProps) => {
    const member: AnonymsUser = {
      name: values.name,
      imageUrl: values.imageUrl,
      id: props.user.id,
      turn: props.user.turn,
    };

    console.log("Updated");
    dispatch(editMember(member));
    props.onClose();
  };

  return (
    <Modal opened={props.isOpen} onClose={props.onClose} title='Edit user'>
      <form
        onSubmit={form.onSubmit((v: EditLocalMemberFormProps) =>
          onSubmitHandler(v)
        )}
      >
        <TextInput
          mt='xl'
          pb='xl'
          radius='xl'
          label='Full name'
          placeholder='Full name'
          type='text'
          required
          {...form.getInputProps("name")}
        />
        <TextInput
          mt='xl'
          pb='xl'
          radius='xl'
          label='Image url'
          placeholder='Image url'
          type='text'
          required
          {...form.getInputProps("imageUrl")}
        />

        <Button
          ml='xl'
          radius='xl'
          type={"submit"}
          variant={"gradient"}
          gradient={{ from: "orange", to: "red" }}
        >
          Edit
        </Button>
      </form>
    </Modal>
  );
};

export default EditLocalMember;
