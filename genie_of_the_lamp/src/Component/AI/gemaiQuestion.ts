const BACKEND_ROOT = (async () => {
  const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
  if (!backendRoot) {
    throw new Error("VITE_BACKEND_ROOT is not defined");
  }

  const url: string = backendRoot;
  return url;
})();
export default BACKEND_ROOT;
