export const Tooltip = ({ label, children, className = '' }) => (
  <span className={`tooltip-wrap inline-flex ${className}`}>
    {children}
    <span className="tooltip-content" role="tooltip">
      {label}
    </span>
  </span>
);
