'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Server, ShieldCheck } from 'lucide-react'

export default function SystemInfoWidget() {
  const [time, setTime] = useState<Date | null>(null)
  const [locationName, setLocationName] = useState<string>('Loading location...')
  const [coordinates, setCoordinates] = useState<{lat: string, lng: string} | null>(null)

  useEffect(() => {
    setTime(new Date())
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // Fetch location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude.toFixed(4)
          const lng = position.coords.longitude.toFixed(4)
          setCoordinates({ lat, lng })
          
          try {
            // Reverse geocoding using Nominatim (OpenStreetMap)
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`)
            const data = await response.json()
            
            // Format a nice display name
            const address = data.address
            const display = address.suburb || address.neighbourhood || address.city_district || address.city || data.display_name.split(',')[0]
            setLocationName(display || 'Terna Engineering College, Nerul')
          } catch (error) {
            console.error("Error fetching location name:", error)
             setLocationName('Terna Engineering College, Nerul')
             // Fallback coordinates if we couldn't get the name but have coords: we can just show the coords, but for the fallback requirement we can also use Terna's coords
          }
        },
        (error) => {
          console.error("Geolocation error:", error)
          setLocationName('Terna Engineering College, Nerul')
          setCoordinates({ lat: '19.0330', lng: '73.0188' }) // Coordinates for Terna Engineering College
        },
        { timeout: 10000 }
      )
    } else {
      setLocationName('Terna Engineering College, Nerul')
      setCoordinates({ lat: '19.0330', lng: '73.0188' })
    }

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-card/30 border border-foreground/10 rounded-xl p-4 flex flex-col gap-4 relative overflow-hidden backdrop-blur-md h-full min-h-[300px]">
      <div className="flex items-center justify-between border-b border-foreground/10 pb-2 mb-2">
        <h3 className="text-[10px] font-black tracking-widest uppercase text-muted-foreground flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          System Information
        </h3>
        <span className="text-[9px] font-mono text-primary/70 tracking-tighter uppercase">ACTIVE</span>
      </div>

      <div className="flex flex-col gap-6 flex-1 justify-center relative z-10">

        {/* Time Display */}
        <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-foreground/5">
          <Clock className="w-6 h-6 text-primary mt-1" />
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Local Time</p>
            <p className="text-3xl font-mono font-bold tracking-tighter">
              {time ? time.toLocaleTimeString('en-US', { hour12: false }) : '00:00:00'}
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              {time ? time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Loading...'}
            </p>
          </div>
        </div>

        {/* Location Display */}
        <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-foreground/5">
          <MapPin className="w-6 h-6 text-primary mt-1" />
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Active Location</p>
            <p className="text-lg font-bold tracking-tight">{locationName}</p>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              LAT: {coordinates ? coordinates.lat : '19.0330'} N | LNG: {coordinates ? coordinates.lng : '73.0188'} E
            </p>
          </div>
        </div>

        {/* System Status Indicators */}
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-black">
            <Server className="w-4 h-4 text-primary" />
            <span>Node: Alpha-1</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-black">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Secure connection</span>
          </div>
        </div>
      </div>
    </div>
  )
}
