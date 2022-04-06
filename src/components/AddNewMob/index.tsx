import {
    Button,
    Center,
    Loader,
    Space,
    Text,
    TextInput,
  } from "@mantine/core";
  import { useForm } from "@mantine/hooks";
  import { useContext, useState } from "react";
  import { Navigate } from "react-router-dom";
  import { AuthContext, AuthContextInterface } from "../../services/AuthProvider";
import { MobSession } from "../../types/MobSession";
  import {
    mobInitialValues,
    mobValidationRules,
    mobErrorMessages,
  } from "./helper";
  
  function SignupForm() {
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
  
    const auth = useContext<AuthContextInterface | null>(AuthContext);
    const form = useForm<MobSession>({
      initialValues: mobInitialValues,
      validationRules: mobValidationRules,
      errorMessages: mobErrorMessages,
    });
  
    const onSubmitHandler = async (values: MobSession) => {
      setLoading(true);
      console.log("test", values);
      const data = await auth?.postMobTimer(values);
  
      if (data) setIsSuccess(true);
      setLoading(false);
    };
  
    if (isSuccess) return <Navigate to='/' />;
  
    return (
      <form
        style={{ justifyContent: "space-between" }}
        onSubmit={form.onSubmit((values: MobSession) =>
          onSubmitHandler(values)
        )}
      >
        <Center>
          <Text size={"xl"} weight={700} align={"center"}>
            Create Mob
          </Text>
          {loading && <Loader ml='lg' />}
        </Center>
        <Space h={"xl"} />
        <TextInput
          label={"MobName"}
          placeholder={"Your mob name"}
          required
          {...form.getInputProps("displayName")}
        />
        <TextInput
          label={"Round time"}
          placeholder={"Mob round time"}
          required
          {...form.getInputProps("roundTime")}
        />
        <Space h={"xs"} />
        <TextInput
          label={"Break time"}
          placeholder={"Mob break time"}
          required
          {...form.getInputProps("breakTime")}
        />
        <Space h={"xs"} />
        <Button 
            disabled={loading}
            type={"submit"} 
            variant={"gradient"} 
            gradient={{from: 'orange', to: 'red'}}>
          Save
        </Button>
        <Space h={"sm"} />
      </form>
    );
  }
  
  export default SignupForm;
  