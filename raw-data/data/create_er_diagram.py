import os
import glob
import re
import pandas as pd
from graphviz import Digraph

DATA_ROOT = os.path.join(os.path.dirname(__file__), "data_0")
OUT_PATH = os.path.join(DATA_ROOT, "er_diagram")
os.makedirs(OUT_PATH, exist_ok=True)

def detect_file_type(fname):
    fn = os.path.basename(fname).lower()
    if "activ" in fn: return "activ"
    if "exist" in fn: return "exist"
    if "sphy"  in fn: return "sphy"
    if "temp"  in fn: return "temp"
    if "weight" in fn: return "weight"
    return "other"

# scan CSVs and collect sample schema info
tables = {}  # file_type -> dict: {cols: set(), col_types: dict, sample_rows}
file_list = glob.glob(os.path.join(DATA_ROOT, "**", "*.csv"), recursive=True)

for fp in file_list:
    ftype = detect_file_type(fp)
    try:
        df = pd.read_csv(fp, nrows=500, encoding='utf-8', low_memory=False)
    except Exception:
        try:
            df = pd.read_csv(fp, nrows=500, encoding='latin1', low_memory=False)
        except Exception:
            continue
    if ftype not in tables:
        tables[ftype] = {"cols": set(), "types": {}, "samples": [], "rows_sampled": 0}
    t = tables[ftype]
    for col in df.columns:
        t["cols"].add(str(col).strip())
        # store dtype name
        t["types"][col] = str(df[col].dtype)
    t["samples"].append(df.head(5))
    t["rows_sampled"] += len(df)

# create a devices table if SerialNo appears in any table
has_serial = any("SerialNo" in t["cols"] for t in tables.values())
# add Date dimension if Date or Measure Date Time present
has_date = any(any(c.lower().startswith("date") or "measure date" in c.lower() for c in t["cols"]) for t in tables.values())

# build ER diagram with Graphviz
dot = Digraph(comment='ER Diagram (data_0)', format='png')
dot.attr('graph', fontsize='10', splines='ortho')

# create Devices node
if has_serial:
    dot.node('Devices', label='Devices\\n--\\nPK: SerialNo', shape='record')

# optional Date dimension
if has_date:
    dot.node('Date', label='Date\\n--\\ndim_date', shape='record')

# create a node per file_type with columns (mark SerialNo as FK if present)
for ftype, meta in sorted(tables.items()):
    cols = sorted(meta["cols"])
    # build label: table name and top columns (keeps diagram readable)
    col_lines = []
    # mark candidate PK if a column looks like unique id
    pk_candidate = None
    for c in cols:
        lname = c.lower()
        if lname in ("id", "serialno", "deviceid", "recordid"):
            pk_candidate = c
            break
    # column formatting: PK underlined, FK italic
    for c in cols:
        display = c
        if c == pk_candidate:
            display = "<u>{}</u>".format(c)
        if c == "SerialNo":
            display = "<i>{}</i>".format(display)
        col_lines.append(display)
    # show up to 20 columns
    label = "{{{} | {{ {} }} }}".format(ftype, " | ".join(col_lines[:20]))
    dot.node(ftype, label=label, shape='record')

    # add edges for SerialNo -> Devices
    if "SerialNo" in cols and has_serial:
        dot.edge(ftype + ":SerialNo", "Devices:SerialNo" if False else "Devices", arrowhead='none', color='black')

    # add edge for Date -> Date dim
    if any(c.lower().startswith("date") or "measure date" in c.lower() for c in cols) and has_date:
        dot.edge(ftype, "Date", arrowhead='none', color='gray')

# save DOT and render PNG
dot_path = os.path.join(OUT_PATH, "data_0_er_diagram")
dot.render(dot_path, view=False)
print("ER diagram generated:", dot_path + ".png")
print("If image not visible, install Graphviz system packages and rerun.")