import { Fragment } from 'react'
import { Link } from 'react-router'

export interface Crumb {
  label: string
  to?: string
}

/** "Apps / Medically / Privacy" trail. The last crumb is the current page. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[12px] tracking-[.08em] uppercase">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((crumb, index) => (
          <Fragment key={crumb.label}>
            {index > 0 && (
              <li aria-hidden="true" className="text-muted">
                /
              </li>
            )}
            <li>
              {crumb.to ? (
                <Link to={crumb.to} className="text-link underline underline-offset-[3px] hover:no-underline">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-muted">
                  {crumb.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
