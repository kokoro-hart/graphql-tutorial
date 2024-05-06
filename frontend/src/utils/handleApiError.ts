export const handleApiError = (error: unknown, errorMessage?: string): never => {
  if (error instanceof Error) {
    console.error(error.message);
    throw new Error(errorMessage ?? error.message);
  } else {
    console.error(error);
    throw new Error(errorMessage ?? String(error));
  }
};
