# Chatbot Web Application

This project is a chatbot web application built with **Next.js**. Below is a guide to the file structure and an explanation of important directories and files for better understanding.

---

## App Routes and File Structure

In Next.js 13, we use the `app` directory for routing. The basic structure of routing involves folders representing routes, with special files like `page.tsx` for rendering the page content.

```bash
├── app/
│   ├── layout.tsx           # Default layout for the app
│   ├── (auth)/              # Routes related to authentication
│   │   └── route_name/      # Login page and register page
│   │       └── page.tsx     # Renders the login page
│   ├── (root)/              # Root-level routes for the application
│   │   ├── route_name/      # Custom routes (e.g., chatbot, profile)
│   │   │   └── page.tsx     # Renders the specific route page
├── components/              # Reusable UI components
├── lib/                     # Helper functions, actions, hooks, and utilities
│   ├── action/              # Server actions (e.g., form submissions, API calls)
│   ├── hooks/               # Custom React hooks
│   └── utils.ts             # Utility functions used across the app
├── middleware.ts            # Middleware for handling request-level tasks
├── public/                  # Static assets like images and fonts
├── styles/                  # Global styles and Tailwind configuration
│   └── tailwind.config.ts   # Tailwind CSS configuration
├── types/                   # TypeScript type definitions
└── tsconfig.json            # TypeScript configuration
```

---

## Tech stack

1. NextJS
2. Vercel
3. shadcn ui
4. Tailwind css
5. Typescript
6. firebase
7. zod
8. ...

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.