import {
  Container,
  Stack,
  Divider,
  Box,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/useStore";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Images from "../common/imageSwiper";
function ActiveProduct(props) {
  const { id } = useParams();
  const store = useStore().productStore;
  const rootStore = useStore();
  useEffect(() => store.fetchActiveProduct(id), []);
  return store.activeProduct ? (
    <Container>
      <Stack
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
        pt={2}
      >
        <Box xs={3}>
          <Images pictures={store.activeProduct.photos} />
        </Box>
        <Box>
          <Typography variant="h6" component="h3">
            {store.activeProduct.name}
          </Typography>
          <Typography variant="body1">
            City: {store.activeProduct.city}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" component="h3">
            Characteristics
          </Typography>
          <Box>
            <Typography variant="body1">
              Category:{store.activeProduct.category}
            </Typography>
            <Typography variant="body1">
              Price:{store.activeProduct.cost}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h6" component="h3">
            Description
          </Typography>
          <Typography variant="body1">
            {store.activeProduct.description}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" component="h3">
            About owner
          </Typography>
          <Typography variant="body1">
            Name:{store.activeProduct.owner.name}
          </Typography>
          <Typography variant="body1">
            Surname:{store.activeProduct.owner.surname}
          </Typography>
          <Typography variant="body1">
            Number:{store.activeProduct.owner.phoneNumber}
          </Typography>
        </Box>
      </Stack>
    </Container>
  ) : (
    <div>Loading...</div>
  );
}
export default observer(ActiveProduct);
