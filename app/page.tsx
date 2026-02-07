'use client'

import { useState } from 'react'
import LandingPage from '@/components/landing-page'
import PlayerSetupPage from '@/components/player-setup-page'
import GameDashboard from '@/components/game-dashboard'
import DecisionScreen from '@/components/decision-screen'
import InvestmentPage from '@/components/investment-page'
import MonthlySummaryPage from '@/components/monthly-summary-page'
import LeaderboardPage from '@/components/leaderboard-page'

type GameScreen = 'landing' | 'setup' | 'dashboard' | 'decision' | 'investment' | 'summary' | 'leaderboard'

interface GameState {
  screen: GameScreen
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

const initialState: GameState = {
  screen: 'landing',
  playerName: '',
  playerCollege: '',
  playerRole: '',
  walletBalance: 50000,
  creditScore: 650,
  financialHealth: 60,
  stressLevel: 30,
  currentMonth: 1,
  investments: [],
}

export default function Page() {
  const [gameState, setGameState] = useState<GameState>(initialState)

  const handleStartGame = () => {
    setGameState((prev) => ({ ...prev, screen: 'setup' }))
  }

  const handleSetupComplete = (name: string, college: string, role: string) => {
    setGameState((prev) => ({
      ...prev,
      screen: 'dashboard',
      playerName: name,
      playerCollege: college,
      playerRole: role,
    }))
  }

  const handleMakeDecision = () => {
    setGameState((prev) => ({ ...prev, screen: 'decision' }))
  }

  const handleDecisionComplete = (
    walletChange: number,
    creditScoreChange: number,
    stressChange: number,
    healthChange: number
  ) => {
    setGameState((prev) => ({
      ...prev,
      screen: 'dashboard',
      walletBalance: Math.max(0, prev.walletBalance + walletChange),
      creditScore: Math.min(900, Math.max(300, prev.creditScore + creditScoreChange)),
      stressLevel: Math.min(100, Math.max(0, prev.stressLevel + stressChange)),
      financialHealth: Math.min(100, Math.max(0, prev.financialHealth + healthChange)),
    }))
  }

  const handleOpenInvestment = () => {
    setGameState((prev) => ({ ...prev, screen: 'investment' }))
  }

  const handleInvestmentComplete = (
    investmentType: string,
    amount: number,
    monthlyProfit: number
  ) => {
    setGameState((prev) => ({
      ...prev,
      screen: 'dashboard',
      walletBalance: prev.walletBalance - amount,
      investments: [
        ...prev.investments,
        {
          type: investmentType,
          amount,
          monthlyProfit,
        },
      ],
    }))
  }

  const handleNextMonth = () => {
    // Calculate investment profits
    let totalProfit = 0
    gameState.investments.forEach((inv) => {
      totalProfit += inv.monthlyProfit
    })

    // Add salary
    const salary = gameState.playerRole === 'Intern' ? 15000 : 25000

    setGameState((prev) => ({
      ...prev,
      screen: 'summary',
      currentMonth: prev.currentMonth + 1,
      walletBalance: prev.walletBalance + salary + totalProfit,
    }))
  }

  const handleSummaryComplete = () => {
    setGameState((prev) => ({ ...prev, screen: 'dashboard' }))
  }

  const handleViewLeaderboard = () => {
    setGameState((prev) => ({ ...prev, screen: 'leaderboard' }))
  }

  const handleBackToDashboard = () => {
    setGameState((prev) => ({ ...prev, screen: 'dashboard' }))
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {gameState.screen === 'landing' && (
        <LandingPage onStart={handleStartGame} />
      )}
      {gameState.screen === 'setup' && (
        <PlayerSetupPage onComplete={handleSetupComplete} />
      )}
      {gameState.screen === 'dashboard' && (
        <GameDashboard
          gameState={gameState}
          onMakeDecision={handleMakeDecision}
          onOpenInvestment={handleOpenInvestment}
          onNextMonth={handleNextMonth}
          onViewLeaderboard={handleViewLeaderboard}
        />
      )}
      {gameState.screen === 'decision' && (
        <DecisionScreen
          gameState={gameState}
          onComplete={handleDecisionComplete}
        />
      )}
      {gameState.screen === 'investment' && (
        <InvestmentPage
          gameState={gameState}
          onComplete={handleInvestmentComplete}
          onBack={handleBackToDashboard}
        />
      )}
      {gameState.screen === 'summary' && (
        <MonthlySummaryPage
          gameState={gameState}
          onComplete={handleSummaryComplete}
        />
      )}
      {gameState.screen === 'leaderboard' && (
        <LeaderboardPage
          playerName={gameState.playerName}
          playerHealth={gameState.financialHealth}
          onBack={handleBackToDashboard}
        />
      )}
    </main>
  )
}
