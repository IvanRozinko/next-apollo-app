Next-apollo-app

1. Clone project
2. Install npm packages (npm i)
3. Run `npm run dev`

Main page to login enter creds: 

  email: Barcelona
  password: pass

Or you can change them at `pages/api/login.js`

To enter a `{/transport}` uri you need to be auhenticated 
To search closest bike stations add query params at uri:

  `/transport?lat={latitude}&lng={longitude}`

  where `{latitude}` and `{longitude}` need to be a numbers (float format ideal)
