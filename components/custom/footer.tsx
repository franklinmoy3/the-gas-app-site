import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';

export function Footer() {
  return (
    <footer className="border-t bg-background p-4 text-center">
      <p className="text-sm text-muted-foreground">
        Prices listed are{' '}
        <strong>
          <em>per gallon</em>
        </strong>{' '}
        and might be different at the pump.
      </p>
      <p className="mt-1">A hobby project by Franklin Moy.</p>
      <p className="mt-1">Proudly Open Source. Contributions welcome.</p>
      <div className="mt-2 flex justify-center gap-2">
        <a
          href="https://github.com/franklinmoy3/the-gas-app-site"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubLogoIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/franklin-d-moy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInLogoIcon />
        </a>
      </div>
    </footer>
  );
}
