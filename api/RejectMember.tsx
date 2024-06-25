import React from "react";
import {
  Box,
  FormGroup,
  Label,
  TextArea,
  Button,
} from "@adminjs/design-system";
import { ActionProps } from "adminjs";
import axios from "axios";

const RejectMember = (props: ActionProps) => {
  const { record, resource } = props;

  const api_url = "http://localhost:3000";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post(
        `${api_url}/admin/api/resources/${resource.id}/records/${record?.params._id}/delete`
      )
      .then((res) => {
        window.location.href = `${api_url}/admin/resources/${resource.id}`;
      });
  };

  return (
    <Box variant="white" width={1 / 2} p="lg" m="auto" mt="xxl">
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="rejection_message">Rejection Message</Label>
          <TextArea
            id="rejection_message"
            name="rejection_message"
            placeholder="Enter rejection message"
          />
        </FormGroup>
        <Button variant="primary" mt="md" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default RejectMember;
