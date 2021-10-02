import {
  Box,
  Card,
  CardContent,
  TextField,
  makeStyles,
  DialogActions,
  Button
} from '@material-ui/core';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AppContext } from 'src/context';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1)
      }
    }
  };
});

const EditProductLink = ({ product, ...rest }) => {
  const classes = useStyles();
  const { handleCloseModal, baseUrl, userToken, setProductPage } =
    useContext(AppContext);
  const [productLink, setProductLink] = useState(product);
  const url = baseUrl + '/api/link_items/' + productLink.id;
  const options = {
    headers: {
      Authorization: `bearer ${userToken}`
    }
  };

  const handleChange = (event) => {
    setProductLink((prevProductLink) => {
      return {
        ...prevProductLink,
        [event.target.name]: event.target.value
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(url, productLink, options)
      .then((response) => {
        const currentLinkItem = response.data;
        setProductLink(currentLinkItem);
        setProductPage((prevProductPage) => {
          const updatedLinkItems = prevProductPage.link_items.filter(
            (linkItem) => {
              return currentLinkItem.id !== linkItem.id;
            }
          );
          return {
            ...prevProductPage,
            link_items: [currentLinkItem, ...updatedLinkItems]
          };
        });
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          <img src={productLink.image} />
        </Box>
        <div>
          <TextField
            name="title"
            label="Title"
            value={productLink.title}
            variant="outlined"
            multiline
            fullWidth
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            name="source"
            label="Target link"
            value={productLink.source}
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
            value={productLink.description}
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
            value={productLink.price}
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
          Save
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
      </DialogActions>
    </Card>
  );
};

export default EditProductLink;
