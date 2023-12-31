import { Header, Grid } from 'semantic-ui-react';
import { KtoF } from '../../utils/tempConversions'


export default function HeroCard({ currentUser, sanitizeFirstName, userLocation, loading, setLoading }) {

  if (loading) {
    return (
      <h2>Hang on a sec, {sanitizeFirstName(currentUser.username)}!</h2>
    )
  }

  return (
    <Grid columns={1}>
      <Header as='h2'>Hello, {sanitizeFirstName(currentUser.username)}!</Header>
      <img src={`https://openweathermap.org/img/wn/${userLocation?.weather[0]?.icon}@2x.png`} />
      <p style={{ fontSize: "2em" }}>Looks like it's {userLocation?.weather[0]?.main.toLowerCase()} and {KtoF(userLocation?.main?.temp).toFixed(0) + "º F"} in {userLocation?.name} right now…</p>
    </Grid>
  )
}