'use client';

import { Button } from '@/components/ui/button'

interface GameState {
  currentMonth: number
  playerRole: string
  walletBalance: number
  creditScore: number
  financialHealth: number
}

interface MonthlySummaryPageProps {
  gameState: GameState
  onComplete: () => void
}

export default function MonthlySummaryPage({ gameState, onComplete }: MonthlySummaryPageProps) {
  const salary = gameState.playerRole === 'Intern' ? 15000 : 25000
  const fixedExpenses = 8000
  const savings = gameState.walletBalance - salary - fixedExpenses

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-blue-50 to-green-50 p-6 flex flex-col items-center justify-center">
      {/* Decorative elements */}
      <div className="absolute top-10 right-5 w-28 h-28 bg-purple-300 rounded-full opacity-50 blur-xl"></div>
      <div className="absolute bottom-10 left-5 w-32 h-32 bg-blue-300 rounded-full opacity-40 blur-2xl"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Month Header */}
        <h1 className="text-4xl font-extrabold text-center mb-2">Month {gameState.currentMonth} Summary</h1>
        <p className="text-center text-gray-600 mb-8 font-medium">Here's how you did this month</p>

        {/* Summary Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 mb-6">
          {/* Salary Section */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-bold text-gray-700">Salary Received</p>
              <p className="text-2xl">💰</p>
            </div>
            <p className="text-3xl font-extrabold text-green-600">+₹{salary.toLocaleString('en-IN')}</p>
            <p className="text-xs text-gray-600 mt-2">
              {gameState.playerRole === 'Intern' ? '(Intern Stipend)' : '(Student Part-time)'}
            </p>
          </div>

          {/* Fixed Expenses */}
          <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-bold text-gray-700">Fixed Expenses</p>
              <p className="text-2xl">🏠</p>
            </div>
            <p className="text-3xl font-extrabold text-red-600">-₹{fixedExpenses.toLocaleString('en-IN')}</p>
            <p className="text-xs text-gray-600 mt-2">Rent, food, travel</p>
          </div>

          {/* Net Savings */}
          <div className="border-t-2 border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-bold text-gray-700">Net Savings</p>
              <p className="text-2xl">📊</p>
            </div>
            <p className={`text-3xl font-extrabold ${savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {savings >= 0 ? '+' : ''}₹{savings.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Stats Update */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <p className="text-sm font-bold text-gray-700 mb-4">📈 Your Stats</p>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
              <div>
                <p className="text-xs text-gray-600 font-bold">Wallet Balance</p>
                <p className="text-xl font-bold text-blue-600">₹{gameState.walletBalance.toLocaleString('en-IN')}</p>
              </div>
              <p className="text-2xl">💼</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-xl">
              <div>
                <p className="text-xs text-gray-600 font-bold">Credit Score</p>
                <p className="text-xl font-bold text-yellow-600">{gameState.creditScore}/900</p>
              </div>
              <p className="text-2xl">📊</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
              <div>
                <p className="text-xs text-gray-600 font-bold">Financial Health</p>
                <p className="text-xl font-bold text-green-600">{gameState.financialHealth}%</p>
              </div>
              <p className="text-2xl">❤️</p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-6 mb-6">
          <p className="text-sm font-bold mb-2">💡 Monthly Tip</p>
          <p className="text-sm leading-relaxed">
            {savings > 10000
              ? 'Great savings! Consider investing some of this for future growth.'
              : savings > 5000
                ? 'Good job! Try to increase your savings next month.'
                : "You're spending too much! Cut unnecessary expenses."}
          </p>
        </div>

        {/* Continue Button */}
        <Button
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-2xl font-bold text-lg shadow-xl transform hover:scale-105 active:scale-95 transition-all"
        >
          Continue My Life ⏭️
        </Button>
      </div>
    </div>
  )
}
