import { LoadingButton } from "@mui/lab";
import{ Box, Container, TextField, Typography } from "@mui/material";
import{ useState } from "react";

const API_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=`;


export default function App() {

  const data_registro="";
  const bandera = true;
  const [city,setCity] = useState("");
  const[loading, setLoading] = useState(false);
  const [error , setError] = useState({
    error : false,
    message: "",
  });

  const [Weather, setWeather] = useState({
    city:"",
    country:"",
    temp:"",
    condition:"",
    icon:"",
    conditionText:"",
  });

  const onSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    setError({
      error:false,
      message:"",
    });
    try{
      if(!city.trim()) throw { message: "El campo ciudad es obligatorio"};
      
      const response = await fetch(`${API_WEATHER}${city}&aqi=no`);
      const data = await response.json();
      console.log(data);

      if(data.error) throw { message: "La localidad no fue encontrada"};
      if(!city.trim() || data.error) throw {bandera: false};
      

      setWeather({
        city: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.code,
        icon: data.current.condition.icon,
        conditionText: data.current.condition.text,
      });

      if(bandera) throw {
        data_registro: data_registro + Weather,
      }

    }catch (error) {
      setError({
        error: true,
        message: error.message,
      });
    } finally{
      setLoading(false);
    }
   
    
  }

  return(
    <Container
      maxWidth="xs"
      sx={{ mt : 2 }}
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
      >
        Weather App
      </Typography>
      <Box
        sx={{display:"grid", gap:2}}
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
        id="city"
        label="Ciudad"
        variant="outlined"
        size="small"
        required
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        error={error.error}
        helperText={error.message}
        ></TextField>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator="Cargando..."
        >
          Buscar
        </LoadingButton>
      </Box>

      {Weather.city && (
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gap: 2,
            textAlign: "center",
          }}
           >
      

      <Typography variant="h4" component="h2">
        {Weather.city}, {Weather.country}
      </Typography>
      <Box
        component="img"
        alt={Weather.conditionText}
        src={Weather.icon}
        sx={{ margin: "0 auto" }}
      />
      
      <Typography variant="h5" component="h3">
        {Weather.temp} °C
      </Typography>

      <Typography variant="h6" component="h4">
        {Weather.conditionText}
      </Typography>
      </Box>
      )}
      <Typography
        textAlign="center"
        sx={{ mt: 2, fontSize: "10px"}}
      >
        Powered by:{" "}
        <a
        href="https://www.weatherapi.com/"
        title="Weather Api"
        >
          WeatherApi
        </a>
      </Typography>
    </Container>
  );

  
}