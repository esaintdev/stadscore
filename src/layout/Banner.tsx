import React from 'react';

const Banner = () => {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: '120px' }}>
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/imagesand/stadi.jpg" 
          alt="Stadium banner" 
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>
      
      {/* Gradient Overlay - Uncomment if needed */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" /> */}
    </div>
  );
};

export default Banner;