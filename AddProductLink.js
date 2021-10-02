import React from 'react';
import { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';

import DialogActions from '@material-ui/core/DialogActions';

import {
  TextField,
  makeStyles,
  CircularProgress,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl
} from '@material-ui/core';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { AppContext } from 'src/context';
import { Clear } from '@material-ui/icons';

import ProductLinkFormCard from 'src/components/ProductLinkFormCard';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1)
      }
    }
  };
});

export default function AddProductLink(props) {
  const classes = useStyles();
  const { slug } = props;
  const navigate = useNavigate();
  const { baseUrl, userToken, handleCloseModal, productPage, setProductPage } =
    useContext(AppContext);
  const [productLink, setProductLink] = useState({ slug: slug });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (event) => {
    setProductLink((prevProductLink) => {
      return {
        ...prevProductLink,
        [event.target.name]: event.target.value
      };
    });
    console.log(productLink);
  };

  const clearText = () => {
    setProductLink((prevProductLink) => {
      return {
        ...prevProductLink,
        source: '',
        title: '',
        description: '',
        price: '',
        image: ''
      };
    });
  };

  const handleGetDetails = (event) => {
    setProductLink((prevProductLink) => {
      return {
        ...prevProductLink,
        image: '',
        title: '',
        description: '',
        price: ''
      };
    });
    setLoading(true);
    setIsComplete(false);
    const options = {
      headers: {
        Authorization: `bearer ${userToken}`
      }
    };

    const url = baseUrl + '/api/scrape';
    event.preventDefault();
    axios
      .post(url, { url: productLink.source }, options)
      .then((response) => {
        if (response.data.data.is_complete) {
          setIsComplete(true);
          setProductLink((prevProductLink) => {
            return {
              ...prevProductLink,
              ...response.data.data.item
            };
          });
        } else {
          setErrors('Invalid URL. Please try again.');
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
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
        console.log(response);
        setProductPage((prevProductPage) => {
          return {
            ...prevProductPage,
            link_items: [...prevProductPage.link_items, response.data]
          };
        });
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form className={classes.root}>
        <div>
          <OutlinedInput
            id="source-input"
            name="source"
            value={productLink.source || ''}
            fullWidth
            onChange={handleChange}
            placeholder="Target link"
            autoFocus
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={clearText} edge="end">
                  {<Clear />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>

        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGetDetails}
            disabled={!productLink.source || loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            Get product details
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
      <div>
        {isComplete && (
          <ProductLinkFormCard
            product={productLink}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
