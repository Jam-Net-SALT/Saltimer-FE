import { Button, Group, Modal, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space } from "tabler-icons-react";
import {
  addNewMember,
  selectLocalMobSession,
} from "../../store/LocalMobSession";

interface NewMemberUser {
  name: string;
  url: string;
}

const LocalSessionController = () => {
  const dispatch = useDispatch();
  const localMobSession = useSelector(selectLocalMobSession);
  const [openNewMemberModal, setOpenNewMemberModal] = useState<boolean>(false);

  const form = useForm<NewMemberUser>({
    initialValues: { name: "", url: "" },
    validationRules: {
      name: (value) => value.length > 0,
      url: (value) => value.includes("https://"),
    },
  });

  const onSubmitHandler = (values: NewMemberUser) => {
    dispatch(
      addNewMember({
        name: values.name,
        imageUrl: values.url,
        turn: localMobSession.members.length,
      })
    );
    setOpenNewMemberModal(false);
  };

  return (
    <>
      <Modal
        opened={openNewMemberModal}
        onClose={() => setOpenNewMemberModal(false)}
        title='Add new member'
      >
        <form
          style={{ justifyContent: "space-between" }}
          onSubmit={form.onSubmit((v: NewMemberUser) => onSubmitHandler(v))}
        >
          <TextInput
            pb='xl'
            label='Name'
            placeholder='John doe'
            type='text'
            required
            {...form.getInputProps("name")}
          />

          <TextInput
            pb='xl'
            label='Image url'
            placeholder='https://example.com/image.png'
            type='text'
            required
            {...form.getInputProps("url")}
          />

          <Button
            variant={"gradient"}
            gradient={{ from: "purple", to: "pink" }}
            fullWidth
            type={"submit"}
          >
            Add
          </Button>
        </form>
      </Modal>

      <Group position='center'>
        <Button onClick={() => setOpenNewMemberModal(true)}>
          Add new member
        </Button>
      </Group>
    </>
  );
};

export default LocalSessionController;
