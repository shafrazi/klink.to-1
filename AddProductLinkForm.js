import React from 'react';
import { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';

import DialogActions from '@material-ui/core/DialogActions';

import { TextField, makeStyles } from '@material-ui/core';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

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

export default function AddProductLinkForm(props) {
  const classes = useStyles();
  const { slug } = props;
  const navigate = useNavigate();
  const { baseUrl, userToken, handleCloseModal, productPage, setProductPage } =
    useContext(AppContext);
  const [productLink, setProductLink] = useState({ slug: slug });

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
    const url = baseUrl + '/api/link_items';
    const options = {
      headers: {
        Authorization: `bearer ${userToken}`
      }
    };
    axios
      .post(url, productLink, options)
      .then((response) => {
        setProductPage((prevProductPage) => {
          return {
            ...prevProductPage,
            link_items: [...prevProductPage.link_items, productLink]
          };
        });
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div>
        <TextField
          name="title"
          label="Title"
          defaultValue={productLink.title}
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          name="description"
          label="Description"
          defaultValue={productLink.description}
          variant="outlined"
          multiline
          rows={5}
          fullWidth
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          name="source"
          label="Source"
          defaultValue={productLink.source}
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          name="image"
          label="Image"
          defaultValue={productLink.image}
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          name="price"
          label="Price"
          defaultValue={productLink.price}
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
      </div>

      <DialogActions>
        <Button variant="contained" color="primary" size="large" type="submit">
          Create Page
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
    </form>
  );
}
