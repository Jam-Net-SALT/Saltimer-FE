import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FileX } from "tabler-icons-react";
import {
  addNewMember,
  selectLocalMobSession,
} from "../../store/LocalMobSession";

interface AddMemberUser {
  name: string;
}

const AddNewMemberForm = () => {
  const dispatch = useDispatch();
  const localMobSession = useSelector(selectLocalMobSession);
  const [openNewMemberModal, setOpenNewMemberModal] = useState<boolean>(false);

  const form = useForm<AddMemberUser>({
    initialValues: { name: "" },
    validationRules: {
      name: (value) => value.length > 0,
    },
  });

  const onSubmitHandler = (values: AddMemberUser) => {
    dispatch(
      addNewMember({
        name: values.name,
        imageUrl: "",
        turn: localMobSession.members.length,
      })
    );
    setOpenNewMemberModal(false);
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

      <Button ml='xl' radius='xl' type={"submit"}>
        Add
      </Button>
    </form>
  );
};

export default AddNewMemberForm;
