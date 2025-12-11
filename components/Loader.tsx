export default function Loader() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen inset-0 fixed bg-gray-900">
      <div className="animate-spin rounded-full h-20 w-20 border-t-transparent border-4 border-white"></div>
      <h1 className="title-primary text-white">Carregando...</h1>
    </div>
  );
}
