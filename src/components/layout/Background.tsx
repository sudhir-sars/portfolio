export function Background() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <video
        className="h-full w-full object-cover"
        src="/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black/75" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}
