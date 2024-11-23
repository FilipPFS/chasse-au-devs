import connectToDb from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth"; // Import the Profile type

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        await connectToDb();

        const user = await User.findOne({ email: profile?.email });

        if (!user) {
          const username = profile?.name?.slice(0, 20);
          await User.create({
            email: profile?.email,
            username,
            image: profile?.picture,
          });
        }

        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
    async session({ session }) {
      try {
        await connectToDb();

        const user = await User.findOne({
          email: session.user.email,
        });

        if (user) {
          session.user.id = user._id.toString();
        } else {
          // Handle missing user gracefully, e.g., by logging or adding a placeholder
          console.warn("User not found in database");
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session; // Return the session even if there's an error
      }
    },
  },
};
