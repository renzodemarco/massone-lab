
const menuItems = [
  { label: "Inicio" },
  { label: "Informes", active: true },
  { label: "Clientes" },
  { label: "Ayuda" },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-2 bg-white p-4 min-h-screen">
      <div className="flex gap-3 mb-6 items-center">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10"
          style={{
            backgroundImage: `url("/logo.png")`,
          }}
        />
        <h1 className="text-[#111418] text-base font-medium">Laboratorio Massone</h1>
      </div>

      {menuItems.map((item) => (
        <div
          key={item.label}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
            item.active ? "bg-[#f0f2f4]" : ""
          }`}
        >
          <div className="text-[#111418]">{/* Aquí iría el SVG de icono */}</div>
          <p className="text-[#111418] text-sm font-medium">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
