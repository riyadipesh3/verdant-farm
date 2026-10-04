import { useEffect, useRef, useState, type ReactNode } from 'react'

/* IntersectionObserver only, never a scroll listener. Collapses to fully
   visible under prefers-reduced-motion. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* --- In-season grid. Six tiles on a 6 column by 3 row plan at lg, spanning
       6+3+2+1+3+3 = 18 cells, so the plan fills exactly and leaves no hole.
       Spans are authored per tile rather than handed to auto-placement. --- */
const SEASON = [
  {
    name: 'Cos lettuce',
    months: 'April to October',
    price: '€1.60 a head',
    seed: 'verdant-cos-lettuce-heads',
    alt: 'Upright heads of cos lettuce cut and stood in water',
    span: 'lg:col-span-3 lg:row-span-2',
  },
  {
    name: 'New potatoes',
    months: 'May to July',
    price: '€3.40 a kilo',
    seed: 'verdant-new-potatoes-harvest',
    alt: 'New potatoes lifted from a drill row and heaped on soil',
    span: 'lg:col-span-3',
  },
  {
    name: 'Purple sprouting broccoli',
    months: 'September to December',
    price: '€4.10 a kilo',
    seed: 'verdant-purple-sprouting-broccoli',
    alt: 'Purple sprouting broccoli stems cut back in a field bed',
    span: 'lg:col-span-2',
  },
  {
    name: 'Rainbow chard',
    months: 'May to November',
    price: '€2.20 a bunch',
    seed: 'verdant-rainbow-chard-bunch',
    alt: 'Rainbow chard bunches with red and yellow stems tied together',
    span: 'lg:col-span-1',
  },
  {
    name: 'Beefsteak tomatoes',
    months: 'July to October',
    price: '€4.60 a kilo',
    seed: 'verdant-heated-tunnel-tomatoes',
    alt: 'Ripe beefsteak tomatoes hanging on vines inside a tunnel',
    span: 'lg:col-span-3',
  },
  {
    name: 'Crown Prince squash',
    months: 'September to November',
    price: '€2.80 each',
    seed: 'verdant-crown-prince-squash',
    alt: 'Crown Prince winter squash curing on a rack in a barn',
    span: 'lg:col-span-3',
  },
]

/* --- Practices. Scroll-snap rail, six of them, numbers beside titles are
       capability numbers not section counters. --- */
const PRACTICES = [
  {
    n: '01',
    title: 'Compost made here',
    body: 'Crop residue, spent mushroom compost and manure go into four covered bays. It turns for eleven weeks and goes back out the same spring.',
  },
  {
    n: '02',
    title: 'Cover crops all winter',
    body: 'Vetch and oats are sown into every emptied bed in October and dug in the following May. Nothing on this site is bare ground in February.',
  },
  {
    n: '03',
    title: 'Predators before sprays',
    body: 'Ladybird larvae, hoverflies and ground beetles do most of the work. We use two threshold based sprays a year and no herbicide.',
  },
  {
    n: '04',
    title: 'Rainwater first',
    body: 'Two 40,000 litre tanks sit above the tunnels and a borehole covers the rest. A dry July in 2022 cut irrigation by a third.',
  },
  {
    n: '05',
    title: 'A sowing every fortnight',
    body: 'Eleven sowing rounds a year. It spreads the harvest across July to November instead of landing 300 kilos of lettuce in one week.',
  },
  {
    n: '06',
    title: 'Cut at dawn',
    body: 'Field heat is the enemy of greens, so nothing is picked before six. It is cooled to four degrees and on the van by nine.',
  },
]

/* --- Produce detail rows, grouped into two clusters so this never reads as a
       single long table. Three columns: image, description, field data. --- */
const DETAIL = [
  {
    cluster: 'Leaf and root',
    name: 'Cavolo Nero',
    where: 'Bed 7, sandy loam over gravel',
    volume: '26 bunches a week',
    window: 'November to March',
    price: '€2.40 a bunch',
    seed: 'verdant-cavolo-nero-bunches',
    alt: 'Bunches of cavolo nero standing upright after cutting',
  },
  {
    cluster: 'Leaf and root',
    name: 'Chioggia beetroot',
    where: 'Bed 11, beside the compost bays',
    volume: '180 bunches a week',
    window: 'June to February',
    price: '€2.10 a bunch',
    seed: 'verdant-chioggia-beetroot-beds',
    alt: 'Rows of beetroot tops thinned by hand in a field bed',
  },
  {
    cluster: 'Fruit and vine',
    name: 'Lemon cucumber',
    where: 'Heated tunnel 2, 60 metres',
    volume: '310 a week from August',
    window: 'July to September',
    price: '€3.80 a kilo',
    seed: 'verdant-lemon-cucumber-tunnel',
    alt: 'Pale lemon cucumbers trained up twine inside a polytunnel',
  },
  {
    cluster: 'Fruit and vine',
    name: 'Discovery apple',
    where: 'Orchard of 62 trees, planted 1998',
    volume: '1.4 tonnes a season',
    window: 'August to September',
    price: '€3.60 a kilo',
    seed: 'verdant-discovery-apple-orchard',
    alt: 'Ripe Discovery apples hanging in a grass orchard in September',
  },
]

export default function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const clusters = ['Leaf and root', 'Fruit and vine']

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--color-accent)] focus:px-5 focus:py-2.5 focus:text-[var(--color-canvas)]"
      >
        Skip to content
      </a>

      {/* ---------------------------------------------------------------- */}
      {/* NAV                                                              */}
      {/* ---------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-hairline)] bg-[var(--color-canvas)]/92 backdrop-blur-sm">
        <div className="shell flex h-[72px] items-center justify-between">
          <a
            href="#top"
            className="display text-[1.25rem] font-extrabold text-[var(--color-accent)]"
          >
            Verdant
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {[
              { label: 'In season', href: '#season' },
              { label: 'The farm', href: '#story' },
              { label: 'How we farm', href: '#practices' },
              { label: 'Produce', href: '#produce' },
              { label: 'Ordering', href: '#order' },
            ].map((i) => (
              <a
                key={i.href}
                href={i.href}
                className="text-[0.9375rem] font-medium text-[var(--color-body)] transition-colors hover:text-[var(--color-accent)]"
              >
                {i.label}
              </a>
            ))}
          </nav>

          <a href="#order" className="btn btn-primary hidden lg:inline-flex">
            Order a box
          </a>

          <button
            type="button"
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            onClick={() => setNavOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center border border-[var(--color-hairline)] bg-transparent text-[var(--color-ink)] lg:hidden"
          >
            <span className="flex w-4 flex-col gap-[5px]">
              <span
                className={`h-[2px] w-full rounded-[2px] bg-[var(--color-ink)] transition-transform duration-200 ${
                  navOpen ? 'translate-y-[3.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-[2px] w-full rounded-[2px] bg-[var(--color-ink)] transition-transform duration-200 ${
                  navOpen ? '-translate-y-[3.5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {navOpen ? (
          <div id="mobile-nav" className="border-t border-[var(--color-hairline)] lg:hidden">
            <nav className="shell flex flex-col py-4">
              {[
                { label: 'In season', href: '#season' },
                { label: 'The farm', href: '#story' },
                { label: 'How we farm', href: '#practices' },
                { label: 'Produce', href: '#produce' },
                { label: 'Ordering', href: '#order' },
              ].map((i) => (
                <a
                  key={i.href}
                  href={i.href}
                  onClick={() => setNavOpen(false)}
                  className="border-b border-[var(--color-hairline)] py-3.5 text-[1rem] font-medium text-[var(--color-ink)] last:border-b-0"
                >
                  {i.label}
                </a>
              ))}
              <a
                href="#order"
                onClick={() => setNavOpen(false)}
                className="btn btn-primary mt-5 w-full"
              >
                Order a box
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="main">
        {/* -------------------------------------------------------------- */}
        {/* HERO - asymmetric photo split, four text elements, fits viewport*/}
        {/* -------------------------------------------------------------- */}
        <section id="top" className="shell pt-16 pb-14 lg:pt-20 lg:pb-16">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="micro mb-6">Certified organic producer</p>
              <h1 className="display display-xl">
                We grow 34 crops
                <br />
                and pick twice a week.
              </h1>
              <p className="lede mt-7">
                Order by Tuesday and your box arrives across County Tipperary on
                Thursday. No subscription, no warehouse, no middlemen.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#order" className="btn btn-primary">
                  Order a box
                </a>
                <a href="#practices" className="btn btn-secondary">
                  How we farm
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <div className="frame aspect-4/5 w-full sm:aspect-16/11 lg:aspect-4/5 lg:max-h-[560px]">
                  <img
                    src="https://picsum.photos/seed/verdant-clonlara-farm-fields-morning/1400/1050"
                    alt="Market garden beds in long rows on a valley farm in early morning light"
                    loading="eager"
                    width={1400}
                    height={1050}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* WHAT IS IN SEASON - asymmetric six-tile image grid              */}
        {/* -------------------------------------------------------------- */}
        <section id="season" className="bg-[var(--color-surface)] py-20 lg:py-28">
          <div className="shell">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <p className="micro mb-5">Cut this week</p>
                  <h2 className="display display-lg">
                    What is in season
                    <br />
                    in early October
                  </h2>
                </div>
                <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                  Six of the 34 crops we grow. The list changes every week as
                  fields are cleared and replanted.
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-6 lg:auto-rows-[16rem]">
              {SEASON.map((s, i) => (
                <Reveal
                  key={s.name}
                  delay={(i % 3) * 70}
                  className={`${s.span} min-w-0`}
                >
                  <article className="flex h-full flex-col">
                    {/* Fixed height on mobile, flex fill at lg so the tile
                        fills its grid row exactly and the caption below can
                        never be squeezed or overrun the next row. */}
                    <div className="frame h-[11rem] lg:h-auto lg:min-h-0 lg:flex-1">
                      <img
                        src={`https://picsum.photos/seed/${s.seed}/900/1100`}
                        alt={s.alt}
                        loading="lazy"
                        width={900}
                        height={1100}
                      />
                    </div>
                    <div className="mt-3.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="display-sm text-[1rem] leading-tight">
                        {s.name}
                      </h3>
                      <p className="text-[0.8125rem] font-semibold text-[var(--color-accent)]">
                        {s.price}
                      </p>
                    </div>
                    <p className="mt-1 text-[0.8125rem] text-[var(--color-mute)]">
                      {s.months}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* THE FARM - full-width photo band with an editorial column flow  */}
        {/* -------------------------------------------------------------- */}
        <section id="story" className="py-20 lg:py-28">
          <div className="shell">
            <Reveal>
              <div className="frame aspect-16/7 w-full">
                <img
                  src="https://picsum.photos/seed/verdant-clonlara-farm-shed-and-tractor/2000/875"
                  alt="Stone farm shed, tractor and stacked crates at the edge of the fields"
                  loading="lazy"
                  width={2000}
                  height={875}
                />
              </div>
            </Reveal>

            <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-4">
                <h2 className="display display-md">
                  The farm since 1996
                </h2>
                <dl className="mt-9 space-y-6">
                  {[
                    { t: 'Worked ground', d: '11.2 hectares, all owned, none rented' },
                    { t: 'Crops grown', d: '34 varieties across the season' },
                    { t: 'Boxes out', d: '128 a week in season, 41 out of it' },
                    { t: 'People', d: '6 full time, 4 on harvest days' },
                  ].map((f) => (
                    <div key={f.t}>
                      <dt className="display-sm text-[0.9375rem] font-semibold">
                        {f.t}
                      </dt>
                      <dd className="mt-1 text-[0.9375rem] text-[var(--color-body)]">
                        {f.d}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal className="lg:col-span-8" delay={80}>
                <div className="space-y-6 text-[1.0625rem] leading-[1.72]">
                  <p>
                    Maureen and Tomas Kelleher took over eleven hectares of
                    grazing land above the Glen river in 1996, when every farm
                    within thirty kilometres grew the same four things. The first
                    year they sold 90 boxes from the gate. This year we put out
                    128 a week and turn away about sixty more.
                  </p>
                  <p>
                    Everything is cropped in blocks of no more than half a
                    hectare, so the tractor can turn in a day and one crop never
                    sits in the ground longer than a season needs it. Twenty
                    four beds rotate between brassicas, legumes and green
                    manure.
                  </p>
                  <p>
                    We sell to 3 restaurants, one shop in Clonlara and 124
                    households within forty kilometres of the gate. Nothing
                    leaves the site in a lorry, and nothing is stored past the
                    week it was picked.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* HOW WE FARM - horizontal scroll-snap rail, six practices       */}
        {/* -------------------------------------------------------------- */}
        <section id="practices" className="border-y border-[var(--color-hairline)] py-20 lg:py-28">
          <div className="shell">
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="display display-lg">
                  Six things we do
                  <br />
                  every week
                </h2>
                <p className="lede mt-6">
                  The same six jobs, written down, done in the same order since
                  the first compost bay went in.
                </p>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="rail mt-12">
                {PRACTICES.map((p) => (
                  <article
                    key={p.n}
                    className="flex h-full flex-col border border-[var(--color-hairline)] bg-[var(--color-surface)] p-7"
                  >
                    <p className="text-[0.8125rem] font-bold tracking-[0.06em] text-[var(--color-accent)]">
                      {p.n}
                    </p>
                    <h3 className="display display-sm mt-4 text-[1.25rem] leading-tight">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                      {p.body}
                    </p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* PRODUCE DETAIL - three column rows in two clusters             */}
        {/* -------------------------------------------------------------- */}
        <section id="produce" className="py-20 lg:py-28">
          <div className="shell">
            <Reveal>
              <h2 className="display display-md">Four crops in detail</h2>
            </Reveal>

            <div className="mt-12 space-y-14">
              {clusters.map((cluster, ci) => (
                <div key={cluster}>
                  <Reveal>
                    <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[var(--color-hairline)] pb-4">
                      <h3 className="display display-sm text-[1.125rem] font-bold">
                        {cluster}
                      </h3>
                      <p className="text-[0.875rem] text-[var(--color-mute)]">
                        {DETAIL.filter((d) => d.cluster === cluster).length} crops
                        listed
                      </p>
                    </div>
                  </Reveal>

                  <ul className="mt-4 grid gap-4">
                    {DETAIL.filter((d) => d.cluster === cluster).map((d, i) => (
                      <Reveal key={d.name} delay={(ci + i) * 70}>
                        <li className="grid items-start gap-5 border border-[var(--color-hairline)] bg-[var(--color-surface)] p-5 sm:grid-cols-12 sm:gap-7">
                          <div className="frame aspect-square w-full sm:col-span-2">
                            <img
                              src={`https://picsum.photos/seed/${d.seed}/600/600`}
                              alt={d.alt}
                              loading="lazy"
                              width={600}
                              height={600}
                            />
                          </div>
                          <div className="sm:col-span-6">
                            <h4 className="display display-sm text-[1.1875rem] font-bold">
                              {d.name}
                            </h4>
                            <p className="mt-1.5 text-[0.9375rem] text-[var(--color-body)]">
                              {d.where}
                            </p>
                            <p className="mt-3 text-[0.875rem] leading-relaxed text-[var(--color-mute)]">
                              Cut on request rather than held, so a Tuesday order
                              is picked the Wednesday before it leaves the gate.
                            </p>
                          </div>
                          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:col-span-4 sm:grid-cols-1">
                            <div>
                              <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-mute)]">
                                In season
                              </dt>
                              <dd className="mt-0.5 text-[0.9375rem] text-[var(--color-ink)]">
                                {d.window}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-mute)]">
                                Typical week
                              </dt>
                              <dd className="mt-0.5 text-[0.9375rem] text-[var(--color-ink)]">
                                {d.volume}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-mute)]">
                                Price
                              </dt>
                              <dd className="mt-0.5 text-[0.9375rem] font-semibold text-[var(--color-accent)]">
                                {d.price}
                              </dd>
                            </div>
                          </dl>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* ORDERING AND CONTACT - two column, pickup detail plus a form    */}
        {/* -------------------------------------------------------------- */}
        <section
          id="order"
          className="bg-[var(--color-accent-soft)] py-20 lg:py-28"
        >
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-5">
                <h2 className="display display-lg">
                  Order by Tuesday,
                  <br />
                  collect on Thursday
                </h2>
                <p className="lede mt-6">
                  Boxes are packed on Wednesday evening and can be collected at
                  the gate or delivered on Thursday morning.
                </p>

                <dl className="mt-10 space-y-7">
                  <div>
                    <dt className="display-sm text-[0.9375rem] font-bold">
                      Farm gate collection
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-body)]">
                      Thursdays 3pm to 7pm, Clonlara, Co. Tipperary
                    </dd>
                  </div>
                  <div>
                    <dt className="display-sm text-[0.9375rem] font-bold">
                      Delivery
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-body)]">
                      Friday mornings across County Tipperary, €4 a box or free
                      over €40
                    </dd>
                  </div>
                  <div>
                    <dt className="display-sm text-[0.9375rem] font-bold">
                      Box sizes
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-body)]">
                      Small €22, family €34, large €46. Roughly nine kilos of
                      produce each.
                    </dd>
                  </div>
                  <div>
                    <dt className="display-sm text-[0.9375rem] font-bold">
                      Email or phone
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-ink)]">
                      orders@verdantfarm.ie
                      <br />
                      +353 87 244 6318
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal className="lg:col-span-7" delay={80}>
                <form
                  className="border border-[var(--color-hairline)] bg-[var(--color-surface)] p-6 sm:p-9"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault()
                    setEmailError(
                      email.includes('@') && email.includes('.')
                        ? ''
                        : 'Enter an email address we can send the box list to.',
                    )
                  }}
                >
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <label
                        htmlFor="order-name"
                        className="text-[0.875rem] font-semibold text-[var(--color-ink)]"
                      >
                        Name
                      </label>
                      <input
                        id="order-name"
                        name="name"
                        type="text"
                        aria-describedby="order-name-hint"
                        className="field"
                      />
                      <p
                        id="order-name-hint"
                        className="text-[0.8125rem] text-[var(--color-mute)]"
                      >
                        The name on the gate list.
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <label
                        htmlFor="order-email"
                        className="text-[0.875rem] font-semibold text-[var(--color-ink)]"
                      >
                        Email
                      </label>
                      <input
                        id="order-email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={emailError ? true : undefined}
                        aria-describedby={
                          emailError ? 'order-email-error' : 'order-email-hint'
                        }
                        className="field"
                      />
                      {emailError ? (
                        <p
                          id="order-email-error"
                          className="text-[0.8125rem] font-semibold text-[#8c2f1d]"
                        >
                          {emailError}
                        </p>
                      ) : (
                        <p
                          id="order-email-hint"
                          className="text-[0.8125rem] text-[var(--color-mute)]"
                        >
                          Friday list goes out at four, nothing else.
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <label
                        htmlFor="order-box"
                        className="text-[0.875rem] font-semibold text-[var(--color-ink)]"
                      >
                        Box size
                      </label>
                      <select
                        id="order-box"
                        name="box"
                        defaultValue="family"
                        aria-describedby="order-box-hint"
                        className="field"
                      >
                        <option value="small">Small box, €22</option>
                        <option value="family">Family box, €34</option>
                        <option value="large">Large box, €46</option>
                      </select>
                      <p
                        id="order-box-hint"
                        className="text-[0.8125rem] text-[var(--color-mute)]"
                      >
                        We build to your choice, so tell us what to leave out.
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <label
                        htmlFor="order-notes"
                        className="text-[0.875rem] font-semibold text-[var(--color-ink)]"
                      >
                        What to leave out
                      </label>
                      <textarea
                        id="order-notes"
                        name="notes"
                        rows={4}
                        aria-describedby="order-notes-hint"
                        className="field min-h-[7rem]"
                      />
                      <p
                        id="order-notes-hint"
                        className="text-[0.8125rem] text-[var(--color-mute)]"
                      >
                        Alliums, brassicas or anything else to skip this week.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button type="submit" className="btn btn-primary">
                      Send order
                    </button>
                    <p className="text-[0.8125rem] text-[var(--color-mute)]">
                      We answer within one working day.
                    </p>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER                                                          */}
      {/* ---------------------------------------------------------------- */}
      <footer className="border-t border-[var(--color-hairline)] bg-[var(--color-canvas)] py-14">
        <div className="shell">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="display text-[1.125rem] font-extrabold text-[var(--color-accent)]">
                Verdant
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                Verdant Market Farm
                <br />
                Clonlara, Co. Tipperary, Ireland
              </p>
            </div>

            <div>
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-mute)]">
                Visit
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                Gate open Thursdays
                <br />
                3pm to 7pm
                <br />
                R56 XW24, Ireland
              </p>
            </div>

            <div>
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-mute)]">
                Reach us
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                <a
                  href="mailto:orders@verdantfarm.ie"
                  className="transition-colors hover:text-[var(--color-accent)]"
                >
                  orders@verdantfarm.ie
                </a>
                <br />
                +353 87 244 6318
              </p>
            </div>

            <nav aria-label="Footer">
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-mute)]">
                On this page
              </p>
              <ul className="mt-3 space-y-2">
                {[
                  { label: 'In season', href: '#season' },
                  { label: 'The farm', href: '#story' },
                  { label: 'How we farm', href: '#practices' },
                  { label: 'Produce', href: '#produce' },
                  { label: 'Ordering', href: '#order' },
                ].map((i) => (
                  <li key={i.href}>
                    <a
                      href={i.href}
                      className="text-[0.9375rem] text-[var(--color-body)] transition-colors hover:text-[var(--color-accent)]"
                    >
                      {i.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-12 flex flex-col gap-2 border-t border-[var(--color-hairline)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.8125rem] text-[var(--color-mute)]">
              Organic registration IE-ORG-0417. Certified by the Irish Organic
              Board since 1996.
            </p>
            <p className="text-[0.8125rem] text-[var(--color-body)]">
              Developed by{' '}
              <a
                href="https://thediyadevelopers.com"
                className="underline underline-offset-2 transition-colors hover:text-[var(--color-accent)]"
              >
                Diya Developers
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
