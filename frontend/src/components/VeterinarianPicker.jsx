import { useEffect, useRef, useState } from "react";
import FormError from "./FormError";

export default function VeterinarianPicker({
  veterinarians,
  value,
  onChange,
  error,
  disabled = false,
  id = "veterinarian",
  placeholder = "Buscar veterinario...",
}) {
  const containerRef = useRef(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const normalizedVeterinarians = veterinarians.map((veterinarian) => veterinarian.trim()).filter(Boolean);

  useEffect(() => {
    if (normalizedVeterinarians.includes(value)) {
      setQuery(value);
      return;
    }

    if (value) {
      setQuery("Veterinario eliminado");
      return;
    }

    setQuery("");
  }, [normalizedVeterinarians, value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredVeterinarians = normalizedVeterinarians.filter((veterinarian) => {
    if (!normalizedQuery) return true;
    return veterinarian.toLowerCase().includes(normalizedQuery);
  });

  const handleInputChange = (event) => {
    const nextValue = event.target.value;
    setQuery(nextValue);
    setOpen(true);

    if (value !== nextValue) {
      onChange("");
    }
  };

  const handleSelect = (veterinarian) => {
    setQuery(veterinarian);
    setOpen(false);
    onChange(veterinarian);
  };

  const handleClear = () => {
    setQuery("");
    setOpen(false);
    onChange("");
  };

  return (
    <div className="relative" ref={containerRef}>
      <label className="block mb-1 font-medium" htmlFor={id}>Veterinario/a</label>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => !disabled && setOpen(true)}
          placeholder={disabled ? "Seleccione un cliente primero" : placeholder}
          autoComplete="off"
          disabled={disabled}
          className="w-full rounded border p-2 pr-10 disabled:cursor-not-allowed disabled:bg-[#f5f5f5]"
        />
        {query && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-2 text-sm text-[#637588]"
            aria-label="Limpiar veterinario"
          >
            Limpiar
          </button>
        )}
      </div>

      {open && !disabled && (
        <div className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-[#dce0e5] bg-white shadow-lg">
          {filteredVeterinarians.length ? (
            filteredVeterinarians.map((veterinarian) => (
              <button
                key={veterinarian}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(veterinarian)}
                className="block w-full border-b border-[#f0f2f5] px-3 py-2 text-left text-sm text-[#111418] last:border-b-0 hover:bg-[#faf9f6]"
              >
                {veterinarian}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-[#637588]">No se encontraron veterinarios</div>
          )}
        </div>
      )}

      <FormError message={error} />
    </div>
  );
}
