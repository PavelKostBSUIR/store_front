import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
function MyProductItem(props) {
  const navigate = useNavigate();
  const product = props.product;
  const userId = props.userId;
  const editProduct = props.editProduct;
  const getDetails = (id) => {
    navigate("" + id);
  };
  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{
          height: "100%",
        }}
      >
        <CardMedia
          image={product.photos[0]}
          component="img"
          alt="image"
          title={product.name}
          sx={{ height: 200 }}
        />
        <CardContent>
          <Typography variant="h6" component="h3">
            {product.name}
          </Typography>
          <Typography variant="body1">Category: {product.category}</Typography>
          <Typography variant="body1">City: {product.city}</Typography>
          <Typography variant="body1">Cost: {product.cost}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="text" onClick={() => getDetails(product.id)}>
            Details
          </Button>
          <Button variant="text" onClick={() => editProduct(product.id)}>
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
export default observer(MyProductItem);
//maybe observer
