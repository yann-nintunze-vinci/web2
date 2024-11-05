import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { Drink } from "../../types";
import { FC } from "react";

interface DrinkMenuProps {
  title: string;
  drinks: Drink[];
}

const DrinkMenu: FC<DrinkMenuProps> = ({ title, drinks }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}>
        {drinks.map((drink, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <CardMedia
                component="img"
                image={drink.image}
                alt={drink.title}
                style={{ objectFit: "contain", height: "200px" }} // Ensure image is fully visible
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {drink.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {drink.volume}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Prix: {drink.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DrinkMenu;
