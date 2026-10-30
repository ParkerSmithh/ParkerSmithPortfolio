import { ArrowUp } from "lucide-react";
import { contact, site } from "../data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight">{contact.name}</p>
          <p className="mt-1 text-sm text-graphite">
            {site.focus} · {contact.location}
          </p>
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            <a href={contact.emailHref} className="rounded-small text-ink/80 hover:text-blue">
              {contact.email}
            </a>
            <a href={contact.phoneHref} className="rounded-small text-ink/80 hover:text-blue">
              {contact.phoneDisplay}
            </a>
          </p>
        </div>
        <div className="flex items-center justify-between gap-6 md:flex-col md:items-end">
          <a href="#top" className="btn btn-outline group">
            <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden />
            Back to top
          </a>
          <p className="text-xs text-stone">© {year} {contact.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
