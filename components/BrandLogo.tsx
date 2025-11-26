import Image from 'next/image';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'mono';
  className?: string;
}

const sizeMap = {
  sm: { height: 32, width: 48 },
  md: { height: 40, width: 60 },
  lg: { height: 64, width: 96 },
};

export function BrandLogo({ size = 'md', variant = 'default', className = '' }: BrandLogoProps) {
  const dimensions = sizeMap[size];

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: dimensions.width,
        height: dimensions.height
      }}
    >
      <Image
        src="/brand/brain-battle-infinity.jpg"
        alt="Brain Battle Club"
        fill
        className={`object-contain ${variant === 'mono' ? 'grayscale opacity-70' : ''}`}
        priority
      />
    </div>
  );
}
