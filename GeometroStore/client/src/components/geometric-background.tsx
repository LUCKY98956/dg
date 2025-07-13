export function GeometricBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-16 h-16 bg-secondary rounded-full opacity-10 animate-float"></div>
      <div className="absolute top-32 right-20 w-12 h-12 bg-primary transform rotate-45 opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-accent rounded-lg opacity-10 animate-spin-slow"></div>
      <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-secondary transform rotate-12 opacity-10 animate-float"></div>
    </div>
  );
}
