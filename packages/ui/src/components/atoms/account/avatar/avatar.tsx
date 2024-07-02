import React from "react"
import { KlayrAvatar } from "./klayrAvatar";

interface AvatarProps {
  address: string
  className?: string
  size?: number
  collectible?: boolean
  circle?: boolean
}

export const Avatar = ({
  address,
  className,
  size,
  collectible,
  circle,
}: AvatarProps) => {

  return (
    <KlayrAvatar
      address={address}
      circle={circle}
      className={className}
      collectible={collectible}
      size={size || 32}
    />
  )
}
