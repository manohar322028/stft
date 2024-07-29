import React from "react";
import { Box, FormGroup, Label, Input, Button } from "@adminjs/design-system";
import axios from "axios";
import { ActionProps } from "adminjs";

const ApproveMember = (props: ActionProps) => {
  const api_url = "http://localhost:3000";
  const { record, resource } = props;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("isApproved", "true");

    try {
      const res = await axios.put(
        `${api_url}/api/members/${record?.params._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      window.location.href = "http://localhost:3000/admin/resources/Member";
    } catch (error) {
      alert("An error occurred: " + error.response?.data?.message);
    }
  };

  const handleApprove = async () => {
    const formData = new FormData();
    formData.append("isApproved", "true");

    try {
      const res = await axios.post(
        `${api_url}/admin/api/resources/${resource.id}/records/${record?.params._id}/edit`,
        formData
      );

      window.location.href = res.data.redirectUrl;
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <Box variant="white" width={1 / 2} p="lg" m="auto" mt="xxl">
      {record?.params.isNew ? (
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="membership_number">Membership Number</Label>
            <Input
              id="membership_number"
              name="membership_number"
              placeholder="Enter membership number"
              required
            />

            <Label htmlFor="membership_certificate">
              Membership Certificate
            </Label>
            <Input
              id="membership_certificate"
              name="membership_certificate"
              type="file"
              accept="image/*, application/pdf"
              required
            />
          </FormGroup>
          <Button variant="primary" mt="md" type="submit">
            Submit
          </Button>
        </form>
      ) : (
        <Button variant="primary" mt="md" onClick={handleApprove}>
          Confirm Approve
        </Button>
      )}
    </Box>
  );
};

export default ApproveMember;
