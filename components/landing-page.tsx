'use client';

import { Button } from '@/components/ui/button'

interface LandingPageProps {
  onStart: () => void
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-yellow-50 to-green-50 flex flex-col items-center justify-center p-4">
      {/* Floating decorative circles */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-300 rounded-full opacity-70 blur-xl animate-bounce-slow"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-green-300 rounded-full opacity-50 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-200 rounded-full opacity-60 blur-xl animate-pulse-soft"></div>

      <div className="relative z-10 text-center max-w-lg">
        {/* Game Title */}
        <div className="mb-8 animate-bounce-slow">
          <div className="text-6xl font-bold text-blue-600 mb-2 drop-shadow-lg">💰</div>
          <h1 className="text-5xl font-extrabold text-blue-700 mb-2">Learn Money</h1>
          <h2 className="text-4xl font-extrabold text-amber-500 mb-4">by Playing Life</h2>
        </div>

        {/* Subheading */}
        <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">
          Make financial mistakes safely before real money is involved
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-3 mb-12">
          <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-2">💵</div>
            <p className="text-xs font-bold text-gray-700">Earn Money</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-xs font-bold text-gray-700">Make Choices</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-2">📈</div>
            <p className="text-xs font-bold text-gray-700">See Results</p>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onStart}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-12 py-7 rounded-full text-xl font-bold shadow-2xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
        >
          Start Game
        </Button>

        {/* Bottom text */}
        <p className="mt-8 text-sm text-gray-600">
          No real money. Just learning. 🎮
        </p>
      </div>
    </div>
  )
}
