export const lightenDarkenColor = (col: string, amt: number) => {
    let usePound = false;
  
    if (col[0] === '#') {
      col = col.slice(1);
      usePound = true;
    }
  
    const num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    let g = ((num >> 8) & 0x00ff) + amt;
    let b = (num & 0x0000ff) + amt;
  
    r = Math.max(Math.min(255, r), 0);
    g = Math.max(Math.min(255, g), 0);
    b = Math.max(Math.min(255, b), 0);
  
    return (usePound ? '#' : '') + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };