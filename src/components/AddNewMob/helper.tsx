import {
    UseFormErrors,
    ValidationRule,
  } from "@mantine/hooks/lib/use-form/use-form";
import { MobSession } from "../../types/MobSession";
  
  
  export const mobInitialValues: MobSession = {
    id: 0,
    uniqueId: '',
    displayName: '',
    roundTime: 30,
    startTime: new Date(),
    breakTime: 30,
    pausedTime: new Date(),
  };
  
  export const mobValidationRules: ValidationRule<MobSession> = {
    displayName: (value) => value?.length > 1 && value?.length < 21,
    roundTime: (value) => value !== 0 ,
    breakTime: (value) => value !== 0,
  };
  
  export const mobErrorMessages: UseFormErrors<MobSession> = {
    displayName: "display name must be 2 to 20 characters",
    roundTime: "roundtime should not be zero",
    breakTime: "breaktime should not be zero",
  };
  