'use client';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center m-12">
      <svg className="h-8 w-8 animate-spin" viewBox="0 0 100 100">
        <circle
          fill="none"
          strokeWidth="10"
          className="stroke-current opacity-10"
          cx="50"
          cy="50"
          r="40"
        />

        <circle
          fill="none"
          strokeWidth="10"
          className="stroke-current"
          strokeDasharray="250"
          strokeDashoffset="210"
          cx="50"
          cy="50"
          r="40"
        />
      </svg>
    </div>
  );
};

export default Spinner;
