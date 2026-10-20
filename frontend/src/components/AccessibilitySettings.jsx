import { useEffect, useId, useRef, useState } from 'react'
import { Eye, RotateCcw, Settings, X } from 'lucide-react'
import { useAccessibility } from '../contexts/useAccessibility.js'

function Section({ title, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">{title}</h3>
      <div className="space-y-5">{children}</div>
    </section>
  )
}

function Switch({ id, checked, onChange }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-focus-ring)] ${
        checked ? 'bg-[var(--a11y-settings-accent)]' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

function SwitchRow({ id, label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <label htmlFor={id} className="text-base font-medium text-slate-900">
          {label}
        </label>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
      <Switch id={id} checked={checked} onChange={onChange} />
    </div>
  )
}

function RangeRow({ id, label, hint, value, min, max, step, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="text-base font-medium text-slate-900">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full cursor-pointer"
      />
      {hint && <p className="mt-1 text-sm text-gray-600">{hint}</p>}
    </div>
  )
}

function SelectRow({ id, label, hint, value, options, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="text-base font-medium text-slate-900">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint && <p className="mt-1 text-sm text-gray-600">{hint}</p>}
    </div>
  )
}

export default function AccessibilitySettings({ triggerClassName = '' }) {
  const { settings, updateSettings, resetSettings, isAccessibilityMode, toggleAccessibilityMode } =
    useAccessibility()
  const [open, setOpen] = useState(false)
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) return undefined
    const trigger = triggerRef.current
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector('button, input, select')?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      trigger?.focus()
    }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName}
        aria-label="Версия для слабовидящих"
        aria-haspopup="dialog"
      >
        <Eye className="h-5 w-5" aria-hidden="true" />
        <span className="hidden md:inline">Версия для слабовидящих</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--overlay-backdrop)] p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="accessibility-settings-dialog flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white p-6 text-slate-900 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id={titleId} className="flex items-center gap-2 text-xl font-semibold">
                <Settings className="h-5 w-5" aria-hidden="true" />
                Настройки доступности
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto pr-2">
              <Section title="Режим доступности">
                <SwitchRow
                  id="accessibility-mode"
                  label="Включить версию для слабовидящих"
                  description="Включает специальные настройки для улучшения доступности сайта"
                  checked={isAccessibilityMode}
                  onChange={toggleAccessibilityMode}
                />
              </Section>

              <Section title="Настройки текста">
                <RangeRow
                  id="a11y-font-size"
                  label={`Размер шрифта: ${Math.round(settings.fontSize * 100)}%`}
                  hint="Рекомендуется увеличение до 200% для слабовидящих"
                  value={settings.fontSize}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(v) => updateSettings({ fontSize: v })}
                />
                <RangeRow
                  id="a11y-line-height"
                  label={`Межстрочный интервал: ${settings.lineHeight}x`}
                  hint="Рекомендуется 1.5x для лучшей читаемости"
                  value={settings.lineHeight}
                  min={1}
                  max={2}
                  step={0.1}
                  onChange={(v) => updateSettings({ lineHeight: v })}
                />
                <RangeRow
                  id="a11y-letter-spacing"
                  label={`Межбуквенный интервал: ${settings.letterSpacing}px`}
                  hint="Увеличение интервала между буквами для лучшей читаемости"
                  value={settings.letterSpacing}
                  min={0}
                  max={2}
                  step={0.1}
                  onChange={(v) => updateSettings({ letterSpacing: v })}
                />
                <SelectRow
                  id="a11y-font-family"
                  label="Семейство шрифтов"
                  hint="Arial рекомендуется для лучшей читаемости"
                  value={settings.fontFamily}
                  options={[
                    { value: 'default', label: 'Стандартный шрифт' },
                    { value: 'arial', label: 'Arial' },
                  ]}
                  onChange={(v) => updateSettings({ fontFamily: v })}
                />
              </Section>

              <Section title="Цвета и контрастность">
                <SelectRow
                  id="a11y-contrast"
                  label="Контрастность"
                  value={settings.contrast}
                  options={[
                    { value: 'normal', label: 'Обычная' },
                    { value: 'high', label: 'Высокая (7:1)' },
                  ]}
                  onChange={(v) => updateSettings({ contrast: v })}
                />
                <SelectRow
                  id="a11y-color-scheme"
                  label="Цветовая схема"
                  hint="Позволяет выбрать удобную цветовую схему"
                  value={settings.colorScheme}
                  options={[
                    { value: 'normal', label: 'Обычная' },
                    { value: 'dark', label: 'Темная' },
                    { value: 'inverted', label: 'Инвертированная' },
                  ]}
                  onChange={(v) => updateSettings({ colorScheme: v })}
                />
              </Section>

              <Section title="Дополнительные настройки">
                <SwitchRow
                  id="reduce-motion"
                  label="Уменьшить анимации"
                  description="Отключает анимации для пользователей с вестибулярными расстройствами"
                  checked={settings.reduceMotion}
                  onChange={(v) => updateSettings({ reduceMotion: v })}
                />
                <SwitchRow
                  id="grayscale"
                  label="Черно-белый режим"
                  description="Отображает сайт без цветов (в оттенках серого)"
                  checked={settings.grayscale}
                  onChange={(v) => updateSettings({ grayscale: v })}
                />
                <SwitchRow
                  id="hide-images"
                  label="Отключить изображения"
                  description="Скрывает картинки на странице для упрощения чтения"
                  checked={settings.hideImages}
                  onChange={(v) => updateSettings({ hideImages: v })}
                />
                <SwitchRow
                  id="show-focus"
                  label="Подсветка фокуса"
                  description="Четко показывает элемент в фокусе для навигации с клавиатуры"
                  checked={settings.showFocus}
                  onChange={(v) => updateSettings({ showFocus: v })}
                />
              </Section>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetSettings}
                  className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-900 hover:bg-slate-50"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Сбросить
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-[var(--a11y-settings-accent)] px-4 py-2 font-medium text-white hover:bg-[var(--a11y-settings-accent-hover)]"
                >
                  Применить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
