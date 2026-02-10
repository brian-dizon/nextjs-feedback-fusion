# Feedback Fusion 🚀

> **A modern, full-stack feedback management platform built with Next.js 16, Tailwind CSS v4, and Prisma.**

Feedback Fusion allows product teams to collect suggestions, let users vote on features, and display a transparent public roadmap. This project is a **Next.js 16 showcase**, featuring advanced patterns like Server Actions, Streaming with Suspense, and robust Type Safety.

## ✨ Key Features

- **🗳️ Community Feedback**: Users can submit ideas, report bugs, and upvote the features they want most.
- **🗺️ Public Roadmap**: A Kanban-style board showing features in `Planned`, `In Progress`, and `Completed` states.
- **⚡ Instant Performance**: Headers and layouts load in **0ms** thanks to granular **React Suspense** streaming.
- **🔐 Role-Based Security**: Secure Admin Dashboard protected by Clerk Authentication and Database Role checks.
- **🎨 Modern UI**: Built with **Tailwind CSS v4** and **Shadcn UI** for a beautiful, accessible, and dark-mode-ready interface.
- **🛡️ Type-Safe**: Zero `any` types. Full end-to-end type safety with TypeScript and Zod.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Prisma ORM](https://www.prisma.io/))
- **Authentication**: [Clerk](https://clerk.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Forms**: React Hook Form + Zod (Client & Server Validation)
- **Icons**: Lucide React

## 🚀 "v2.0" Improvements

This project was built as an enhanced version of a standard reference implementation. Here are the key upgrades:

| Feature           | Improvement               | Impact                                                                              |
| :---------------- | :------------------------ | :---------------------------------------------------------------------------------- |
| **Data Fetching** | **Streaming w/ Suspense** | Headers load instantly; data streams in via Skeletons. No "white screen" waiting.   |
| **Mutations**     | **Server Actions**        | Simplified logic, type-safe arguments, and automatic UI updates (`revalidatePath`). |
| **Forms**         | **RHF + Zod**             | Real-time validation (e.g., "Title too short") providing immediate user feedback.   |
| **Security**      | **Double-Lock Auth**      | API routes enforce admin roles even if the UI is bypassed.                          |
| **Efficiency**    | **In-Memory Stats**       | Reduced database round-trips by 75% on the Roadmap page.                            |
| **Compatibility** | **Next.js 16 Ready**      | Correctly handles async `params` and `searchParams`.                                |

## 📦 Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/feedback-fusion.git
    cd feedback-fusion
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file and add your keys:

    ```env
    DATABASE_URL="postgresql://..."
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
    CLERK_SECRET_KEY="sk_test_..."
    ```

4.  **Initialize Database:**

    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the dev server:**
    ```bash
    npm run dev
    ```

## 📂 Project Structure

- `app/(auth)`: Custom, themed Sign-In and Sign-Up pages.
- `app/actions`: Server Actions for secure database mutations.
- `app/admin`: Secured admin dashboard for managing feedback status.
- `app/feedback`: The main community dashboard with voting.
- `app/roadmap`: Kanban-style public roadmap with statistics.
- `components/ui`: Reusable Shadcn UI components.
- `lib/prisma.ts`: Singleton Prisma client instance.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
