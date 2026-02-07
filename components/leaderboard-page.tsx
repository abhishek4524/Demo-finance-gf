'use client';

import { Button } from '@/components/ui/button'

interface LeaderboardPageProps {
  playerName: string
  playerHealth: number
  onBack: () => void
}

const dummyLeaderboard = [
  { rank: 1, name: 'Alex Kumar', college: 'IIT Delhi', health: 95, wallet: 250000 },
  { rank: 2, name: 'Priya Singh', college: 'BITS Pilani', health: 92, wallet: 220000 },
  { rank: 3, name: 'Rohan Desai', college: 'VIT Vellore', health: 88, wallet: 195000 },
  { rank: 4, name: 'Anjali Mehta', college: 'Delhi University', health: 85, wallet: 180000 },
  { rank: 5, name: 'Karan Sharma', college: 'Mumbai University', health: 82, wallet: 165000 },
  { rank: 6, name: 'Neha Patel', college: 'IIT Bombay', health: 79, wallet: 150000 },
  { rank: 7, name: 'Arjun Rao', college: 'NIT Bangalore', health: 76, wallet: 140000 },
  { rank: 8, name: 'Simran Kaur', college: 'Chandigarh University', health: 73, wallet: 125000 },
  { rank: 9, name: 'Vikram Nair', college: 'Amrita University', health: 70, wallet: 115000 },
  { rank: 10, name: 'Zara Khan', college: 'Pune University', health: 67, wallet: 105000 },
]

export default function LeaderboardPage({ playerName, playerHealth, onBack }: LeaderboardPageProps) {
  const playerRank = Math.floor(Math.random() * 20) + 5
  const playerWallet = Math.floor(Math.random() * 100000) + 50000

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-50 to-red-50 p-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white rounded-3xl p-8 mb-6 shadow-xl">
        <h1 className="text-4xl font-extrabold mb-2">🏆 Leaderboard</h1>
        <p className="text-lg opacity-90">See how you rank against other players</p>
      </div>

      {/* Top 3 Podium */}
      <div className="max-w-md mx-auto mb-8">
        <div className="grid grid-cols-3 gap-2 mb-6 items-end">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="bg-gradient-to-b from-silver to-gray-400 rounded-2xl p-4 text-white mb-2">
              <p className="text-3xl font-extrabold">🥈</p>
              <p className="text-xl font-bold">{dummyLeaderboard[1].name}</p>
              <p className="text-sm opacity-90">{dummyLeaderboard[1].health}%</p>
            </div>
            <p className="text-xs font-bold text-gray-700">2nd Place</p>
          </div>

          {/* 1st Place */}
          <div className="text-center transform scale-110">
            <div className="bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-3xl p-5 text-white mb-2 shadow-2xl">
              <p className="text-5xl font-extrabold">👑</p>
              <p className="text-2xl font-bold">{dummyLeaderboard[0].name}</p>
              <p className="text-lg opacity-90">{dummyLeaderboard[0].health}%</p>
            </div>
            <p className="text-sm font-bold text-gray-700">1st Place</p>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="bg-gradient-to-b from-orange-400 to-orange-500 rounded-2xl p-4 text-white mb-2">
              <p className="text-3xl font-extrabold">🥉</p>
              <p className="text-xl font-bold">{dummyLeaderboard[2].name}</p>
              <p className="text-sm opacity-90">{dummyLeaderboard[2].health}%</p>
            </div>
            <p className="text-xs font-bold text-gray-700">3rd Place</p>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="max-w-md mx-auto">
        <p className="text-sm font-bold text-gray-700 mb-4">Top 10 Players</p>
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {dummyLeaderboard.map((player, idx) => (
            <div
              key={idx}
              className={`p-4 border-b border-gray-200 last:border-b-0 ${
                player.name === playerName
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-purple-500'
                  : idx % 2 === 0
                    ? 'bg-gray-50'
                    : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold">
                    {player.rank}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{player.name}</p>
                    <p className="text-xs text-gray-600">{player.college}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{player.health}%</p>
                  <p className="text-xs text-gray-600">Health</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Rank */}
      <div className="max-w-md mx-auto mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white text-center shadow-2xl">
        <p className="text-sm opacity-90 font-bold mb-2">YOUR CURRENT RANK</p>
        <p className="text-6xl font-extrabold mb-3">#{playerRank}</p>
        <div className="bg-white bg-opacity-20 rounded-2xl p-4 mb-4">
          <p className="font-bold text-lg mb-1">{playerName}</p>
          <p className="text-sm opacity-90">Financial Health: {playerHealth}%</p>
          <p className="text-sm opacity-90">Wallet: ₹{playerWallet.toLocaleString('en-IN')}</p>
        </div>
        <p className="text-sm opacity-90">Keep playing to rank higher! 🚀</p>
      </div>

      {/* Back Button */}
      <div className="max-w-md mx-auto mt-8">
        <Button
          onClick={onBack}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl transform hover:scale-105 active:scale-95 transition-all"
        >
          ← Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
