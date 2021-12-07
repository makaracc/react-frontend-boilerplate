import { useState } from "react";
import { Box } from "@mui/material";
import { EnhancedTable, EnhancedModal } from "components/index";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "../../../../node_modules/@mui/material/index";

export const Tutorial = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const dialogContent = useState("modal open successful");

  let sampleTable = (
    <EnhancedTable
      data={[
        { Name: "John Doe", Age: 25, habit: "coding" },
        { Name: "Mark Ro", Age: 12, habit: "playing" },
      ]}
    />
  );

  let sampleModal = (
    <Card>
      <CardContent>
        <EnhancedModal
          dialogTitle="Sample Modal"
          dialogContent={dialogContent}
          isOpen={modalStatus}
          onSubmit={() => {
            setModalStatus(true);
          }}
          onClose={() => {
            setModalStatus(false);
          }}
        />
      </CardContent>
      <CardActions>
        <Button
          onClick={()=>{modalStatus?setModalStatus(false):setModalStatus(true);}}>ClickHere</Button>
      </CardActions>
    </Card>
  );

  let content = (
    <Box>
      <Typography>Hi</Typography>
      {sampleTable}
      {sampleModal}
    </Box>
  );
  return content;
};
