import re, sys, os, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from charts_specs import SPECS
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
apply = '--apply' in sys.argv
files = collections.OrderedDict()
ok = True
for f, anchor, close, html in SPECS:
    files.setdefault(f, []).append((anchor, close, html))
for f, items in files.items():
    p = os.path.join(ROOT, f); s = open(p, encoding='utf-8').read()
    # strip previously inserted charts (idempotent re-run)
    s = re.sub(r'\n<!-- fb-chart:[\w-]+ -->.*?<!-- /fb-chart:[\w-]+ -->\n', '', s, flags=re.S)
    for anchor, close, html in items:
        n = s.count(anchor)
        cid = re.search(r'fb-chart:([\w-]+)', html).group(1)
        if n != 1:
            print(f'!! {f} [{cid}] anchor count={n}: {anchor}'); ok = False; continue
        i = s.index(anchor); j = s.find(close, i)
        if j < 0: print(f'!! {f} [{cid}] no close'); ok = False; continue
        j += len(close)
        between = s[i:j]
        if len(between) > 1500: print(f'?? {f} [{cid}] long span {len(between)}')
        print(f'ok {f} [{cid}] ...{s[max(0,j-50):j]!r} || {s[j:j+60]!r}')
        s = s[:j] + html + s[j:]
    if apply: open(p, 'w', encoding='utf-8').write(s)
print('ALL OK' if ok else 'PROBLEMS', len(SPECS), 'charts')
