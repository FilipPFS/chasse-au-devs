import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Extend the user type to include ID
      email: string;
      name?: string; // Optional, as it's not always provided
      image?: string; // Optional, as it's not always provided
    };
  }

  interface Profile {
    email: string;
    name: string;
    picture: string;
  }
}
