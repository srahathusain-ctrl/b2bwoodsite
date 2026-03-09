import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AzureADProvider from "next-auth/providers/azure-ad";
import { getCustomer } from "@/lib/registered-customers";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email    = credentials.email.toLowerCase().trim();
        const password = credentials.password;

        // ── Admin ────────────────────────────────────────────
        if (email === "admin@steelwood.ae" && password === "admin1234") {
          return {
            id:    "admin-1",
            email: "admin@steelwood.ae",
            name:  "Portal Administrator",
            role:  "admin",
          };
        }

        // ── Demo B2B customer ────────────────────────────────
        if (email === "danish@steelwood.ae" && password === "demo") {
          return {
            id:          "1",
            email:       "danish@steelwood.ae",
            name:        "Danish Hussain",
            role:        "customer",
            companyName: "SteelWood Demo Co.",
          };
        }

        // ── Registered customers (server-side registry) ──────
        const customer = getCustomer(email);
        if (
          customer &&
          customer.password === password &&
          customer.status !== "suspended"
        ) {
          return {
            id:          customer.id,
            email:       customer.email,
            name:        customer.contactName,
            role:        "customer",
            companyName: customer.companyName,
          };
        }

        return null;
      },
    }),
    AzureADProvider({
      clientId:     process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId:     process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role        = (user as { role?: string }).role;
        token.companyName = (user as { companyName?: string }).companyName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role               = token.role as string;
        (session.user as { companyName?: string }).companyName = token.companyName as string;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
