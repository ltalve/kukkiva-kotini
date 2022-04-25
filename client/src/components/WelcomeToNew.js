import { Box, Typography, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";

function WelcomeToNew(props) {
  const history = useHistory();

  const navigateToNew = (e) => {
    e.preventDefault();
    history.push("/uusikasvi");
  };

  return (
    <Box
      width="80%"
      margin="auto"
      mt="10px"
      p="40px"
      backgroundColor="rgba(253, 254, 254, 0.9)"
      borderRadius="3px"
    >
      <Typography variant="h4" style={{ marginBottom: 30 }}>
        Tervetuloa Kukkivaan kotiini!
      </Typography>

      <Typography variant="h6" style={{ marginBottom: 10 }}>
        Jos tarvitset apua viherkasviesi hoitamisessa, olet tullut oikeaan
        paikkaan. Lisäämällä viherkasviesi tiedot Kukkivaan kotiini, saat
        käyttöösi:
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <FilterVintageIcon />
          </ListItemIcon>
          <ListItemText primary="kastelumuistutukset" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FilterVintageIcon />
          </ListItemIcon>
          <ListItemText primary="lannoitusmuistutukset" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FilterVintageIcon />
          </ListItemIcon>
          <ListItemText primary="muistutukset mullanvaihdosta" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FilterVintageIcon />
          </ListItemIcon>
          <ListItemText primary="muistikirjan kukinnoille, pistokkaille, tuholaistorjunnalle ym." />
        </ListItem>
      </List>

      <Typography variant="h6" marginTop="10px">
        Iloisia hetkiä kukoistavien kasviesi parissa!
      </Typography>

      <Button
        variant="contained"
        disableElevation
        color="success"
        onClick={navigateToNew}
        style={{ marginTop: 30 }}
        fullWidth
      >
        Aloita lisäämällä ensimmäinen kasvisi
      </Button>
    </Box>
  );
}

export default WelcomeToNew;
