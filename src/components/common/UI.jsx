import React from 'react'

export const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center px-4">
    <div className="text-5xl mb-6">⚠️</div>
    <h2 className="font-display text-2xl text-stone-900 mb-2">Something went wrong</h2>
    <p className="text-stone-500 mb-6">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="btn-primary">
        Try Again
      </button>
    )}
  </div>
)

export const EmptyState = ({ title, message, action }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center px-4">
    <div className="text-5xl mb-6">🛍️</div>
    <h2 className="font-display text-2xl text-stone-900 mb-2">{title}</h2>
    <p className="text-stone-500 mb-6">{message}</p>
    {action && (
      <a href={action.href} className="btn-primary">{action.label}</a>
    )}
  </div>
)

export const Badge = ({ children, variant = 'default' }) => {
  const styles = {
    default: 'bg-stone-100 text-stone-600',
    gold: 'bg-gold-400/10 text-gold-600',
    success: 'bg-green-50 text-green-700',
  }
  return (
    <span className={`text-[10px] tracking-widest uppercase px-2 py-1 ${styles[variant]}`}>
      {children}
    </span>
  )
}

export const Divider = ({ className = '' }) => (
  <hr className={`border-stone-100 ${className}`} />
)

export const SectionHeader = ({ eyebrow, title, subtitle }) => (
  <div className="text-center mb-12">
    {eyebrow && (
      <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-3">{eyebrow}</p>
    )}
    <h2 className="section-title">{title}</h2>
    {subtitle && (
      <p className="mt-4 text-stone-500 max-w-lg mx-auto">{subtitle}</p>
    )}
  </div>
)

export const PageHeader = ({ title, breadcrumbs }) => (
  <div className="border-b border-stone-100 bg-stone-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {breadcrumbs && (
        <nav className="flex items-center gap-2 text-xs text-stone-400 tracking-wide mb-3">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span>/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-stone-700">{crumb.label}</a>
              ) : (
                <span className="text-stone-600">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}
      <h1 className="font-display text-3xl md:text-4xl font-light text-stone-900">{title}</h1>
    </div>
  </div>
)
