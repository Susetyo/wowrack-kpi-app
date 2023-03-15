import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors';
import { getHeader } from '@/commons/utils/fetchOptions';

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
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
  req: NextApiRequest,
  res: NextApiResponse
) {
  try{
    await runMiddleware(req, res, cors)
    const response = await fetch('http://127.0.0.1:3000/api/user/create', {
      method: "POST",
      mode: "cors",
      headers: getHeader(req.headers.cookie),
      body: JSON.stringify(req.body),
    });
    const data = await response.json()
    return res.end(JSON.stringify(data))
  }catch(err:any){
    return res.end(JSON.stringify({'error': err.message}))
  }
}