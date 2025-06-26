# Crypto Exchange Platform

This is a feature-rich, modern crypto exchange platform built with Next.js, TypeScript, and Tailwind CSS. It provides a comprehensive suite of tools for trading cryptocurrencies, managing wallets, and handling fiat transactions. The entire frontend is designed to be fully responsive and component-based, making it easy to maintain and extend.

## Features

-   **Dedicated Trading Page**: A professional trading interface that includes:
    -   **Advanced Trade Form**: Supports both **Market** and **Limit** orders for buying and selling.
    -   **Live Price Chart**: A real-time, interactive chart displaying price history for trading pairs.
    -   **Order Book**: A real-time view of open buy (bids) and sell (asks) orders.
    -   **Order History**: A paginated and filterable table of the user's past and open orders.
-   **Comprehensive Wallet Dashboard**: A user-friendly interface for managing digital assets, including:
    -   **Portfolio Overview**: A summary of total balance, 24h changes, and portfolio allocation charts.
    -   **Asset Management**: A detailed list of all owned assets, with current prices and balances.
    -   **Transaction History**: A complete record of all deposits, withdrawals, and trades.
-   **Fiat & Crypto Transactions**:
    -   **Fiat Deposits/Withdrawals**: Forms for depositing and withdrawing fiat currency via bank transfer or card.
    -   **Crypto Send/Receive**: Functionality to send and receive cryptocurrencies, with QR code generation for deposit addresses.
-   **Modern Tech Stack**:
    -   Built with **Next.js** and **React** for a fast, server-rendered application.
    -   Fully typed with **TypeScript** for improved code quality and maintainability.
    -   Styled with **Tailwind CSS** for a utility-first, modern design.
    -   Includes a variety of UI components from **Shadcn/UI**.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   Node.js (v18.x or later)
-   pnpm (or npm/yarn)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/crypto-exchange.git
    cd crypto-exchange
    ```
2.  Install the dependencies:
    ```bash
    pnpm install
    ```

### Running the Application

To run the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

The project is organized into several key directories:

-   `app/`: Contains all the pages and routing for the application, following the Next.js App Router structure.
-   `components/`: Contains all the reusable React components, organized by feature (e.g., `trading`, `wallet`).
-   `lib/`: Contains shared libraries, utility functions, and API services.
    -   `lib/api/`: Home to the API service files (`tradeService.ts`, `walletService.ts`, `fiatService.ts`). **This is where backend integration happens.**
    -   `lib/hooks/`: Custom React hooks for fetching and managing data.
-   `styles/`: Global styles for the application.
-   `public/`: Static assets like images and fonts.

## Backend Integration Guide

Currently, the application operates with mock API services to simulate backend interactions. To connect the frontend to a real backend, you will need to modify the functions within the `lib/api/` directory.

The key files to update are:

1.  **`lib/api/tradeService.ts`**:
    -   **`createOrder(params: TradeOrder)`**: Replace the mock implementation with a real API call to your backend to create a trade order. The function should handle the response from your API and return it in the format defined by the `TradeResponse` interface.

2.  **`lib/api/walletService.ts`**:
    -   **`sendTransaction(params: SendTransactionParams)`**: Modify this function to call your backend's endpoint for sending cryptocurrency.
    -   **`generateDepositAddress(asset: string)`**: Update this to fetch a real deposit address for the specified asset from your backend.
    -   **`getNetworkFee(asset: string)`**: This should be updated to fetch real-time network fees from your backend or a third-party service.

3.  **`lib/api/fiatService.ts`**:
    -   **`depositFiat(params: FiatTransactionParams)`**: Connect this function to your payment processor's API to handle fiat deposits.
    -   **`withdrawFiat(params: FiatTransactionParams)`**: Connect this to your payment processor's API to handle fiat withdrawals.

By updating these service files, you can seamlessly integrate the frontend with your backend infrastructure without needing to change any of the UI components.

## Technologies Used

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
-   **Charting**: [Recharts](https://recharts.org/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
