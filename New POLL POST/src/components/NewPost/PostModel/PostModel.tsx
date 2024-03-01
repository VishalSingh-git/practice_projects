import { Box, Modal, Typography } from "@mui/material";
import "./PostModel.css"

interface PostModelProps {
  postData: any;
  open: boolean;
  handleClose: () => void;
}



const PostModel: React.FC<PostModelProps> = ({
  open,
  handleClose,
  postData,
}) => {
  return (
    <Modal open={open} onClose={handleClose} data-testid="model">
      <Box className="postModelContainer">
        <Typography variant="h5" className="postModelTitle">
          Post_JSON Data
        </Typography>
        <pre className="postModelContent">
          {JSON.stringify(postData, null, 2)}
        </pre>
      </Box>
    </Modal>
  );
};

export default PostModel;
