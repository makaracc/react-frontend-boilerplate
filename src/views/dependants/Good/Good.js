import { EnhancedEditor, EnhancedModal, EnhancedTable } from "components/index";
import { useState } from "react";
import { Box, Button, Card, CardActions, CardContent, Typography } from "../../../../node_modules/@mui/material/index";

export const Good = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const dialogContent = useState("The modal is open right now!");
  let editorContent = <EnhancedEditor></EnhancedEditor>;

  let tableContent = (
    <EnhancedTable
      data={[
        { Name: "John Doe", Age: 25, habit: "coding" },
        { Name: "Mark Ro", Age: 12, habit: "playing" },
      ]}
    />
  );
  let modalContent = (
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
      {editorContent}
      {tableContent}
      {modalContent}
    </Box>
  );

  return content;
};
