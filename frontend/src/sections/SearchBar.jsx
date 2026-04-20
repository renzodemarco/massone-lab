export default function SearchBar({
  placeholder,
  value,
  onChange,
  buttonLabel = "Buscar",
  onSubmit,
  onClear,
  canClear = false,
  filters = null,
  children = null
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      {filters}
      <div className="flex h-12 items-stretch gap-3">
        <label className="flex-1">
          <input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="h-full w-full rounded-lg border-none bg-[#f0f2f4] px-4 text-[#111418] placeholder-[#637588] focus:outline-none"
          />
        </label>
        {canClear && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-lg bg-[#f0f2f4] px-4 text-[#637588] transition font-semibold"
            aria-label="Limpiar búsqueda"
            title="Limpiar búsqueda"
          >
            X
          </button>
        )}
        {children}
        <button
          type="submit"
          className="rounded-lg bg-[#632b91] px-6 text-white transition font-semibold link-button"
        >
          {buttonLabel}
        </button>
      </div>
    </form>
  );
}
