import React, { useMemo } from 'react';


export default function GradientAvatar({ address, size = 40 }) {
  const gradientColors = useMemo(
    () => generateGradientColors(address),
    [address]
  );

  return (

    <div className="flex items-center justify-center p-1 border rounded-full border-muted">
      <div style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
      }}>


        <div
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            // background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
            background: `conic-gradient(from 180deg,${gradientColors.join(', ')})`,
            filter: 'contrast(1.2) brightness(1.2) blur(5px)',
          }}
        /> </div>
    </div>
  );
}

function generateGradientColors(address) {
  // Remove '0x' prefix if present
  const cleanAddress = address.startsWith('0x') ? address.slice(2) : address;

  // Use the first 6 characters for the start color and the last 6 for the end color
  const addressLength = cleanAddress.length;
  const groupSize = 6;
  const numGroups = Math.ceil(addressLength / groupSize);

  const colors = Array.from({ length: numGroups }, (_, i) => {
    const start = i * groupSize;
    const end = Math.min(start + groupSize, addressLength);
    return `#${cleanAddress.slice(start, end).padEnd(6, '0')}`;
  });

  return colors;
}
