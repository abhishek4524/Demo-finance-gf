'use client';

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface GameState {
  walletBalance: number
  creditScore: number
}

interface DecisionScreenProps {
  gameState: GameState
  onComplete: (walletChange: number, creditChange: number, stressChange: number, healthChange: number) => void
}

const decisions = [
  {
    title: 'Phone Temptation',
    description: 'You want to buy a new phone for ₹15,000',
    emoji: '📱',
    options: [
      {
        text: 'Buy with Cash',
        outcome: { wallet: -15000, credit: 0, stress: -5, health: -10, feedback: 'Oops! Spent too much.' },
        color: 'bg-red-500',
      },
      {
        text: 'Buy on EMI (18% Interest)',
        outcome: { wallet: 0, credit: -20, stress: 15, health: -15, feedback: 'Debt cycle started!' },
        color: 'bg-yellow-500',
      },
      {
        text: 'Skip & Save',
        outcome: { wallet: 2000, credit: 20, stress: -10, health: 15, feedback: 'Smart choice! 💪' },
        color: 'bg-green-500',
      },
    ],
  },
  {
    title: 'Party Invitation',
    description: 'Friends invited you to a weekend trip for ₹8,000',
    emoji: '🎉',
    options: [
      {
        text: 'Go All In',
        outcome: { wallet: -8000, credit: 0, stress: -15, health: 10, feedback: 'Fun but broke!' },
        color: 'bg-blue-500',
      },
      {
        text: 'Spend Half',
        outcome: { wallet: -4000, credit: 5, stress: -5, health: 5, feedback: 'Good balance.' },
        color: 'bg-green-500',
      },
      {
        text: 'Skip It',
        outcome: { wallet: 0, credit: 10, stress: 5, health: 5, feedback: 'FOMO avoided.' },
        color: 'bg-yellow-500',
      },
    ],
  },
  {
    title: 'Credit Card Offer',
    description: 'A bank offers you a credit card with ₹50,000 limit',
    emoji: '💳',
    options: [
      {
        text: 'Accept (Risky)',
        outcome: { wallet: 0, credit: -30, stress: 20, health: -20, feedback: 'Debt trap ahead!' },
        color: 'bg-red-500',
      },
      {
        text: 'Accept (Careful)',
        outcome: { wallet: 0, credit: 15, stress: 0, health: 0, feedback: 'Use it wisely.' },
        color: 'bg-yellow-500',
      },
      {
        text: 'Decline',
        outcome: { wallet: 0, credit: 10, stress: -5, health: 10, feedback: 'Wise decision!' },
        color: 'bg-green-500',
      },
    ],
  },
  {
    title: 'Unexpected Expense',
    description: 'Your laptop needs repair - ₹12,000',
    emoji: '💻',
    options: [
      {
        text: 'Use Savings',
        outcome: { wallet: -12000, credit: 5, stress: -5, health: 5, feedback: 'Painful but okay.' },
        color: 'bg-yellow-500',
      },
      {
        text: 'Take a Loan',
        outcome: { wallet: 0, credit: -25, stress: 10, health: -15, feedback: 'More debt!' },
        color: 'bg-red-500',
      },
      {
        text: 'Borrow from Friend',
        outcome: { wallet: -5000, credit: 0, stress: -10, health: 5, feedback: 'Relationship cost.' },
        color: 'bg-blue-500',
      },
    ],
  },
  {
    title: 'Side Hustle Chance',
    description: 'Freelance work available - earn ₹5,000 in 20 hours/week',
    emoji: '💼',
    options: [
      {
        text: 'Take It',
        outcome: { wallet: 5000, credit: 15, stress: 10, health: 10, feedback: 'Extra income! 💪' },
        color: 'bg-green-500',
      },
      {
        text: 'Later (Maybe)',
        outcome: { wallet: 0, credit: 0, stress: 5, health: 0, feedback: 'Procrastination.' },
        color: 'bg-yellow-500',
      },
      {
        text: 'Focus on Studies',
        outcome: { wallet: 0, credit: 5, stress: -5, health: 5, feedback: 'Health > Money.' },
        color: 'bg-blue-500',
      },
    ],
  },
]

export default function DecisionScreen({ gameState, onComplete }: DecisionScreenProps) {
  const [selectedDecisionIdx, setSelectedDecisionIdx] = useState(
    Math.floor(Math.random() * decisions.length)
  )
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')

  const decision = decisions[selectedDecisionIdx]

  const handleOptionSelect = (optionIdx: number) => {
    const option = decision.options[optionIdx]
    setSelectedOption(optionIdx)
    setFeedback(option.outcome.feedback)

    setTimeout(() => {
      onComplete(
        option.outcome.wallet,
        option.outcome.credit,
        option.outcome.stress,
        option.outcome.health
      )
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-red-50 p-6 flex flex-col items-center justify-center">
      {/* Decorative elements */}
      <div className="absolute top-10 right-5 w-20 h-20 bg-pink-400 rounded-full opacity-50 blur-xl"></div>
      <div className="absolute bottom-10 left-5 w-32 h-32 bg-purple-300 rounded-full opacity-40 blur-2xl"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Decision Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          {/* Emoji & Title */}
          <div className="text-center mb-6">
            <p className="text-6xl mb-4">{decision.emoji}</p>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{decision.title}</h2>
            <p className="text-gray-600 font-medium text-lg">{decision.description}</p>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-gray-200 my-6"></div>

          {/* Options */}
          <div className="space-y-4">
            {decision.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={selectedOption !== null}
                className={`w-full p-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
                  selectedOption === idx
                    ? `${option.color} text-white shadow-lg`
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-6 text-center animate-bounce-slow shadow-xl">
            <p className="text-2xl font-bold">{feedback}</p>
          </div>
        )}

        {/* Info Text */}
        {!feedback && (
          <p className="text-center text-gray-700 font-medium">
            Choose wisely! Your decision affects your financial health.
          </p>
        )}
      </div>
    </div>
  )
}
