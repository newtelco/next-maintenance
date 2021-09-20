import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

const cypressLogin = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text", placeholder: "jsmith" },
    password: { label: "Password", type: "password" },
  },
  async authorize() {
    const user = () => {
      return {
        id: 1,
        name: "J Smith",
        email: "jsmith@example.com",
        image: "https://i.pravatar.cc/150?u=jsmith@example.com",
      }
    }
    if (user) {
      return user()
    } else {
      return null
    }
  },
})

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    process.env.NEXT_PUBLIC_ENV === "CI" && cypressLogin,
  ],
  pages: {
    signin: "/auth/signin",
  },
  secret: "aLjPYy0Xk3YJn5AGmyv9gcSYJa60nKP5Qf86i9oPpckiMTCksHNrNaCodjLauB8T",
  jwt: {
    secret: "aLjPYy0Xk3YJn5AGmyv9gcSYJa60nKP5Qf86i9oPpckiMTCksHNrNaCodjLauB8T",
    encryption: true,
  },
  debug: process.env.NODE_ENV === "development",
}

export default (req, res) => NextAuth(req, res, options)
