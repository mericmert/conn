import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/user';
import {compare} from 'bcrypt';
import { connectToMongoDB } from '@/lib/mongodb';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId : process.env.GOOGLE_CLIENT_ID!,
      clientSecret : process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials : {
        email: { label: "Email", type: "text"},
        password: { label: "Password", type: "password" }
      },
      //@ts-ignore
      async authorize(credentials: any) {
        await connectToMongoDB().catch(err => console.log(err));

        const user = await User.findOne({ email: credentials.email });

        // Check if user exists
        if (!user) {
          return null;
        }

        // Validate password
        const isPasswordMatch = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) {
          return null;
        }

        return {
          name: user.full_name,
          email: user.email,
        };
      },
    }),
  ],

  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
});