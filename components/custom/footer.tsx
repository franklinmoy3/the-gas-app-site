import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn('border-t bg-background p-4 text-center', className)}>
      <div className="mb-2">
        <p className="text-sm text-muted-foreground">
          Prices listed are{' '}
          <strong>
            <em>per gallon</em>
          </strong>{' '}
          and might be different at the pump.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Geolocation data provided by{' '}
          <a
            className="underline"
            href="https://www.geonames.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            GeoNames
          </a>{' '}
          and{' '}
          <a
            className="underline"
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenStreetMap
          </a>
          .
        </p>
      </div>
      <p className="text-md mb-1">A hobby project by Franklin Moy.</p>
      <p className="text-md mb-1">
        Proudly Open Source. Contributions welcome.
      </p>
      <p className="text-md mb-1">
        Is your Costco or Sam&apos;s Club missing? Let me know on{' '}
        <a
          className="underline"
          href="https://github.com/franklinmoy3/the-gas-app-site/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
      <div className="flex justify-center gap-2">
        <a
          href="https://github.com/franklinmoy3/the-gas-app-site"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubLogoIcon className="h-6 w-6" />
          <span className="sr-only">GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/franklin-d-moy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInLogoIcon className="h-6 w-6" />
          <span className="sr-only">LinkedIn</span>
        </a>
      </div>
    </footer>
  );
}
