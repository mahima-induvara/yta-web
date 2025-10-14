import React from "react";

const Loader = () => {
  return (
    <>
      <style>
        {`
            .loader {
                width: 50px;
                aspect-ratio: 1;
                border-radius: 50%;
            border-radius: 50%;

            background: 
              radial-gradient(farthest-side, #5271ff 94%, #0000) top/8px 8px no-repeat,
              conic-gradient(#0000 30%, #5271ff);
   
            -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
            mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0); /* Add standard mask for better compatibility */
            
            animation: l13 1s infinite linear;
          }
          
          /* Keyframes for rotation */
          @keyframes l13 { 
            100% {
              transform: rotate(1turn);
            }
          }
        `}
      </style>
      <div className="loader absolute inset-0 m-auto" role="status" aria-label="Loading"></div>
    </>
  );
};

export default Loader;
