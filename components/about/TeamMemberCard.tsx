'use client'

import { useState } from 'react'
import type { TeamPerson } from '@/lib/about-content'

export function TeamMemberCard({ person }: { person: TeamPerson }) {
  const [showPhoto, setShowPhoto] = useState(Boolean(person.photo))

  return (
    <div className="team-member">
      <div className="team-photo-frame">
        {showPhoto && person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            className="team-photo"
            onError={() => setShowPhoto(false)}
          />
        ) : (
          <div className="team-photo-placeholder">{person.initials}</div>
        )}
      </div>
      <div className="team-name">{person.name}</div>
      <div className="team-role">{person.role}</div>
      {person.location && <div className="team-location">{person.location}</div>}
    </div>
  )
}
