export const short = (addr) => addr ? `${addr.slice(0,6)}...${addr.slice(-4)}` : ''
export const toEther = (v) => (Number(v) / 1e18).toFixed(4)
