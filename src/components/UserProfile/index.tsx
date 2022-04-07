import { useState, useContext } from "react";
import Axios from "axios";
import { useForm } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  Group,
  Text,
  useMantineTheme,
  MantineTheme,
  Image,
  Grid,
  Button,
  Center,
  Space,
  TextInput,
  Loader,
} from "@mantine/core";
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { AuthContext, AuthContextInterface } from "../../services/AuthProvider";
import {
  getIconColor,
  ImageUploadIcon,
  userInitialValues,
  userValidationRules,
  userErrorMessages,
} from "./helpers";
import { selectUser } from "../../store/CurrentUser";
import { User } from "../../types/User";

export default function UserProfile({ onClose }: { onClose: () => void }) {
  const theme = useMantineTheme();
  const [img, setImg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const auth = useContext<AuthContextInterface | null>(AuthContext);
  const form = useForm<User>({
    initialValues: user ? user : userInitialValues,
    validationRules: userValidationRules,
    errorMessages: userErrorMessages,
  });

  const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
    <Group
      position='center'
      spacing='xl'
      style={{ minHeight: 220, pointerEvents: "none" }}
    >
      <ImageUploadIcon
        status={status}
        style={{ color: getIconColor(status, theme) }}
        size={100}
      />

      <Text size='lg' inline>
        Drag image here or click to select files
      </Text>
    </Group>
  );

  const onSubmitHandler = async (values: User) => {
    setLoading(true);
    const data = await auth?.updateUser(values);
    if (data) {
      setIsSuccess(true);
      setLoading(false);
      onClose();
    }
    setLoading(false);
  };

  const uploadImage = (image: any) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "icyemhhs");
    data.append("cloud_name", "dmythh2na");
    Axios.post("https://api.cloudinary.com/v1_1/dmythh2na/image/upload", data)
      .then((response) => response)
      .then((response) => {
        setImg(response.data.secure_url);
        form.setFieldValue("profileImage", response.data.secure_url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      style={{ justifyContent: "space-between" }}
      onSubmit={form.onSubmit((values: User) => onSubmitHandler(values))}
    >
      <Center>
        <Text size={"xl"} weight={700} align={"center"}>
          Edit Profile
        </Text>
        {loading && <Loader ml='lg' />}
      </Center>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label={"Username"}
            required
            {...form.getInputProps("username")}
          />
          <TextInput
            label={"First name"}
            required
            {...form.getInputProps("firstName")}
          />
          <Space h={"xs"} />
          <TextInput
            label={"Last name"}
            required
            {...form.getInputProps("lastName")}
          />
          <Space h={"xs"} />
          <TextInput
            label={"Email"}
            required
            {...form.getInputProps("emailAddress")}
          />
          <Space h={"xs"} />
        </Grid.Col>

        <Grid.Col span={6}>
          <Space h={"xs"} />
          <Dropzone
            onDrop={(files) => uploadImage(files[0])}
            onReject={(files) => console.log("rejected files", files[0])}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            {(status) => dropzoneChildren(status, theme)}
          </Dropzone>
        </Grid.Col>
      </Grid>
      <Center>
        <Image width={200} src={img} alt='' />
      </Center>
      <Space h={"xs"} />
      <Center>
        <Button
          disabled={loading}
          type={"submit"}
          variant={"gradient"}
          gradient={{ from: "orange", to: "red" }}
        >
          Save
        </Button>
      </Center>
    </form>
  );
}
