'use client';

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface PlayerSetupPageProps {
  onComplete: (name: string, college: string, role: string) => void
}

export default function PlayerSetupPage({ onComplete }: PlayerSetupPageProps) {
  const [name, setName] = useState('')
  const [college, setCollege] = useState('')
  const [role, setRole] = useState('')

  const handleStart = () => {
    if (name && college && role) {
      onComplete(name, college, role)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-orange-50 flex flex-col items-center justify-center p-4">
      {/* Decorative shapes */}
      <div className="absolute top-5 right-5 w-24 h-24 bg-pink-300 rounded-full opacity-60 blur-xl"></div>
      <div className="absolute bottom-10 left-5 w-32 h-32 bg-purple-300 rounded-full opacity-50 blur-2xl"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-2 text-purple-700">Create Your Character</h1>
        <p className="text-center text-gray-600 mb-8 font-medium">Tell us about yourself</p>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Your Name</label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
            />
          </div>

          {/* College Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Your College</label>
            <Input
              type="text"
              placeholder="Enter your college name"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
            />
          </div>

          {/* Role Selector */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Your Role</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setRole('Student')}
                className={`p-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                  role === 'Student'
                    ? 'bg-blue-500 text-white shadow-lg scale-105'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                👨‍🎓 Student
              </button>
              <button
                onClick={() => setRole('Intern')}
                className={`p-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                  role === 'Intern'
                    ? 'bg-green-500 text-white shadow-lg scale-105'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                💼 Intern
              </button>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t-2 border-gray-200">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-xs font-bold text-gray-600">Starting Cash</p>
              <p className="text-xl font-bold text-blue-600">₹50,000</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-xs font-bold text-gray-600">Starting Score</p>
              <p className="text-xl font-bold text-green-600">650</p>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={handleStart}
          disabled={!name || !college || !role}
          className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-full text-lg font-bold shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all"
        >
          Start My Life Simulation
        </Button>
      </div>
    </div>
  )
}
