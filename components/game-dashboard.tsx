'use client';

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface GameState {
  screen: string
  playerName: string
  playerCollege: string
  playerRole: string
  walletBalance: number
  creditScore: number
  financialHealth: number
  stressLevel: number
  currentMonth: number
  investments: Array<{
    type: string
    amount: number
    monthlyProfit: number
  }>
}

interface GameDashboardProps {
  gameState: GameState
  onMakeDecision: () => void
  onOpenInvestment: () => void
  onNextMonth: () => void
  onViewLeaderboard: () => void
}

export default function GameDashboard({
  gameState,
  onMakeDecision,
  onOpenInvestment,
  onNextMonth,
  onViewLeaderboard,
}: GameDashboardProps) {
  const [displayBalance, setDisplayBalance] = useState(gameState.walletBalance)

  useEffect(() => {
    setDisplayBalance(gameState.walletBalance)
  }, [gameState.walletBalance])

  const healthColor =
    gameState.financialHealth >= 75
      ? 'text-green-600'
      : gameState.financialHealth >= 50
        ? 'text-yellow-600'
        : 'text-red-600'

  const stressColor =
    gameState.stressLevel <= 33
      ? 'text-green-600'
      : gameState.stressLevel <= 66
        ? 'text-yellow-600'
        : 'text-red-600'

  const creditColor =
    gameState.creditScore >= 750
      ? 'text-green-600'
      : gameState.creditScore >= 650
        ? 'text-yellow-600'
        : 'text-red-600'

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-blue-50 to-green-50 pb-32">
      {/* Header with player info */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 pt-8 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm opacity-90 font-medium">Month {gameState.currentMonth}</p>
            <h1 className="text-3xl font-extrabold">{gameState.playerName}</h1>
            <p className="text-sm opacity-90">{gameState.playerCollege}</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-90 font-medium">Role</p>
            <p className="text-2xl font-bold">
              {gameState.playerRole === 'Intern' ? '💼' : '👨‍🎓'} {gameState.playerRole}
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-6">
        {/* Wallet Card - LARGE */}
        <div className="bg-gradient-to-br from-yellow-300 via-amber-200 to-orange-300 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
          <p className="text-sm text-orange-900 font-bold opacity-80 mb-2">YOUR WALLET</p>
          <h2 className="text-5xl font-extrabold text-orange-900 mb-2">
            ₹{displayBalance.toLocaleString('en-IN')}
          </h2>
          <div className="h-2 bg-orange-900 bg-opacity-20 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-1000"
              style={{ width: `${Math.min((displayBalance / 200000) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Credit Score */}
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <p className="text-xs text-gray-600 font-bold mb-2">CREDIT SCORE</p>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-2xl font-extrabold ${creditColor}`}>
                {gameState.creditScore}
              </p>
              <p className="text-2xl">📊</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  gameState.creditScore >= 750
                    ? 'bg-green-500'
                    : gameState.creditScore >= 650
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${((gameState.creditScore - 300) / 600) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Financial Health */}
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <p className="text-xs text-gray-600 font-bold mb-2">HEALTH</p>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-2xl font-extrabold ${healthColor}`}>
                {gameState.financialHealth}%
              </p>
              <p className="text-2xl">❤️</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  gameState.financialHealth >= 75
                    ? 'bg-green-500'
                    : gameState.financialHealth >= 50
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${gameState.financialHealth}%` }}
              ></div>
            </div>
          </div>

          {/* Stress Level */}
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <p className="text-xs text-gray-600 font-bold mb-2">STRESS</p>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-2xl font-extrabold ${stressColor}`}>
                {gameState.stressLevel}%
              </p>
              <p className="text-2xl">😰</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  gameState.stressLevel <= 33
                    ? 'bg-green-500'
                    : gameState.stressLevel <= 66
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${gameState.stressLevel}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Investments Summary */}
        {gameState.investments.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <p className="text-sm font-bold text-gray-700 mb-3">📈 Active Investments</p>
            <div className="space-y-2">
              {gameState.investments.map((inv, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-green-50 p-3 rounded-xl"
                >
                  <div>
                    <p className="font-bold text-gray-800">{inv.type}</p>
                    <p className="text-xs text-gray-600">₹{inv.amount.toLocaleString('en-IN')}</p>
                  </div>
                  <p className="font-bold text-green-600">
                    +₹{inv.monthlyProfit.toLocaleString('en-IN')}/mo
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button
            onClick={onMakeDecision}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-6 rounded-2xl font-bold text-base shadow-xl transform hover:scale-105 active:scale-95 transition-all"
          >
            🎯 Make a Decision
          </Button>
          <Button
            onClick={onOpenInvestment}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-6 rounded-2xl font-bold text-base shadow-xl transform hover:scale-105 active:scale-95 transition-all"
          >
            💹 Invest Money
          </Button>
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={onNextMonth}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-6 rounded-2xl font-bold text-base shadow-xl transform hover:scale-105 active:scale-95 transition-all"
          >
            ⏭️ Next Month
          </Button>
          <Button
            onClick={onViewLeaderboard}
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-6 rounded-2xl font-bold text-base shadow-xl transform hover:scale-105 active:scale-95 transition-all"
          >
            🏆 Leaderboard
          </Button>
        </div>
      </div>
    </div>
  )
}
