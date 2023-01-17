import {Typography,Card,CardContent,Stack, Box} from "@mui/material"
import { getProfile } from '../services/profile'
import { useQuery } from 'react-query'
interface ProfileData{
  firstname : string,
  lastname : string,
  email : string,
}
export const Profile = () => {
  const {data,isLoading} = useQuery(["userData"],getProfile);
  if(isLoading){
    return <p>Loading...</p>
  }
  console.log(data);
  const profileData : ProfileData = data?.data;
  return (
    <Box sx={{
      marginLeft : 30,
      marginTop : 10,
      marginRight : "auto",
      height : 10,
      width : 500
    }}>
      <Card>
      <CardContent>
        <Stack direction="row" spacing={3}>
        <Typography variant='h6'>First Name :</Typography><Typography sx={{padding:1}}>{profileData.firstname}</Typography>
        </Stack>
        <Stack direction="row" spacing={3}>
        <Typography variant='h6'>Last Name :</Typography><Typography sx={{padding:1}}>{profileData.lastname}</Typography>
        </Stack>
        <Stack direction="row" spacing={3}>
        <Typography variant='h6'>Email :</Typography><Typography sx={{padding:1}}>{profileData.email}</Typography>
        </Stack>
      </CardContent>
    </Card> 
    </Box>
  )
}
