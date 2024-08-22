export function Select({ children, ...props }) {
  return (
    <select {...props} className="border rounded py-2 px-4 w-full">
      {children}
    </select>
  );
}
