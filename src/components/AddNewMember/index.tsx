import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FileX } from "tabler-icons-react";
import {
  addNewMember,
  selectLocalMobSession,
} from "../../store/LocalMobSession";
import { AnonymsUser } from "../../types/User";

interface AddMemberUser {
  name: string;
}

const AddNewMemberForm = () => {
  const dispatch = useDispatch();
  const localMobSession = useSelector(selectLocalMobSession);

  const form = useForm<AddMemberUser>({
    initialValues: { name: "" },
    validationRules: {
      name: (value) => value.length > 0,
    },
  });

  const onSubmitHandler = (values: AddMemberUser) => {
    const newMember: AnonymsUser = {
      name: values.name,
      imageUrl: "",
      turn: localMobSession.members.length,
      id: localMobSession.members.length.toString(),
    };

    dispatch(addNewMember(newMember));
  };

  return (
    <form
      style={{ display: "flex", alignItems: "center" }}
      onSubmit={form.onSubmit((v: AddMemberUser) => onSubmitHandler(v))}
    >
      <TextInput
        mt='xl'
        pb='xl'
        radius='xl'
        placeholder='Full name'
        type='text'
        required
        {...form.getInputProps("name")}
      />

      <Button
        ml='xl'
        radius='xl'
        type={"submit"}
        variant={"gradient"}
        gradient={{ from: "orange", to: "red" }}
      >
        Add
      </Button>
    </form>
  );
};

export default AddNewMemberForm;
