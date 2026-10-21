export default function SectionPage({ title, subtitle }) {
  return (
    <div className="mx-auto max-w-page px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
      {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
    </div>
  )
}
