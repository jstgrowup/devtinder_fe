export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-[120px] font-extrabold leading-none tracking-tight text-gray-800 sm:text-[150px]">
        404
      </h1>
      <h2 className="mt-2 text-3xl font-semibold text-gray-700 sm:text-4xl">
        Page Not Found
      </h2>
      <p className="mt-4 max-w-md text-gray-500">
        Oops! The page you&lsquo;re looking for doesn&lsquo;t exist or has been
        moved.
      </p>
    </div>
  );
}
