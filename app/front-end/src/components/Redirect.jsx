import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  });

  return (
    <span>LAU</span>
  );
}

export default Redirect;
