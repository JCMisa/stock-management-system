export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-5">
      primary
      <div className="min-h-20 max-h-20 w-52 bg-primary"></div>
      <div className="min-h-20 max-h-20 w-52 bg-primary-100"></div>
      dark
      <div className="min-h-20 max-h-20 w-52 bg-dark-100"></div>
      <div className="min-h-20 max-h-20 w-52 bg-dark-200"></div>
      <div className="min-h-20 max-h-20 w-52 bg-dark-300"></div>
      <div className="min-h-20 max-h-20 w-52 bg-dark-400"></div>
      <div className="min-h-20 max-h-20 w-52 bg-dark-500"></div>
      secondary
      <div className="min-h-20 max-h-20 w-52 bg-secondary"></div>
      <div className="min-h-20 max-h-20 w-52 bg-secondary-100"></div>
      light
      <div className="min-h-20 max-h-20 w-52 bg-light"></div>
    </div>
  );
}
