import React from "react";

import { Box, FormGroup, Label, Input, Button } from "@adminjs/design-system";
import axios from "axios";
import { ActionProps } from "adminjs";

const ApproveMember = (props: ActionProps) => {
  const api_url = "http://localhost:3000";
  const { record, resource } = props;
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("isApproved", "true");
    axios
      .post(
        `${api_url}/admin/api/resources/${resource.id}/records/${record?.params._id}/edit`,
        formData
      )
      .then((res) => {
        window.location = res.data.redirectUrl;
      });
  };

  return (
    <Box variant="white" width={1 / 2} p="lg" m="auto" mt="xxl">
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="membership_number">Membership Number</Label>
          <Input
            id="membership_number"
            name="membership_number"
            placeholder="Enter membership number"
            required
          />
        </FormGroup>
        <Button variant="primary" mt="md" type="submit">
          Submit
        </Button>
      </form>
    </Box>
    // <div>Hello World</div>
  );
};

export default ApproveMember;
