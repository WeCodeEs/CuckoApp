import React, { useEffect } from 'react';
import MenuScreen from '@/screens/MenuScreen';
import { useUser } from '@/contexts/UserContext';
import { avatars } from '@/constants/Avatars';

export default function HomeScreen() {
  const { user, setAvatar } = useUser();

  useEffect(() => {
    if (user && !user.avatar) {
      const randomIndex = Math.floor(Math.random() * avatars.length);
      const randomAvatar = avatars[randomIndex].src;
      setAvatar(randomAvatar);
    }
  }, [user, setAvatar]);

  return <MenuScreen />;
}
