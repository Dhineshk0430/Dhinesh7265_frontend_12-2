import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function EmptyState({
  title = 'No items found',
  description = 'Try adjusting your filters or search keywords to find what you are looking for.',
  actionText,
  actionLink,
  onAction,
  icon: Icon = Compass
}) {
  return (
    <div className="text-center py-12 px-4 rounded-3xl bg-white border border-slate-100 shadow-xs max-w-lg mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-slate-900 font-display mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">{description}</p>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-colors shadow-xs"
        >
          {actionText}
        </Link>
      )}
      {actionText && onAction && !actionLink && (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 transition-colors shadow-xs"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
