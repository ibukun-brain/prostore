# Prostore - Modern E-Commerce Platform

Prostore is a full-featured, modern e-commerce application built with Next.js 15+, React 19, TypeScript, and Tailwind CSS. It features a robust architecture with PostgreSQL utilizing Prisma ORM, ensuring a seamless and scalable shopping experience.

## Images
Home<img width="1919" height="1079" alt="cart" src="https://github.com/user-attachments/assets/1c593329-5b20-49e4-aaaf-6b9116f2d2cc" />
Product Detail<img width="1907" height="1079" alt="detail" src="https://github.com/user-attachments/assets/18f6d468-412e-4a69-8400-5b88c7dad5c2" />
Cart <img width="1919" height="1073" alt="home" src="https://github.com/user-attachments/assets/fecf13ba-9714-4ab5-baa6-91b2ef4edd30" />

## 🚀 Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js (v5)](https://authjs.dev/)
- **State Management:** React Hooks & Context
- **Payments:** [Stripe](https://stripe.com/) & [PayPal](https://developer.paypal.com/)
- **Validations:** [Zod](https://zod.dev/)
- **Email:** [Resend](https://resend.com/) & [React Email](https://react.email/)
- **Uploads:** [UploadThing](https://uploadthing.com/)

## ✨ Key Features

- **Storefront:**
  - Modern, responsive landing page with featured products and carousel.
  - Comprehensive product listing with pagination and filters.
  - Detailed product pages with images, descriptions, and related items.
  - Real-time product search functionality.
  - Shopping cart with persistent state.
  - Secure checkout process with multiple payment gateways (Stripe, PayPal).
  - User order history and tracking.
  - Product reviews and ratings system.
  
- **Authentication:**
  - Secure user registration and login using NextAuth v5.
  - Credential-based and OAuth provider support.
  - Role-based access control (Admin vs. Customer).

- **Admin Dashboard:**
  - Overview of sales, orders, and user statistics.
  - Product management (Create, Read, Update, Delete).
  - Order management and status updates (Paid, Delivered).
  - User management.

- **Utilities:**
  - **Dark Mode:** Built-in theme switcher.
  - **Image Uploads:** Drag-and-drop image uploading via UploadThing.
  - **Email Notifications:** Transactional emails for order confirmations and updates using Resend.

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/) database
- A package manager (npm, yarn, pnpm, or bun)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd prostore
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory copying the keys from `.env.local` or `.env.example`. You will need to configure:
   - Database connection string (`DATABASE_URL`)
   - NextAuth secret and URL
   - Payment gateway keys (Stripe/PayPal)
   - UploadThing credentials
   - Resend API key

   Example `.env` structure:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/prostore"
   AUTH_SECRET="your-super-secret-key"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   # Add other provider keys here
   ```

4. **Database Migration:**
   Initialize the database schema using Prisma:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `app/`: Contains the Next.js App Router pages, layouts, and API routes.
  - `(root)/`: Main storefront layout and pages.
  - `(auth)/`: Authentication related pages.
  - `admin/`: Admin dashboard routes.
  - `api/`: Backend API endpoints.
- `components/`: Reusable UI components (buttons, inputs, etc.) and feature-specific components.
- `lib/`: Utility functions, helper classes, and server actions.
- `db/`: Database connection and seed scripts.
- `prisma/`: Prisma schema file (`schema.prisma`) and migrations.
- `types/`: Global TypeScript type definitions.
- `public/`: Static assets.
- `email/`: React Email templates.

## 📜 Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the application for production |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to identify code issues |
| `npm run test` | Runs Jest tests |
| `npm run postinstall` | Generates Prisma Client (runs automatically on install) |
| `npm run email` | Starts the email development server |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request to improve the functionality or design.

## 📄 License

This project is licensed under the MIT License.
