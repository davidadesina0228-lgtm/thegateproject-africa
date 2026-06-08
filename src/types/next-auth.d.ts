import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: string;
      status: string;
      onboardingCompleted: boolean;
    };
  }

  interface User {
    role: string;
    status: string;
    onboardingCompleted: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    status: string;
    onboardingCompleted: boolean;
  }
}