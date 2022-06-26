import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
    Typography,
} from "@mui/material/";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { fieldName } from "../../utils/naming";

const ConfirmDialog = (props) => {
    const { deleteVal, open, setOpen, handleDelete } = props;

    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle>Konfirmasi</DialogTitle>
            <Box position="absolute" top={0} right={0}>
                <IconButton>
                    <CloseRoundedIcon onClick={() => setOpen(false)} />
                </IconButton>
            </Box>
            <DialogContent>
                <Typography>
                    Anda yakin ingin menghapus <b>{deleteVal.name}</b>?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setOpen(false)}
                >
                    Batal
                </Button>
                <Button
                    sx={{
                        color: "white",
                        backgroundColor: "red",
                        borderColor: "green",
                        "&:hover": {
                            backgroundColor: "red",
                        },
                    }}
                    variant="contained"
                    onClick={() => {
                        handleDelete(deleteVal.id);
                        setOpen(false);
                    }}
                >
                    Ya, Hapus
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
