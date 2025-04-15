'use client'

import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function StakingApp() {
  const [walletAddress, setWalletAddress] = useState('')
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [amount, setAmount] = useState('')

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setProvider(new ethers.BrowserProvider(window.ethereum))
    }
  }, [])

  async function connectWallet() {
    if (!provider) return
    const accounts = await provider.send('eth_requestAccounts', [])
    setWalletAddress(accounts[0])
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value)
  }

  async function stakeTokens() {
    alert(`Staking ${amount} tokens (simulate only, no contract)`)
  }

  async function unstakeTokens() {
    alert(`Unstaking tokens (simulate only, no contract)`)
  }

  async function claimRewards() {
    alert(`Claiming rewards (simulate only, no contract)`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Monad Staking Dashboard</h1>

        <Card className="bg-gray-800">
          <CardContent className="p-4 space-y-4">
            <Button onClick={connectWallet} className="w-full">
              {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
            </Button>
            <Input 
              placeholder="Amount to stake" 
              value={amount} 
              onChange={handleInputChange} 
              className="text-black"
            />
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={stakeTokens}>Stake</Button>
              <Button onClick={unstakeTokens} variant="secondary">Unstake</Button>
              <Button onClick={claimRewards} variant="outline" className="col-span-2">Claim Rewards</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Staking Info</h2>
            <ul className="space-y-2 text-sm">
              <li>Total Staked: 0 MONAD</li>
              <li>Your Stake: 0 MONAD</li>
              <li>Rewards: 0 MONAD</li>
              <li>Auto-Compound: Enabled</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
