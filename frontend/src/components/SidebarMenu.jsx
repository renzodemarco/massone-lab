const menuItems = [
  { label: "Inicio", name: "welcome" },
  { label: "Informes", name: "reports" },
  { label: "Clientes", name: "clients" }
];

function SidebarMenu({ view, setView }) {
  return (
    <>
      {menuItems.map((item) => (
        <div
          key={item.name}
          onClick={() => setView(item.name)}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${view === item.name ? "bg-[#f0f2f4]" : ""
            }`}
        >
          <p className="text-[#111418] text-sm font-medium">{item.label}</p>
        </div>
      ))}
    </>
  )
}

export default SidebarMenu