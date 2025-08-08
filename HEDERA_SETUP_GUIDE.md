# Hedera Wallet Integration Setup Guide

## Overview
This guide explains how to set up and use the Hedera wallet integration in the Divasity platform.

## Prerequisites

### 1. HashPack Wallet Extension
Users need to install the HashPack wallet extension:
- **Chrome**: [HashPack Chrome Extension](https://chrome.google.com/webstore/detail/hashpack/gjagmgiddbbciopjhllkdnddhcglnemk)
- **Firefox**: [HashPack Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/hashpack/)

### 2. Hedera Account
Users need a Hedera account with some HBAR for transactions:
- Create account through HashPack
- Fund account via exchanges or faucet (testnet)

## Installation & Dependencies

The following packages have been added to support Hedera integration:

```bash
npm install @hashgraph/hedera-wallet-connect @hashgraph/sdk
```

## File Structure

```
src/
├── components/Advanced/
│   ├── HederaWalletConnect.tsx    # Main wallet connection component
│   ├── HederaTransactions.tsx     # Transaction history display
│   ├── HederaTransfer.tsx         # HBAR transfer functionality
│   └── __tests__/
│       └── HederaWalletConnect.test.tsx
├── services/
│   └── hederaWalletService.ts     # Core wallet service
├── store/
│   └── walletStore.ts             # Enhanced with Hedera state
└── pages/Customer/
    └── Wallet.tsx                 # Updated wallet page
```

## How to Use

### 1. Navigate to Wallet Tab
- Click on the "Wallet" tab in the main navigation
- The Hedera wallet connection interface will be displayed

### 2. Connect Wallet
- Click "Connect Hedera Wallet" button
- HashPack extension will prompt for connection approval
- Approve the connection in the extension popup
- Account information and balance will be displayed

### 3. View Account Information
Once connected, users can see:
- Account ID (e.g., 0.0.123456)
- Current HBAR balance
- Network (mainnet/testnet)
- Connection status

### 4. Send HBAR
- Click "Send HBAR" button
- Enter recipient account ID (format: 0.0.123456)
- Enter amount to send
- Click "Send HBAR" to initiate transfer
- Approve transaction in HashPack extension

### 5. View Transaction History
- Transaction history is automatically displayed
- Shows recent HBAR transfers
- Click "View" to open transaction in Hedera explorer
- Refresh button to update transaction list

### 6. Disconnect Wallet
- Click "Disconnect" button to disconnect wallet
- All wallet data will be cleared from local storage

## Technical Implementation

### Wallet Connection Flow
1. Check if HashPack extension is installed
2. Request connection to local wallet
3. Retrieve account IDs from wallet
4. Initialize Hedera client (mainnet/testnet)
5. Fetch account balance
6. Store connection data in localStorage

### Transaction Flow
1. Validate recipient account ID format
2. Validate transfer amount
3. Create transfer transaction
4. Sign transaction through HashPack
5. Submit to Hedera network
6. Display transaction result

### State Management
- Uses Zustand store for wallet state
- Persists connection data in localStorage
- Manages connection status across app

## Error Handling

### Common Errors and Solutions

1. **"HashPack wallet not found"**
   - Solution: Install HashPack browser extension

2. **"No accounts found in wallet"**
   - Solution: Create Hedera account in HashPack

3. **"Insufficient balance"**
   - Solution: Add HBAR to account

4. **"Invalid Hedera account ID format"**
   - Solution: Use format 0.0.123456

5. **"Transfer failed"**
   - Solution: Check network connection and account balance

## Security Considerations

1. **Private Keys**: Never stored in application
2. **Transactions**: All signed through HashPack extension
3. **Data Storage**: Only account ID and balance stored locally
4. **Network**: Supports both mainnet and testnet

## Testing

Run the test suite:
```bash
npm test src/components/Advanced/__tests__/HederaWalletConnect.test.tsx
```

## Network Configuration

### Testnet (Default)
- Network ID: testnet
- Explorer: https://hashscan.io/testnet
- Free HBAR available through faucet

### Mainnet
- Network ID: mainnet  
- Explorer: https://hashscan.io/mainnet
- Real HBAR required for transactions

## Troubleshooting

### Connection Issues
1. Ensure HashPack extension is installed and unlocked
2. Check if account exists in HashPack
3. Verify network connectivity
4. Clear browser cache and localStorage

### Transaction Issues
1. Verify sufficient HBAR balance
2. Check recipient account ID format
3. Ensure HashPack is unlocked
4. Check network status

## Future Enhancements

1. **Token Support**: Add HTS (Hedera Token Service) support
2. **Smart Contracts**: Integration with Hedera smart contracts
3. **Multi-Signature**: Support for multi-sig accounts
4. **Staking**: Hedera staking functionality
5. **NFTs**: Hedera NFT support

## Support

For issues related to:
- **HashPack**: Contact HashPack support
- **Hedera Network**: Check Hedera status page
- **Integration**: Check console logs and error messages

## Resources

- [Hedera Documentation](https://docs.hedera.com/)
- [HashPack Documentation](https://www.hashpack.app/docs)
- [Hedera SDK Documentation](https://docs.hedera.com/hedera/sdks-and-apis)
- [Hedera Explorer](https://hashscan.io/)