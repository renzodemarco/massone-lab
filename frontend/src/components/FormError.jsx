export default function FormError({ message }) {
  if (!message) return null;
  return (
    <>
      <br />
      <span className="text-sm mt-1" style={{ color: "#99144d" }}>{message}
      </span>
    </>
  )
}