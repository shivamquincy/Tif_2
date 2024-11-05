import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import { PageNumbers } from "../../interface/home";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import * as Yup from "yup";
import { useData } from "../../containers/home/DataProvider"; // Import the context

const InterviewDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const { state, setState } = useData(); // Use the context so that any changes made here are visible on the app
  

  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: state.interviewSettings.interviewMode, // Initialize with current state values
      interviewDuration: state.interviewSettings.interviewDuration,
      interviewLanguage: state.interviewSettings.interviewLanguage,
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview Mode is required"),
      interviewDuration: Yup.string().required("Interview Duration is required"),
      interviewLanguage: Yup.string().required("Interview Language is required"),
    }),
    onSubmit: (values) => {
      // Update the context with form values on submission
      alert("Form successfully submitted"); // Keep the alert for user feedback
    },
  });

  // Directly update context when input changes
  const handleFieldChange = (field: string, value: any) => {
    setFieldValue(field, value); // Update Formik value
    setState((prevState) => ({
      ...prevState,
      interviewSettings: {
        ...prevState.interviewSettings,
        [field]: value, // Update the specific field in the context state
      },
    }));
  };
  
  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={(field: any,value: any) => handleFieldChange("interviewMode", value)}
          onBlur={() => setFieldTouched("interviewMode", true)}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={(field: any,value: any) => handleFieldChange("interviewDuration", value)}
          onBlur={() => setFieldTouched("interviewDuration", true)}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={(field: any,value: any) => handleFieldChange("interviewLanguage", value)}
          onBlur={() => setFieldTouched("interviewLanguage", true)}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(1)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
