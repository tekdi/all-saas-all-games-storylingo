import { useState, useEffect } from 'react';
import jwt from 'jwt-decode'

export function usePlayers() {
  const [Player1, setPlayer1] = useState('');
  const [Player2, setPlayer2] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const buddyToken = localStorage.getItem('buddyToken');
    
    if (!!token) {
      const p1 = jwt(token);
      setPlayer1(p1);
    } 

    if (!!buddyToken) {
      const p2 = jwt(buddyToken);
      setPlayer2(p2);
    }
  }, []);

  return { Player1, Player2 };
}
