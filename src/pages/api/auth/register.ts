// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import type { NextApiRequest, NextApiResponse } from 'next'
import {hash} from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST"){
    await connectToMongoDB().catch(err => res.status(400).json({error : "MongoDB connection lost!"}));
    const {full_name, email, password} = req.body;
    const isExist = await User.findOne({email});
    if (isExist) return res.status(400).json({error : "User already exists!"});
    else{
        const user = await User.create({
            full_name,
            email,
            password : await hash(password, 10)
        })
        return res.status(200).json(user);
    }
  }
  else{
    return res.status(404).json({error : "Bad request"});
  }
}
