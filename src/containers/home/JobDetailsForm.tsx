import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormInput from "../../components/formComponents/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IJobDetails } from "../../interface/forms";
import { useData } from "../../containers/home/DataProvider"; // Import the context

const JobDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const { state, setState } = useData(); // Use the context

  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    values,
    handleSubmit,
    setFieldValue,
  } = useFormik<IJobDetails>({
    initialValues: {
      jobTitle: state.jobDetails.jobTitle, // Initialize with current state values
      jobDetails: state.jobDetails.jobDetails,
      jobLocation: state.jobDetails.jobLocation,
    },
    validationSchema: Yup.object().shape({
      jobTitle: Yup.string().required("Job Title is required"),
      jobDetails: Yup.string().required("Job Details is required"),
      jobLocation: Yup.string().required("Job Location is required"),
    }),
    onSubmit: (values) => {
      // Update the context with form values on submission
      setState((prev) => ({
        ...prev,
        jobDetails: {
          ...prev.jobDetails,
          jobTitle: values.jobTitle,
          jobDetails: values.jobDetails,
          jobLocation: values.jobLocation,
        },
      }));
      handleTab(2); // Move to the next step
    },
  });

  // Function to handle field changes and update the context in real-time
  const handleFieldChange = (field: keyof IJobDetails, value: any) => {
    setFieldValue(field, value); // Update Formik's internal value
    setState((prev) => ({
      ...prev,
      jobDetails: {
        ...prev.jobDetails,
        [field]: value, // Update the specific field in context
      },
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={(e) => handleFieldChange("jobTitle", e.target.value)} // Update context on change
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={(e) => handleFieldChange("jobDetails", e.target.value)} // Update context on change
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={(e) => handleFieldChange("jobLocation", e.target.value)} // Update context on change
          onBlur={handleBlur}
          value={values?.jobLocation}
          error={errors?.jobLocation}
          touched={touched?.jobLocation}
        />

        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(0)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
