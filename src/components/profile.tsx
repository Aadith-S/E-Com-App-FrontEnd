import React from 'react'
import {Typography,Card,CardContent,Stack, Box} from "@mui/material"
import Paper from '@mui/material/Paper'
interface ProfileData{
  firstname : string,
  lastname : string,
  email : string,
  phone : string,
  address : string
}
const profileData : ProfileData = { firstname: 'John', lastname: 'Doe', email: 'john@doe.com',phone : "9812938192",address : "address" }
export const Profile = () => {
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
        <Stack direction="row" spacing={3}>
        <Typography variant='h6'>Phone :</Typography><Typography sx={{padding:1}}>{profileData.phone}</Typography>
        </Stack>
        <Stack direction="row" spacing={3}>
        <Typography variant='h6'>Address :</Typography><Typography sx={{padding:1}}>{profileData.address}</Typography>
        </Stack>
      </CardContent>
    </Card> 
    </Box>
  )
}
