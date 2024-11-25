import express, { Request, Response } from 'express'
const app = express()
import {router} from '../src/routes' 
app.use(express.json())
app.use('/api/v1/', router)

app.get('/', (_req: Request, res: Response) => {
   res.json({message: 'Backend Working'})
})

app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});
