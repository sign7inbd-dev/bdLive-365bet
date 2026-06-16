'use client'

import { useState } from 'react'

interface SportsEvent {
  id: string
  eventName: string
  sportType: string
  homeTeam: string
  awayTeam: string
  eventDate: string
  odds: number
}

const mockEvents: SportsEvent[] = [
  {
    id: '1',
    eventName: 'Manchester United vs Liverpool',
    sportType: 'Football',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    eventDate: '2024-01-20',
    odds: 1.95,
  },
  {
    id: '2',
    eventName: 'Lakers vs Celtics',
    sportType: 'Basketball',
    homeTeam: 'Lakers',
    awayTeam: 'Celtics',
    eventDate: '2024-01-20',
    odds: 2.15,
  },
  {
    id: '3',
    eventName: 'Nadal vs Djokovic',
    sportType: 'Tennis',
    homeTeam: 'Rafael Nadal',
    awayTeam: 'Novak Djokovic',
    eventDate: '2024-01-21',
    odds: 1.85,
  },
]

export default function BettingClient() {
  const [selectedBets, setSelectedBets] = useState<string[]>([])
  const [betAmount, setBetAmount] = useState('')
  const [totalOdds, setTotalOdds] = useState(1)

  const handleSelectBet = (eventId: string) => {
    if (selectedBets.includes(eventId)) {
      setSelectedBets(selectedBets.filter((id) => id !== eventId))
    } else {
      setSelectedBets([...selectedBets, eventId])
    }

    // Calculate total odds
    const newOdds = mockEvents
      .filter((e) => selectedBets.includes(e.id) || eventId === e.id)
      .reduce((acc, e) => acc * e.odds, 1)
    setTotalOdds(newOdds)
  }

  const potentialWinning = betAmount ? (parseFloat(betAmount) * totalOdds).toFixed(2) : '0.00'

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Place Your Bets</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Events */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Available Events</h2>

              <div className="space-y-4">
                {mockEvents.map((event) => (
                  <div key={event.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{event.eventName}</h3>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                          <span>Sport: {event.sportType}</span>
                          <span>Date: {new Date(event.eventDate).toLocaleDateString()}</span>
                        </div>
                        <div className="mt-2 text-lg font-bold text-blue-600">Odds: {event.odds}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedBets.includes(event.id)}
                        onChange={() => handleSelectBet(event.id)}
                        className="w-6 h-6 cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bet Slip */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Bet Slip</h2>

              {selectedBets.length > 0 ? (
                <>
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm text-gray-700">
                      <strong>Total Odds:</strong> {totalOdds.toFixed(2)}
                    </p>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Bet Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-600">$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mb-6 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Potential Winning:</strong>
                    </p>
                    <p className="text-2xl font-bold text-green-600">${potentialWinning}</p>
                  </div>

                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition mb-2">
                    Place Bet
                  </button>

                  <button
                    onClick={() => {
                      setSelectedBets([])
                      setBetAmount('')
                      setTotalOdds(1)
                    }}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition"
                  >
                    Clear Slip
                  </button>
                </>
              ) : (
                <p className="text-gray-600 text-center py-8">Select events to place a bet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
