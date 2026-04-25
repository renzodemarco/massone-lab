import { useEffect, useRef, useState } from "react";
import FormError from "./FormError";

export default function ClientPicker({
  clients,
  value,
  onChange,
  error,
  id = "client",
  placeholder = "Buscar cliente...",
}) {
  const containerRef = useRef(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const selectedClient = clients.find((client) => client._id === value);

    if (selectedClient) {
      setQuery(selectedClient.name);
      return;
    }

    if (value) {
      setQuery("Cliente eliminado");
      return;
    }

    setQuery("");
  }, [clients, value]);

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
  const filteredClients = clients.filter((client) => {
    if (!normalizedQuery) return true;

    const haystack = [client.name, client.email].filter(Boolean).join(" ").toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  const handleInputChange = (event) => {
    const nextValue = event.target.value;
    setQuery(nextValue);
    setOpen(true);

    const selectedClient = clients.find((client) => client._id === value);
    if (!selectedClient || selectedClient.name !== nextValue) {
      onChange("");
    }
  };

  const handleSelect = (client) => {
    setQuery(client.name);
    setOpen(false);
    onChange(client._id);
  };

  const handleClear = () => {
    setQuery("");
    setOpen(false);
    onChange("");
  };

  return (
    <div className="relative" ref={containerRef}>
      <label className="block mb-1 font-medium" htmlFor={id}>Cliente</label>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded border p-2 pr-10"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-2 text-sm text-[#637588]"
            aria-label="Limpiar cliente"
          >
            Limpiar
          </button>
        )}
      </div>

      {open && (
        <div className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-[#dce0e5] bg-white shadow-lg">
          {filteredClients.length ? (
            filteredClients.map((client) => (
              <button
                key={client._id}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(client)}
                className="block w-full border-b border-[#f0f2f5] px-3 py-2 text-left last:border-b-0 hover:bg-[#faf9f6]"
              >
                <span className="block text-sm font-medium text-[#111418]">{client.name}</span>
                <span className="block truncate text-xs text-[#637588]">{client.email || client.address || "Sin datos"}</span>
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-[#637588]">No se encontraron clientes</div>
          )}
        </div>
      )}

      <FormError message={error} />
    </div>
  );
}
