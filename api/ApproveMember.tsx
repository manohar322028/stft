import React from "react";
import { Box, FormGroup, Label, Input, Button } from "@adminjs/design-system";
import Member from "./models/member.model.js";
import ActionProps from "adminjs";

const ApproveMember = (props: ActionProps) => {
  // const { record } = props;
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const membershipNumber = formData.get("membership_number");
  //   await Member.findOneAndUpdate(
  //     { _id: record.get("_id") },
  //     { membershipNumber }
  //   );
  // };

  return (
    // <Box variant="white" width={1 / 2} p="lg" m="auto" mt="xxl">
    //   <form onSubmit={handleSubmit}>
    //     <FormGroup>
    //       <Label htmlFor="membership_number">Membership Number</Label>
    //       <Input
    //         id="membership_number"
    //         name="membership_number"
    //         placeholder="Enter membership number"
    //       />
    //     </FormGroup>
    //     <Button variant="primary" mt="md" type="submit">
    //       Submit
    //     </Button>
    //   </form>
    // </Box>
    <Box>Hello World</Box>
  );
};

export default ApproveMember;
