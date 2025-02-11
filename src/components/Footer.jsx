import React from 'react';
import { Typography } from '@mui/material';
export default function Footer() {
  return (
    <div>
        <footer style={{ marginTop: "40px", padding: "20px", background: "#ff3366", color: "white", width:"100%", position:"fixed",     bottom: 0 }}>
        <Typography variant="body2">© 2025 Dating App. All rights reserved.</Typography>
      </footer>
    </div>
  );
}
