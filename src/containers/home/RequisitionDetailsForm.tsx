import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { useData } from "../../containers/home/DataProvider"; // Import useData hook
import { genderOptions, urgencyOptions } from "./constants";

const RequisitionDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const { state, setState } = useData(); // Accessing context state and setter

  const {
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
  } = useFormik({
    initialValues: state.requisitionDetails, // Use context initial values
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      // Proceed with form submission if necessary
      handleTab(1); // Move to next tab or page
    },
  });

  // Directly update context when input changes
  const handleFieldChange = (field: string, value: any) => {
    setFieldValue(field, value); // Set Formik's field value
    setState((prevState) => ({
      ...prevState,
      requisitionDetails: {
        ...prevState.requisitionDetails,
        [field]: value,
      },
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={(e) => handleFieldChange("requisitionTitle", e.target.value)}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={(e) => handleFieldChange("noOfOpenings", e.target.value)}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={(field: any, value: any) => handleFieldChange("gender", value)}
          onBlur={() => setFieldTouched("gender", true)}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={(field: any, value: any) => handleFieldChange("urgency", value)}
          onBlur={() => setFieldTouched("urgency", true)}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}

        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
