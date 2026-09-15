export function EventPhoto({ label = "EVENT PHOTO" }: { label?: string }) {
  return (
    <div className="photo-placeholder min-h-[320px] rounded-[2rem] shadow-soft">
      <div className="absolute inset-x-0 bottom-0 z-10 p-7 text-white">
        <div className="text-[10px] font-bold tracking-[.22em] opacity-80">PLACEHOLDER</div>
        <div className="mt-2 text-xl font-semibold">{label}</div>
        <div className="mt-1 text-sm text-blue-100/80">Replace with a CAGH UTM event photo.</div>
      </div>
    </div>
  );
}
