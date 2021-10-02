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

function AddProductPageForm() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { baseUrl, userToken, handleCloseModal } = useContext(AppContext);
  const [productPage, setProductPage] = useState({});

  const handleChange = (event) => {
    setProductPage((prevProductPage) => {
      return {
        ...prevProductPage,
        [event.target.name]: event.target.value
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = baseUrl + '/api/product_pages';
    const options = {
      headers: {
        Authorization: `bearer ${userToken}`
      }
    };

    axios
      .post(url, productPage, options)
      .then((response) => {
        setProductPage(response.data);
        handleCloseModal();
        navigate(`/app/product-page-admin/${response.data.slug}`, {
          replace: true
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit}>
        <div>
          <TextField
            name="title"
            label="Page name"
            defaultValue={productPage.title}
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            name="description"
            label="Description"
            defaultValue={productPage.description}
            variant="outlined"
            multiline
            rows={5}
            fullWidth
            onChange={handleChange}
          />
        </div>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
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
    </div>
  );
}

export default AddProductPageForm;
