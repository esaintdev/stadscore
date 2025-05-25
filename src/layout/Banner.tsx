import React from 'react';

const Banner = () => {
  return (
    <div className="relative w-full overflow-hidden" style={{ paddingTop: '10%' }}>
      <div className="absolute inset-0">
        <img 
          src="/imagesand/stad.jpg" 
          alt="Stadium banner" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Gradient Overlay - Uncomment if needed */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" /> */}
    </div>
  );
};

export default Banner;