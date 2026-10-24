"""FitBiz chart HTML builders. Pure HTML/CSS (+ tiny inline SVG), styled by css/style.css (.fb-*)."""

TONE_COLORS = {
    'hi': 'var(--orange)', 'base': 'var(--ink)', 'soft': 'var(--orange-light)',
    'mute': '#c7c7cc', 'mid': 'var(--ink-3)', 'deep': '#c2410c', 'pale': '#e8e8ed',
}
DONUT_ORDER = ['hi', 'base', 'soft', 'mid', 'deep', 'mute', 'pale']


def pct(v, lo, hi):
    return round((v - lo) / (hi - lo) * 100, 2)


def fig(cid, title, body, sub=None, src='資料來源：本文整理', ctype=''):
    sub_html = f'\n    <div class="fb-chart-sub">{sub}</div>' if sub else ''
    return (f'\n<!-- fb-chart:{cid} -->\n'
            f'<figure class="fb-chart {ctype}" id="chart-{cid}">\n'
            f'  <div class="fb-chart-head">\n    <div class="fb-chart-title">{title}</div>{sub_html}\n  </div>\n'
            f'{body}\n'
            f'  <figcaption class="fb-chart-src">{src}</figcaption>\n'
            f'</figure>\n<!-- /fb-chart:{cid} -->\n')


def hbar(rows, vmax):
    """rows: (label, value, display, tone)"""
    out = ['  <div class="fb-hbar">']
    for label, v, disp, tone in rows:
        out.append(f'    <div class="fb-row fb-t-{tone}"><div class="fb-label">{label}</div>'
                   f'<div class="fb-track"><div class="fb-fill" style="--w:{pct(v, 0, vmax)}%"></div></div>'
                   f'<div class="fb-val">{disp}</div></div>')
    out.append('  </div>')
    return '\n'.join(out)


def axis(ticks, lo, hi):
    t = ''.join(f'<span style="left:{pct(v, lo, hi)}%">{lab}</span>' for v, lab in ticks)
    return f'<div class="fb-axis">{t}</div>'


def rangechart(rows, lo, hi, ticks, marker=None):
    """rows: (label, a, b, display, tone, open_end). a=None → no bar (text only)."""
    out = ['  <div class="fb-range">']
    mk, mline = '', ''
    if marker:
        mv, mlab = marker
        mk = f'<div class="fb-marker" style="left:{pct(mv, lo, hi)}%"><span>{mlab}</span></div>'
        mline = f'<i class="fb-mk" style="left:{pct(mv, lo, hi)}%"></i>'
    for label, a, b, disp, tone, open_end in rows:
        if a is None:
            bar = ''
        else:
            left = pct(a, lo, hi)
            width = max(pct(b, lo, hi) - left, 1.2)
            cls = ' fb-open' if open_end else ''
            bar = f'<div class="fb-seg{cls}" style="--l:{left}%;--w:{width}%"></div>'
        out.append(f'    <div class="fb-row fb-t-{tone}"><div class="fb-label">{label}</div>'
                   f'<div class="fb-track">{mline}{bar}</div><div class="fb-val">{disp}</div></div>')
    out.append(f'    <div class="fb-row fb-axis-row"><div class="fb-label"></div>'
               f'<div class="fb-track-axis">{mk}{axis(ticks, lo, hi)}</div><div class="fb-val"></div></div>')
    out.append('  </div>')
    return '\n'.join(out)


def zones(zs, lo, hi, ticks):
    """zs: (a, b, label, tone) — one band split into zones, legend below."""
    segs = ''.join(f'<div class="fb-zone fb-t-{t}" style="--w:{pct(b, lo, hi) - pct(a, lo, hi)}%"></div>'
                   for a, b, _, t in zs)
    legend = ''.join(f'<li class="fb-t-{t}"><i></i>{lab}</li>' for a, b, lab, t in zs if lab)
    return (f'  <div class="fb-zones">\n    <div class="fb-zone-band">{segs}</div>\n'
            f'    {axis(ticks, lo, hi)}\n  </div>\n  <ul class="fb-legend fb-legend-col">{legend}</ul>')


def donut(segs, center_big, center_small):
    """segs: (label, value, display, tone or None)"""
    total = sum(s[1] for s in segs)
    circles, legend, acc = [], [], 0.0
    for i, (label, v, disp, tone) in enumerate(segs):
        tone = tone or DONUT_ORDER[i % len(DONUT_ORDER)]
        p = v / total * 100
        circles.append(f'<circle class="fb-donut-seg" cx="21" cy="21" r="15.915" fill="none" '
                       f'stroke="{TONE_COLORS[tone]}" stroke-width="6" '
                       f'stroke-dasharray="{p:.3f} {100 - p:.3f}" stroke-dashoffset="{25 - acc:.3f}"></circle>')
        acc += p
        legend.append(f'<li class="fb-t-{tone}"><i></i><span class="fb-lg-label">{label}</span>'
                      f'<span class="fb-lg-val">{disp}</span></li>')
    return ('  <div class="fb-donut">\n'
            '    <div class="fb-donut-ring">\n'
            f'      <svg viewBox="0 0 42 42" aria-hidden="true"><circle cx="21" cy="21" r="15.915" fill="none" '
            f'stroke="#f0f0f3" stroke-width="6"></circle>{"".join(circles)}</svg>\n'
            f'      <div class="fb-donut-center"><b>{center_big}</b><span>{center_small}</span></div>\n'
            '    </div>\n'
            f'    <ul class="fb-legend fb-legend-col">{"".join(legend)}</ul>\n'
            '  </div>')


def stack(segs, show_legend=True):
    """segs: (label, value, display, tone) — 100% stacked bar"""
    total = sum(s[1] for s in segs)
    parts = ''.join(f'<div class="fb-stack-seg fb-t-{t}{" fb-narrow" if v / total < 0.16 else ""}" '
                    f'style="--w:{v / total * 100:.2f}%"><span>{d}</span></div>' for _, v, d, t in segs)
    legend = ''.join(f'<li class="fb-t-{t}"><i></i><span class="fb-lg-label">{lab}</span>'
                     f'<span class="fb-lg-val">{d}</span></li>' for lab, v, d, t in segs)
    out = f'  <div class="fb-stack">{parts}</div>'
    if show_legend:
        out += f'\n  <ul class="fb-legend">{legend}</ul>'
    return out


def columns(items, vmax, unit_note=None):
    """items: (label, value, display, tone, note)"""
    cols = []
    for label, v, disp, tone, note in items:
        n = f'<div class="fb-col-note">{note}</div>' if note else ''
        cols.append(f'<div class="fb-col fb-t-{tone}" style="--h:{pct(v, 0, vmax)}%">'
                    f'<div class="fb-col-bar"><div class="fb-col-val">{disp}</div><div class="fb-fill"></div></div>'
                    f'<div class="fb-col-label">{label}</div>{n}</div>')
    return f'  <div class="fb-cols" style="--n:{len(items)}">{"".join(cols)}</div>'


def gantt(units, rows, header_every=1):
    """units: column labels; rows: (label, start, end, tone, note, open_end) — 1-indexed inclusive."""
    n = len(units)
    head = ''.join(f'<span style="grid-column:{i + 1}">{u}</span>' for i, u in enumerate(units)
                   if (i % header_every == 0) or i == n - 1)
    body = []
    for label, s, e, tone, note, open_end in rows:
        cls = ' fb-open' if open_end else ''
        nt = f'<span class="fb-gantt-note">{note}</span>' if note else ''
        body.append(f'    <div class="fb-gantt-row fb-t-{tone}"><div class="fb-label">{label}</div>'
                    f'<div class="fb-gantt-track" style="--n:{n}"><div class="fb-gantt-bar{cls}" '
                    f'style="grid-column:{s} / {e + 1}"></div>{nt}</div></div>')
    return ('  <div class="fb-gantt">\n'
            f'    <div class="fb-gantt-row fb-gantt-head"><div class="fb-label"></div>'
            f'<div class="fb-gantt-track" style="--n:{n}">{head}</div></div>\n'
            + '\n'.join(body) + '\n  </div>')


def gantt_markers(units, rows):
    """rows: (label, start, end, tone, marker_col, marker_text)"""
    n = len(units)
    head = ''.join(f'<span style="grid-column:{i + 1}">{u}</span>' for i, u in enumerate(units))
    body = []
    for label, s, e, tone, mc, mt in rows:
        body.append(f'    <div class="fb-gantt-row fb-t-{tone}"><div class="fb-label">{label}</div>'
                    f'<div class="fb-gantt-track" style="--n:{n}"><div class="fb-gantt-bar" '
                    f'style="grid-column:{s} / {e + 1}"></div>'
                    f'<div class="fb-gantt-pin" style="grid-column:{mc}"><span>{mt}</span></div></div></div>')
    return ('  <div class="fb-gantt fb-gantt-dense">\n'
            f'    <div class="fb-gantt-row fb-gantt-head"><div class="fb-label"></div>'
            f'<div class="fb-gantt-track" style="--n:{n}">{head}</div></div>\n'
            + '\n'.join(body) + '\n  </div>')


def steps(items, tone_last=False):
    """items: (when, title, desc)"""
    lis = []
    for i, (when, title, desc) in enumerate(items):
        hi = ' fb-step-hi' if (tone_last and i == len(items) - 1) else ''
        d = f'<div class="fb-step-desc">{desc}</div>' if desc else ''
        lis.append(f'<li class="fb-step{hi}"><div class="fb-step-dot"></div><div class="fb-step-when">{when}</div>'
                   f'<div class="fb-step-title">{title}</div>{d}</li>')
    return f'  <ol class="fb-steps" style="--n:{len(items)}">{"".join(lis)}</ol>'


def line(series, x_lo, x_hi, y_lo, y_hi, xticks, yticks, points=None, height=240):
    """series: (label, [(x,y)...], tone, dashed). points: (x, y, label, tone, align)"""
    def X(x):
        return pct(x, x_lo, x_hi)

    def Y(y):
        return round(100 - pct(y, y_lo, y_hi), 2)
    grid = ''.join(f'<line x1="0" x2="100" y1="{Y(v)}" y2="{Y(v)}" class="fb-gl"></line>' for v, _ in yticks)
    polys = []
    for label, pts, tone, dashed in series:
        p = ' '.join(f'{X(x)},{Y(y)}' for x, y in pts)
        d = ' stroke-dasharray="4 3"' if dashed else ''
        polys.append(f'<polyline points="{p}" fill="none" stroke="{TONE_COLORS[tone]}" stroke-width="2.5" '
                     f'vector-effect="non-scaling-stroke"{d}></polyline>')
    ylab = ''.join(f'<span style="bottom:{pct(v, y_lo, y_hi)}%">{lab}</span>' for v, lab in yticks)
    xlab = ''.join(f'<span style="left:{X(v)}%">{lab}</span>' for v, lab in xticks)
    dots = ''
    for x, y, lab, tone, align in (points or []):
        dots += (f'<div class="fb-pt fb-t-{tone} fb-pt-{align}" style="left:{X(x)}%;bottom:{pct(y, y_lo, y_hi)}%">'
                 f'<i></i><span>{lab}</span></div>')
    legend = ''.join(f'<li class="fb-t-{tone}{" fb-dashed" if dashed else ""}"><i></i>{label}</li>'
                     for label, _, tone, dashed in series)
    return (f'  <ul class="fb-legend">{legend}</ul>\n'
            f'  <div class="fb-line" style="--h:{height}px">\n'
            f'    <div class="fb-ylab">{ylab}</div>\n'
            f'    <div class="fb-plot"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">'
            f'{grid}{"".join(polys)}</svg>{dots}</div>\n'
            f'    <div class="fb-xlab">{xlab}</div>\n'
            '  </div>')


def hub(center, center_note, nodes):
    """nodes: (name, desc)"""
    ns = ''.join(f'<li><b>{n}</b><span>{d}</span></li>' for n, d in nodes)
    return (f'  <div class="fb-hub">\n    <div class="fb-hub-center"><b>{center}</b><span>{center_note}</span></div>\n'
            f'    <ul class="fb-hub-nodes">{ns}</ul>\n  </div>')


def note(text):
    return f'  <p class="fb-chart-note">{text}</p>'
