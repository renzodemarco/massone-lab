
export default function SearchBar({ placeholder }) {
  return (
    <label className="flex flex-col w-full h-12">
      <div className="flex w-full h-full items-stretch rounded-lg">
        <div className="flex items-center justify-center pl-4 bg-[#f0f2f4] rounded-l-lg border-r-0 text-[#637588]">
          {/* SVG de lupa */}
        </div>
        <input
          placeholder={placeholder}
          className="flex-1 px-4 rounded-l-none border-none bg-[#f0f2f4] text-[#111418] placeholder-[#637588] focus:outline-none"
        />
      </div>
    </label>
  );
}
