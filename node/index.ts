import express,{Express, Router, Request, Response} from 'express'
import axios from 'axios'
import { NextFunction } from 'connect'
const app:Express = express()

app.use('*', (req:Request,res:Response,next:NextFunction) =>{
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

const router:Router = express.Router()

app.use('/api',router)

router.get('/list',async (req:Request, res:Response) => {
    const result = await axios.post('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf')
    res.json({
        ...result.data.data
    })
})

app.listen(3333, () =>{
    console.log('success server http://localhost:3333');
})

