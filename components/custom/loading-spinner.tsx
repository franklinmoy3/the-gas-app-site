import { UpdateIcon } from '@radix-ui/react-icons';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p>Loading...</p>
      <UpdateIcon className="mt-1 h-6 w-6 animate-spin" />
    </div>
  );
}
