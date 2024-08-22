export function Alert({ children, ...props }) {
  return (
    <div
      {...props}
      className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
    >
      {children}
    </div>
  );
}

export function AlertDescription({ children, ...props }) {
  return (
    <p {...props} className="text-sm">
      {children}
    </p>
  );
}
