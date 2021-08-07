import React from 'react';
import { ReactElement } from "react";

const getPosColor = (number: number): string => {
  // red
  if (number <= 25)
    return '#db0718';

  // Yellow
  if (number <= 50)
    return '#f5c542'

  // Greenish yellow
  if (number <= 75)
    return '#a2d90d'

  // green
  if (number <= 100 || number > 100)
    return '#089c0f'

  // black
  return '#000000'
}

const getNegColor = (number: number): string => {
  // red
  if (number >= 75)
    return '#db0718';

  // Yellow
  if (number >= 50)
    return '#f5c542'

  // Greenish yellow
  if (number >= 25)
    return '#a2d90d'

  // green
  if (number >= 0 || number < 0)
    return '#089c0f'

  // black
  return '#000000'
}

export const styleStatNumber = (stat: number, isPositive: boolean = true) : ReactElement => {
  return (
    <span style={{color: isPositive ? getPosColor(stat) : getNegColor(stat), fontWeight: 500}}>
      {stat}
    </span>
  )
}

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});