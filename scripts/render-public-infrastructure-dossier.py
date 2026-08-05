from __future__ import annotations

import html
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "GameCult" / "public-digital-infrastructure-dossier.md"
OUTPUT = ROOT / "docs" / "gamecult_public_digital_infrastructure_dossier.pdf"

INK = colors.HexColor("#10182A")
MUTED = colors.HexColor("#526078")
ORANGE = colors.HexColor("#E06B22")
BLUE = colors.HexColor("#4357D9")
PAPER = colors.HexColor("#F7F5EF")
LINE = colors.HexColor("#D7DCE6")
CALLOUT = colors.HexColor("#EEF1F8")


def register_fonts() -> tuple[str, str, str]:
    candidates = [
        Path(r"C:\Windows\Fonts\segoeui.ttf"),
        Path(r"C:\Windows\Fonts\arial.ttf"),
    ]
    bold_candidates = [
        Path(r"C:\Windows\Fonts\segoeuib.ttf"),
        Path(r"C:\Windows\Fonts\arialbd.ttf"),
    ]
    italic_candidates = [
        Path(r"C:\Windows\Fonts\segoeuii.ttf"),
        Path(r"C:\Windows\Fonts\ariali.ttf"),
    ]
    if candidates[0].exists() and bold_candidates[0].exists() and italic_candidates[0].exists():
        pdfmetrics.registerFont(TTFont("Dossier", str(candidates[0])))
        pdfmetrics.registerFont(TTFont("Dossier-Bold", str(bold_candidates[0])))
        pdfmetrics.registerFont(TTFont("Dossier-Italic", str(italic_candidates[0])))
        pdfmetrics.registerFontFamily(
            "Dossier",
            normal="Dossier",
            bold="Dossier-Bold",
            italic="Dossier-Italic",
            boldItalic="Dossier-Bold",
        )
        return "Dossier", "Dossier-Bold", "Dossier-Italic"
    return "Helvetica", "Helvetica-Bold", "Helvetica-Oblique"


FONT, FONT_BOLD, FONT_ITALIC = register_fonts()


def inline_markup(value: str) -> str:
    placeholders: list[str] = []

    def link(match: re.Match[str]) -> str:
        label, url = match.group(1), match.group(2)
        token = f"@@LINK{len(placeholders)}@@"
        placeholders.append(
            f'<a href="{html.escape(url, quote=True)}" color="#{BLUE.hexval()[2:]}">'
            f"{html.escape(label)}</a>"
        )
        return token

    value = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", link, value)
    value = html.escape(value)
    value = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", value)
    value = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<i>\1</i>", value)
    value = re.sub(r"`([^`]+)`", r"<font name=\"Courier\">\1</font>", value)
    for index, replacement in enumerate(placeholders):
        value = value.replace(f"@@LINK{index}@@", replacement)
    return value


def strip_frontmatter(text: str) -> str:
    if text.startswith("---\n"):
        end = text.find("\n---\n", 4)
        if end >= 0:
            return text[end + 5 :]
    return text


def strip_hero(text: str) -> str:
    return re.sub(
        r"<section class=\"integrated-dossier-hero\">.*?</section>",
        "",
        text,
        count=1,
        flags=re.DOTALL,
    )


def parse_blocks(text: str) -> list[tuple[str, object]]:
    lines = strip_hero(strip_frontmatter(text)).splitlines()
    blocks: list[tuple[str, object]] = []
    paragraph: list[str] = []
    bullets: list[str] = []
    table_rows: list[list[str]] = []

    def flush_paragraph() -> None:
        if paragraph:
            blocks.append(("paragraph", " ".join(part.strip() for part in paragraph)))
            paragraph.clear()

    def flush_bullets() -> None:
        if bullets:
            blocks.append(("bullets", list(bullets)))
            bullets.clear()

    def flush_table() -> None:
        if table_rows:
            rows = list(table_rows)
            if len(rows) > 1 and all(re.fullmatch(r":?-{3,}:?", cell.strip()) for cell in rows[1]):
                rows.pop(1)
            blocks.append(("table", rows))
            table_rows.clear()

    for raw in lines:
        line = raw.rstrip()
        if not line:
            flush_paragraph()
            flush_bullets()
            flush_table()
            continue
        if line.startswith("<") and line.endswith(">"):
            continue
        heading = re.match(r"^(#{1,4})\s+(.+)$", line)
        if heading:
            flush_paragraph()
            flush_bullets()
            flush_table()
            blocks.append((f"h{len(heading.group(1))}", heading.group(2)))
            continue
        if line.startswith("> "):
            flush_paragraph()
            flush_bullets()
            flush_table()
            blocks.append(("callout", line[2:]))
            continue
        if re.match(r"^[-*]\s+", line):
            flush_paragraph()
            flush_table()
            bullets.append(re.sub(r"^[-*]\s+", "", line))
            continue
        if re.match(r"^\d+\.\s+", line):
            flush_paragraph()
            flush_table()
            bullets.append(re.sub(r"^\d+\.\s+", "", line))
            continue
        if line.startswith("|") and line.endswith("|"):
            flush_paragraph()
            flush_bullets()
            table_rows.append([cell.strip() for cell in line.strip("|").split("|")])
            continue
        if line == "---":
            flush_paragraph()
            flush_bullets()
            flush_table()
            continue
        paragraph.append(line)

    flush_paragraph()
    flush_bullets()
    flush_table()
    return blocks


def styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName=FONT,
            fontSize=9.2,
            leading=13.1,
            textColor=INK,
            spaceAfter=3.5 * mm,
        ),
        "h1": ParagraphStyle(
            "H1",
            parent=base["Heading1"],
            fontName=FONT_BOLD,
            fontSize=22,
            leading=25,
            textColor=INK,
            spaceBefore=3 * mm,
            spaceAfter=5 * mm,
        ),
        "h2": ParagraphStyle(
            "H2",
            parent=base["Heading2"],
            fontName=FONT_BOLD,
            fontSize=16,
            leading=19,
            textColor=INK,
            spaceBefore=7 * mm,
            spaceAfter=3.5 * mm,
            keepWithNext=True,
        ),
        "h3": ParagraphStyle(
            "H3",
            parent=base["Heading3"],
            fontName=FONT_BOLD,
            fontSize=11.5,
            leading=14,
            textColor=BLUE,
            spaceBefore=4.5 * mm,
            spaceAfter=2 * mm,
            keepWithNext=True,
        ),
        "h4": ParagraphStyle(
            "H4",
            parent=base["Heading4"],
            fontName=FONT_BOLD,
            fontSize=9.5,
            leading=12,
            textColor=MUTED,
            spaceBefore=3 * mm,
            spaceAfter=1.5 * mm,
            keepWithNext=True,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["BodyText"],
            fontName=FONT,
            fontSize=9,
            leading=12.5,
            textColor=INK,
            leftIndent=5 * mm,
            firstLineIndent=-3.5 * mm,
            bulletIndent=0,
            spaceAfter=1.6 * mm,
        ),
        "callout": ParagraphStyle(
            "Callout",
            parent=base["BodyText"],
            fontName=FONT,
            fontSize=9.5,
            leading=13.5,
            textColor=INK,
            leftIndent=5 * mm,
            rightIndent=5 * mm,
            borderColor=BLUE,
            borderWidth=0.8,
            borderPadding=4 * mm,
            backColor=CALLOUT,
            spaceAfter=5 * mm,
        ),
        "table": ParagraphStyle(
            "Table",
            parent=base["BodyText"],
            fontName=FONT,
            fontSize=7.6,
            leading=10.1,
            textColor=INK,
        ),
        "table_head": ParagraphStyle(
            "TableHead",
            parent=base["BodyText"],
            fontName=FONT_BOLD,
            fontSize=7.6,
            leading=9.5,
            textColor=colors.white,
        ),
    }


def footer(canvas, doc) -> None:
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(22 * mm, 15 * mm, 188 * mm, 15 * mm)
    canvas.setFont(FONT, 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(22 * mm, 10 * mm, "GameCult public digital infrastructure dossier · discussion draft")
    canvas.drawRightString(188 * mm, 10 * mm, str(doc.page))
    canvas.restoreState()


def cover_story(st: dict[str, ParagraphStyle]) -> list[object]:
    kicker = ParagraphStyle(
        "CoverKicker",
        parent=st["body"],
        fontName=FONT_BOLD,
        fontSize=9,
        leading=11,
        textColor=ORANGE,
        alignment=TA_CENTER,
        spaceAfter=9 * mm,
    )
    title = ParagraphStyle(
        "CoverTitle",
        parent=st["h1"],
        fontSize=29,
        leading=33,
        alignment=TA_CENTER,
        textColor=INK,
        spaceAfter=8 * mm,
    )
    subtitle = ParagraphStyle(
        "CoverSub",
        parent=st["body"],
        fontSize=13,
        leading=18,
        alignment=TA_CENTER,
        textColor=MUTED,
        spaceAfter=18 * mm,
    )
    facts = [
        ["PROPOSITION", "Open semantic infrastructure for durable, inspectable digital institutions"],
        ["INSTITUTIONAL FORM", "Proposed Dutch stichting with a protected public-interest mission"],
        ["SUSTAINABILITY", "Public funding plus managed SaaS, integration, training, and consulting"],
        ["PREPARED", "5 August 2026"],
    ]
    fact_data = [
        [
            Paragraph(f"<b>{html.escape(label)}</b>", st["table"]),
            Paragraph(html.escape(value), st["body"]),
        ]
        for label, value in facts
    ]
    fact_table = Table(fact_data, colWidths=[38 * mm, 100 * mm], hAlign="CENTER")
    fact_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
                ("TEXTCOLOR", (0, 0), (0, -1), ORANGE),
            ]
        )
    )
    return [
        Spacer(1, 24 * mm),
        Paragraph("GAMECULT · NETHERLANDS · DISCUSSION DRAFT", kicker),
        Paragraph("A proposal for a<br/>sustainable digital common", title),
        Paragraph(
            "Institutional dossier for Dutch public-sector, research, digital-commons, "
            "cultural, and inclusive-employment partners.",
            subtitle,
        ),
        fact_table,
        Spacer(1, 18 * mm),
        Paragraph(
            "Candidate public infrastructure seeking institutional validation. "
            "No organization named in this dossier has endorsed GameCult.",
            ParagraphStyle(
                "CoverNote",
                parent=st["body"],
                fontSize=8.5,
                leading=12,
                textColor=MUTED,
                alignment=TA_CENTER,
            ),
        ),
        PageBreak(),
    ]


def table_flowable(rows: list[list[str]], st: dict[str, ParagraphStyle]) -> Table:
    width = 166 * mm
    columns = len(rows[0])
    if columns == 3:
        col_widths = [38 * mm, 55 * mm, 73 * mm]
    elif columns == 2:
        col_widths = [48 * mm, 118 * mm]
    else:
        col_widths = [width / columns] * columns
    cooked = []
    for row_index, row in enumerate(rows):
        style = st["table_head"] if row_index == 0 else st["table"]
        cooked.append([Paragraph(inline_markup(cell), style) for cell in row])
    table = Table(cooked, colWidths=col_widths, repeatRows=1, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("GRID", (0, 0), (-1, -1), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 2.2 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 2.2 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 2 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2 * mm),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, PAPER]),
            ]
        )
    )
    return table


def build_story(text: str) -> list[object]:
    st = styles()
    story: list[object] = cover_story(st)
    for kind, payload in parse_blocks(text):
        if kind in {"h1", "h2", "h3", "h4"}:
            story.append(Paragraph(inline_markup(str(payload)), st[kind]))
        elif kind == "paragraph":
            story.append(Paragraph(inline_markup(str(payload)), st["body"]))
        elif kind == "callout":
            story.append(Paragraph(inline_markup(str(payload)), st["callout"]))
        elif kind == "bullets":
            items = [
                Paragraph(inline_markup(str(item)), st["bullet"], bulletText="-")
                for item in payload  # type: ignore[union-attr]
            ]
            story.append(KeepTogether(items[:2]) if len(items) == 2 else items[0])
            if len(items) != 2:
                story.extend(items[1:])
            story.append(Spacer(1, 2 * mm))
        elif kind == "table":
            story.append(table_flowable(payload, st))  # type: ignore[arg-type]
            story.append(Spacer(1, 4 * mm))
    return story


def render() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=22 * mm,
        rightMargin=22 * mm,
        topMargin=19 * mm,
        bottomMargin=21 * mm,
        title="GameCult - A proposal for a sustainable digital common",
        author="GameCult",
        subject="Institutional dossier for Dutch public-sector and digital-commons partners",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="body")
    doc.addPageTemplates([PageTemplate(id="dossier", frames=[frame], onPage=footer)])
    doc.build(build_story(SOURCE.read_text(encoding="utf-8")))
    print(OUTPUT)


if __name__ == "__main__":
    render()
