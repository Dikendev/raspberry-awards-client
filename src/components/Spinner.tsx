import React from 'react';

const Spinner: React.FC = () => {
  return (
   <div className="overlay">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
  );
};

export default Spinner;