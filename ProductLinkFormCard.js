import {
  Box,
  Card,
  CardContent,
  TextField,
  makeStyles,
  DialogActions,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1)
      }
    }
  };
});

const ProductLinkFormCard = ({
  product,
  handleChange,
  handleSubmit,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...rest}
    >
      <CardContent className={classes.root}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 6
          }}
        >
          <img src={product.image} />
        </Box>
        <div>
          <TextField
            name="title"
            label="Title"
            value={product.title}
            variant="outlined"
            multiline
            fullWidth
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            name="description"
            label="Description"
            value={product.description}
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            name="price"
            label="Price"
            value={product.price}
            variant="outlined"
            fullWidth
            multiline
            onChange={handleChange}
          />
        </div>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
        >
          Create Product Link
        </Button>
      </DialogActions>
    </Card>
  );
};

export default ProductLinkFormCard;
