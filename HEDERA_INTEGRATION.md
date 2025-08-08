# Hedera Wallet Integration

This branch implements Hedera wallet connection functionality for the Divasity platform.

## Features Added

### 1. Hedera Wallet Connection Component
- **File**: `src/components/Advanced/HederaWalletConnect.tsx`
- Provides wallet connection interface for Hedera network
- Supports HashPack wallet extension
- Handles connection/disconnection states
- Displays connected account information
- Error handling for wallet connection issues

### 2. Updated Wallet Page
- **File**: `src/pages/Customer/Wallet.tsx`
- Integrated Hedera wallet connection in the wallet tab
- When users click on the "Wallet" tab, they can now connect to Hedera wallet
- Maintains existing wallet functionality alongside Hedera integration

### 3. Enhanced Wallet Store
- **File**: `src/store/walletStore.ts`
- Added Hedera-specific state management
- Tracks Hedera connection status and account ID
- Provides actions for connecting/disconnecting Hedera wallet

## How It Works

1. **User Navigation**: When users click on the "Wallet" tab in the navigation
2. **Wallet Connection**: The page displays the Hedera wallet connection component
3. **HashPack Integration**: Users can connect their HashPack wallet extension
4. **Account Display**: Connected account information is displayed
5. **State Management**: Connection state is managed through Zustand store

## Dependencies Added

- `@hashgraph/hedera-wallet-connect`: For Hedera wallet connectivity
- `@hashgraph/sdk`: Hedera SDK for blockchain interactions

## Usage

1. Navigate to the Wallet tab
2. Click "Connect Hedera Wallet" button
3. Approve connection in HashPack extension
4. View connected account details
5. Use "Disconnect" to disconnect wallet

## Technical Implementation

- Uses HashConnect protocol for wallet integration
- Stores connection data in localStorage for persistence
- Provides TypeScript interfaces for wallet data
- Implements proper error handling and loading states
- Follows existing UI/UX patterns in the application

## Future Enhancements

- Add HBAR balance display
- Implement token transfers
- Add transaction history from Hedera network
- Support for multiple Hedera wallet providers
- Integration with Hedera smart contracts