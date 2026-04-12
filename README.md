# MICHAELLANEBOLDT.COM

Single-page portfolio site. Mobile-first. No build step required.

## Structure

```
/
├── index.html              Site entry point
├── assets/
│   ├── frame.png           Desktop woodblock frame (transparent center)
│   └── MICHAEL_BOLDT_CV.pdf  CV download
├── projects/
│   ├── 01-spolia/
│   │   ├── meta.txt        title, year, order, slug
│   │   ├── description.txt Project text (all caps)
│   │   ├── thumb/
│   │   │   └── 01.jpg      4:5 aspect ratio thumbnail
│   │   └── images/
│   │       ├── 01.jpg      Single image (any aspect ratio, full width)
│   │       ├── 02/         Numbered subfolder = carousel slot
│   │       │   ├── 01.jpg
│   │       │   ├── 02.jpg
│   │       │   └── ...
│   │       └── 03.jpg
│   └── [02-07 same structure]
├── content/
│   ├── about.txt           Two paragraphs, blank line between
│   ├── contact.txt         One line per contact item
│   └── cv.txt              CV in # > >> :: format (see below)
└── src/
    ├── css/style.css
    └── js/site.js          All site logic. Edit CONSTANTS block for design values.
                            Edit PROJECTS array to add/reorder projects.
```

## Adding a project

1. Create folder: `projects/08-projectname/`
2. Add `meta.txt`, `description.txt`, `thumb/01.jpg`, `images/01.jpg` (etc.)
3. Add entry to `PROJECTS` array in `src/js/site.js`
4. Push to GitHub

## Reordering projects

Change the numeric prefix on the folder (e.g. `01-` → `03-`) and update `order:` in `meta.txt`.
Reorder the entries in the `PROJECTS` array in `site.js` to match.

## Editing CV content

Edit `content/cv.txt` using this format:

```
# SECTION HEADER

> ONE INDENT ENTRY :: DATE (date is right-justified, no dash)
> ONE INDENT NO DATE
>> TWO INDENTS (detail or skill category)
>> ITEM ONE — ITEM TWO — ITEM THREE (dashes separate skill items)
```

Then update the `CV` array in `site.js` to match (currently hardcoded — Eleventy parser forthcoming).

## cv.txt format key

- `#` = section header (flush left)
- `>` = one indent
- `>>` = two indents
- `::` = separates entry text from right-justified date
- Lines with no `::` have no date
- Items at `>>` level separated by ` — ` become dash-connected skill lists

## Desktop frame

Place `assets/frame.png` — the woodblock frame image with a **transparent center hole**.
The frame appears at viewport widths ≥ 500px. Below that, full-bleed mobile experience.

## Deployment

Push to GitHub. Enable GitHub Pages from repository Settings → Pages → Deploy from branch `main`, folder `/` (root).
