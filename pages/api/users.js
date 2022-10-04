import {dbConnect} from '../../utils/mongoose'

dbConnect()

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req,res){
    res.send('Res test text')
  }