'use client';

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface GameState {
  walletBalance: number
}

interface InvestmentPageProps {
  gameState: GameState
  onComplete: (type: string, amount: number, monthlyProfit: number) => void
  onBack: () => void
}

const investmentTypes = [
  {
    name: 'Fixed Deposit',
    emoji: '🏦',
    riskLevel: 'Low Risk',
    riskColor: 'bg-green-100 text-green-700',
    color: 'from-green-400 to-emerald-500',
    minAmount: 5000,
    returnRate: 0.065, // 6.5% yearly = 0.54% monthly
    description: 'Safe, steady returns. Your money grows slow but sure.',
  },
  {
    name: 'Mutual Fund',
    emoji: '📊',
    riskLevel: 'Medium Risk',
    riskColor: 'bg-yellow-100 text-yellow-700',
    color: 'from-yellow-400 to-amber-500',
    minAmount: 2000,
    returnRate: 0.10, // 10% yearly = 0.83% monthly
    description: 'Balanced growth. Some ups and downs expected.',
  },
  {
    name: 'Stocks',
    emoji: '🚀',
    riskLevel: 'High Risk',
    riskColor: 'bg-red-100 text-red-700',
    color: 'from-red-400 to-orange-500',
    minAmount: 1000,
    returnRate: 0.15, // 15% yearly = 1.25% monthly (but volatile)
    description: 'Big potential gains! But also big losses possible.',
  },
]

export default function InvestmentPage({ gameState, onComplete, onBack }: InvestmentPageProps) {
  const [selectedType, setSelectedType] = useState<number | null>(null)
  const [investAmount, setInvestAmount] = useState('')
  const [completed, setCompleted] = useState(false)

  const handleInvest = () => {
    if (selectedType !== null && investAmount) {
      const amount = parseInt(investAmount)
      const investment = investmentTypes[selectedType]

      if (amount < investment.minAmount) {
        alert(`Minimum investment is ₹${investment.minAmount}`)
        return
      }

      if (amount > gameState.walletBalance) {
        alert(`You don't have enough balance! You have ₹${gameState.walletBalance}`)
        return
      }

      const monthlyProfit = Math.floor((amount * investment.returnRate) / 12)

      setCompleted(true)
      setTimeout(() => {
        onComplete(investment.name, amount, monthlyProfit)
      }, 1500)
    }
  }

  const selectedInvestment = selectedType !== null ? investmentTypes[selectedType] : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-100 via-cyan-50 to-blue-50 p-6 flex flex-col items-center justify-center pb-20">
      {/* Decorative shapes */}
      <div className="absolute top-5 right-5 w-24 h-24 bg-teal-300 rounded-full opacity-40 blur-xl"></div>
      <div className="absolute bottom-20 left-5 w-32 h-32 bg-cyan-300 rounded-full opacity-30 blur-2xl"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center mb-2 text-teal-700">💹 Invest Money</h1>
        <p className="text-center text-gray-600 mb-8 font-medium">
          Your wallet: ₹{gameState.walletBalance.toLocaleString('en-IN')}
        </p>

        {!completed ? (
          <>
            {/* Investment Options */}
            <div className="space-y-4 mb-6">
              {investmentTypes.map((investment, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedType(idx)}
                  className={`w-full p-4 rounded-2xl transition-all transform hover:scale-105 ${
                    selectedType === idx
                      ? `bg-gradient-to-r ${investment.color} text-white shadow-2xl scale-105`
                      : 'bg-white text-gray-800 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <p className="text-3xl">{investment.emoji}</p>
                      <div>
                        <p className="font-bold text-lg text-left">{investment.name}</p>
                        <p className={`text-xs font-bold px-2 py-1 rounded-full w-fit ${investment.riskColor}`}>
                          {investment.riskLevel}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className={`text-sm text-left ${selectedType === idx ? 'text-white' : 'text-gray-600'}`}>
                    {investment.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Amount Input */}
            {selectedInvestment && (
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <p className="text-sm font-bold text-gray-700 mb-3">Amount to Invest</p>
                <div className="relative mb-4">
                  <span className="absolute left-3 top-3 text-2xl font-bold text-gray-600">₹</span>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    className="w-full pl-10 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 text-lg font-bold"
                  />
                </div>

                {/* Projected Returns */}
                {investAmount && (
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 border-2 border-blue-200">
                    <p className="text-xs text-gray-600 font-bold mb-2">Monthly Returns (Projected)</p>
                    <p className="text-2xl font-extrabold text-green-600">
                      +₹{Math.floor((parseInt(investAmount) * selectedInvestment.returnRate) / 12).toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                      Yearly: ₹{Math.floor(parseInt(investAmount) * selectedInvestment.returnRate).toLocaleString('en-IN')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={onBack}
                variant="outline"
                className="py-3 rounded-xl font-bold text-base bg-transparent"
              >
                ← Back
              </Button>
              <Button
                onClick={handleInvest}
                disabled={!selectedType || !investAmount}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-bold disabled:opacity-50"
              >
                Invest Now
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4 animate-bounce-slow">🎉</div>
            <p className="text-2xl font-bold text-green-600">Investment Successful!</p>
            <p className="text-gray-700 font-medium">
              You invested ₹{investAmount.toLocaleString('en-IN')} in {selectedInvestment?.name}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
