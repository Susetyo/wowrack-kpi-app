import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors';
import { getHeader } from '@/commons/utils/fetchOptions';
import axios from 'axios'

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD', 'PUT', 'DELETE'],
})

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req:NextApiRequest,
  res:NextApiResponse
) {
  try{
    await runMiddleware(req, res, cors)
    const {id} = req.query
    const {data} = await axios.delete(`http://127.0.0.1:3000/api/division/delete/${id}`,{ headers:getHeader(req.headers.cookie) })
    const response = await data.json()
    return res.end(JSON.stringify(response))
  }catch(err:any){
    return res.end(JSON.stringify({'error': err.message}))
  }
}