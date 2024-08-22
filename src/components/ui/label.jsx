export function Label({ children, ...props }) {
  return (
    <label {...props} className="block font-semibold mb-2">
      {children}
    </label>
  );
}
