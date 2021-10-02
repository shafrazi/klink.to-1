import { useContext } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import { AppContext } from 'src/context';
import axios from 'axios';

const useStyles = makeStyles({
  media: {
    width: '80%',
    height: '80%',
    maxWidth: 300
  }
});

const ProductLink = ({ product, ...rest }) => {
  const classes = useStyles();
  const { baseUrl } = useContext(AppContext);

  const createLinkItemData = () => {
    axios
      .post(baseUrl + '/api/link_item_data', { link_item_id: product.id })
      .then((response) => {})
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
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 6
          }}
        >
          <CardMedia
            height="400"
            image={product.image}
            component="img"
            title={product.title}
            className={classes.media}
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
          noWrap
        >
          {product.title}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body2"
          noWrap
          paragraph
        >
          {product.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <Button
          color="primary"
          variant="contained"
          // component={Link}
          // href={product.source}
          // target="_blank"
          onClick={() => {
            window.open(product.source, '_blank');
            createLinkItemData();
          }}
        >
          Go to link
        </Button>
      </Box>
    </Card>
  );
};

export default ProductLink;
