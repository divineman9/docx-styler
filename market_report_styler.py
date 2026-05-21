"""
DOCX Market Report Styler

A standalone Python utility that transforms plain .docx market update reports
into professionally styled documents. The script applies light-colored formatting
including section heading styling, 3-tier stock ticker highlighting (strong,
watchlist, caution), and important phrase emphasis.

The original document is never modified; a new copy with '_styled' appended
to the filename is produced.

Usage:
    python market_report_styler.py

The script will prompt for the input .docx file path and produce a styled copy.
"""

import re
import os
import sys
from datetime import datetime

from docx import Document
from docx.shared import Pt, RGBColor
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from docx.opc.exceptions import PackageNotFoundError


# =============================================================================
# Ticker Lists
# =============================================================================

# High-priority tickers highlighted in light green
STRONG_TICKERS = ["AAPL", "AMD", "NVDA", "SMH", "INTC", "NXP", "FCX", "BHP", "TECK"]

# Developing/watchlist tickers highlighted in light yellow
WATCHLIST_TICKERS = ["AMZN", "COST", "ARM", "IRDM", "LUNR", "APLD", "IREN", "SOXL", "AMPX", "XND", "UCDS", "NC"]

# Caution/weakness tickers highlighted in light pink
CAUTION_TICKERS = ["XOM"]


# =============================================================================
# Section Headings
# =============================================================================

# Predefined section heading names recognized by the styler
SECTION_HEADINGS = [
    "Post Market Review",
    "Core Stocks",
    "Semiconductor Sector",
    "Gold",
    "Oil",
    "Space Stocks",
    "Copper Sector",
    "Fertilizers",
    "Momentum / Watchlist Stocks",
    "Scans Summary",
    "Key Highlights",
    "Notes",
]


# =============================================================================
# Important Phrases
# =============================================================================

# Key trading phrases that receive bold + italic emphasis (case-insensitive matching)
IMPORTANT_PHRASES = [
    "High Priority",
    "Key Observation",
    "target",
    "breakout",
    "momentum",
    "entry",
    "support",
    "upside",
]


# =============================================================================
# Color Constants (RGB tuples)
# =============================================================================

# Light green background for strong tickers
COLOR_STRONG = (198, 239, 206)

# Light yellow background for watchlist tickers
COLOR_WATCHLIST = (255, 242, 204)

# Light pink background for caution tickers
COLOR_CAUTION = (255, 204, 204)

# Light blue font color for section headings
COLOR_HEADING = (91, 155, 213)


# =============================================================================
# Utility Functions
# =============================================================================


def log_progress(message):
    """Print a timestamped progress message to stdout."""
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"[{timestamp}] {message}")


def get_input_path():
    """Prompt the user for the input .docx file path and return it stripped."""
    path = input("Enter the path to the .docx file: ").strip()
    return path


def validate_file(path):
    """
    Validate that the given path exists and has a .docx extension.

    Returns the validated path if valid.
    Raises FileNotFoundError if the file does not exist.
    Raises ValueError if the file is not a .docx file.
    """
    if not path:
        raise ValueError("No file path provided.")
    if not os.path.isfile(path):
        raise FileNotFoundError(f"File not found at '{path}'.")
    if not path.lower().endswith(".docx"):
        raise ValueError("Unsupported file format. Please provide a .docx file.")
    return path


def generate_output_path(path):
    """
    Generate the output file path by inserting '_styled' before the .docx extension.

    Example: 'report.docx' -> 'report_styled.docx'
    """
    base, ext = os.path.splitext(path)
    return f"{base}_styled{ext}"


def apply_shading(run, rgb_tuple):
    """Apply background shading to a run using XML manipulation with w:shd element."""
    r, g, b = rgb_tuple
    hex_color = f"{r:02X}{g:02X}{b:02X}"

    rPr = run._r.get_or_add_rPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), hex_color)
    rPr.append(shd)


# =============================================================================
# Section Heading Formatting
# =============================================================================


def format_headings(doc):
    """
    Apply heading styles to paragraphs matching predefined section heading names.

    For each paragraph whose stripped text matches a SECTION_HEADINGS entry:
    - Clears all existing runs and creates a single new styled run
    - Applies bold, font color RGB(91, 155, 213), and font size 13pt
    - Sets paragraph spacing: 12pt before, 4pt after

    Args:
        doc: A python-docx Document object.

    Returns:
        The modified Document object.
    """
    for paragraph in doc.paragraphs:
        if paragraph.text.strip() in SECTION_HEADINGS:
            heading_text = paragraph.text.strip()

            # Clear all existing runs from the paragraph
            for run in paragraph.runs:
                run._r.getparent().remove(run._r)

            # Create a single new styled run
            run = paragraph.add_run(heading_text)
            run.bold = True
            run.font.color.rgb = RGBColor(*COLOR_HEADING)
            run.font.size = Pt(13)

            # Set paragraph spacing
            paragraph.paragraph_format.space_before = Pt(12)
            paragraph.paragraph_format.space_after = Pt(4)

    return doc


# =============================================================================
# Run-Splitting Algorithm
# =============================================================================


def build_ticker_pattern(tickers):
    """
    Build a compiled regex pattern matching any ticker as a whole word.

    Uses word boundaries (\\b) to prevent partial matches. Tickers are matched
    case-sensitively (stock tickers are uppercase by convention).

    Args:
        tickers: A list of ticker symbol strings (e.g., ["AAPL", "NVDA"]).

    Returns:
        A compiled re.Pattern object that matches any of the given tickers
        as whole words.
    """
    if not tickers:
        # Return a pattern that will never match anything
        return re.compile(r'(?!)')
    escaped = [re.escape(t) for t in tickers]
    return re.compile(r'\b(' + '|'.join(escaped) + r')\b')


def _copy_run_formatting(source_run, target_run):
    """
    Copy formatting properties from a source run to a target run.

    Copies font properties (bold, italic, underline, size, color, name)
    from the source run's XML properties to the target run.

    Args:
        source_run: The run to copy formatting from.
        target_run: The run to apply formatting to.
    """
    import copy
    from lxml import etree

    # Get the source run's properties element
    source_rPr = source_run._r.find(qn('w:rPr'))
    if source_rPr is not None:
        # Deep copy the run properties and set them on the target
        new_rPr = copy.deepcopy(source_rPr)
        # Remove any existing rPr on target
        existing_rPr = target_run._r.find(qn('w:rPr'))
        if existing_rPr is not None:
            target_run._r.remove(existing_rPr)
        # Insert rPr as the first child element of the run
        target_run._r.insert(0, new_rPr)


def split_run_at_matches(paragraph, pattern, apply_fn):
    """
    Split runs in a paragraph at regex matches and apply styling to matched portions.

    For each run in the paragraph, searches for pattern matches. When a match is
    found, the run is split into up to three parts:
      - Before the match (retains original formatting)
      - The match itself (apply_fn is called on this new run)
      - After the match (retains original formatting, scanned for more matches)

    This function modifies the paragraph in-place by manipulating the underlying
    XML elements directly.

    Args:
        paragraph: A python-docx Paragraph object.
        pattern: A compiled regex pattern to search for.
        apply_fn: A callable that receives a Run object and applies styling to it.
                  Called once for each matched portion of text.
    """
    import copy

    # We need to work with the paragraph's XML element directly
    p_element = paragraph._p

    # Get a snapshot of current run elements (iterate over a copy since we modify in-place)
    runs_to_process = list(p_element.findall(qn('w:r')))

    for run_element in runs_to_process:
        # Get the text content of this run
        text_elements = run_element.findall(qn('w:t'))
        if not text_elements:
            continue

        # Combine all text elements in this run
        full_text = ''.join(t.text or '' for t in text_elements)
        if not full_text:
            continue

        # Search for the first match in this run's text
        match = pattern.search(full_text)
        if not match:
            continue

        # We have a match - need to split this run
        # Process iteratively to handle multiple matches within the same run text
        remaining_text = full_text
        current_run_element = run_element
        offset = 0

        while True:
            match = pattern.search(remaining_text)
            if not match:
                break

            before_text = remaining_text[:match.start()]
            matched_text = match.group()
            after_text = remaining_text[match.end():]

            # Get the original run properties for copying
            original_rPr = current_run_element.find(qn('w:rPr'))

            # Update the current run element to contain only the "before" text
            # Clear existing text elements
            for t_elem in current_run_element.findall(qn('w:t')):
                current_run_element.remove(t_elem)

            if before_text:
                t = OxmlElement('w:t')
                t.text = before_text
                # Preserve spaces
                t.set(qn('xml:space'), 'preserve')
                current_run_element.append(t)

            # Create a new run for the matched text
            matched_run_element = OxmlElement('w:r')
            if original_rPr is not None:
                matched_run_element.append(copy.deepcopy(original_rPr))
            else:
                matched_run_element.append(OxmlElement('w:rPr'))
            matched_t = OxmlElement('w:t')
            matched_t.text = matched_text
            matched_t.set(qn('xml:space'), 'preserve')
            matched_run_element.append(matched_t)

            # Insert the matched run after the current run
            current_run_element.addnext(matched_run_element)

            # Apply the styling function to the matched run
            # We need a python-docx Run wrapper for the apply_fn
            from docx.text.run import Run
            matched_run = Run(matched_run_element, paragraph)
            apply_fn(matched_run)

            # Create a new run for the "after" text (if any)
            if after_text:
                after_run_element = OxmlElement('w:r')
                if original_rPr is not None:
                    after_run_element.append(copy.deepcopy(original_rPr))
                after_t = OxmlElement('w:t')
                after_t.text = after_text
                after_t.set(qn('xml:space'), 'preserve')
                after_run_element.append(after_t)

                # Insert after the matched run
                matched_run_element.addnext(after_run_element)

                # Continue scanning the "after" portion for more matches
                remaining_text = after_text
                current_run_element = after_run_element
            else:
                break

            # If the "before" text was empty, remove the empty original run
            # (only on first iteration when current_run_element is the original)

        # If the original run ended up with no text (before was empty on first split),
        # remove it to keep the XML clean
        original_texts = current_run_element.findall(qn('w:t'))
        if current_run_element == run_element:
            # Check if the original run is now empty
            text_content = ''.join(t.text or '' for t in run_element.findall(qn('w:t')))
            if not text_content:
                p_element.remove(run_element)


# =============================================================================
# Ticker Highlighting
# =============================================================================


def highlight_tickers(doc):
    """
    Apply category-specific highlighting to stock ticker symbols in the document.

    Processes all paragraphs (skipping those identified as section headings) and
    highlights ticker symbols with bold formatting and category-specific background
    shading:
      - Strong tickers: bold + light green shading
      - Watchlist tickers: bold + light yellow shading
      - Caution tickers: bold + light pink shading

    Processing order is strong → watchlist → caution. This ensures that if a ticker
    somehow appeared in multiple categories, the first match wins.

    Args:
        doc: A python-docx Document object.

    Returns:
        The modified Document object.
    """
    # Build regex patterns for each ticker category
    strong_pattern = build_ticker_pattern(STRONG_TICKERS)
    watchlist_pattern = build_ticker_pattern(WATCHLIST_TICKERS)
    caution_pattern = build_ticker_pattern(CAUTION_TICKERS)

    # Define apply functions for each category
    def apply_strong(run):
        """Apply bold + light green shading to a strong ticker run."""
        run.bold = True
        apply_shading(run, COLOR_STRONG)

    def apply_watchlist(run):
        """Apply bold + light yellow shading to a watchlist ticker run."""
        run.bold = True
        apply_shading(run, COLOR_WATCHLIST)

    def apply_caution(run):
        """Apply bold + light pink shading to a caution ticker run."""
        run.bold = True
        apply_shading(run, COLOR_CAUTION)

    # Process each paragraph, skipping headings
    for paragraph in doc.paragraphs:
        # Skip paragraphs that are section headings
        if paragraph.text.strip() in SECTION_HEADINGS:
            continue

        # Process all three categories in sequence (order matters for overlaps)
        split_run_at_matches(paragraph, strong_pattern, apply_strong)
        split_run_at_matches(paragraph, watchlist_pattern, apply_watchlist)
        split_run_at_matches(paragraph, caution_pattern, apply_caution)

    return doc


# =============================================================================
# Important Phrase Emphasis
# =============================================================================


def build_phrase_pattern(phrases):
    """
    Build a compiled case-insensitive regex pattern matching any phrase as a whole word.

    Uses word boundaries (\\b) to prevent partial matches. Phrases are matched
    case-insensitively (unlike tickers which are case-sensitive).

    Args:
        phrases: A list of phrase strings (e.g., ["High Priority", "breakout"]).

    Returns:
        A compiled re.Pattern object with re.IGNORECASE flag that matches any
        of the given phrases as whole words.
    """
    if not phrases:
        # Return a pattern that will never match anything
        return re.compile(r'(?!)')
    escaped = [re.escape(p) for p in phrases]
    return re.compile(r'\b(' + '|'.join(escaped) + r')\b', re.IGNORECASE)


def emphasize_phrases(doc):
    """
    Apply bold + italic emphasis to important phrases in the document.

    Processes all paragraphs (skipping those identified as section headings) and
    emphasizes important phrases with bold and italic formatting. Phrases are
    matched case-insensitively using word boundaries.

    No background shading or highlighting is applied — just subtle bold + italic
    emphasis to make key trading phrases stand out.

    Args:
        doc: A python-docx Document object.

    Returns:
        The modified Document object.
    """
    # Build a case-insensitive regex pattern for all important phrases
    phrase_pattern = build_phrase_pattern(IMPORTANT_PHRASES)

    # Define the apply function for phrase emphasis
    def apply_phrase_emphasis(run):
        """Apply bold + italic formatting to an important phrase run."""
        run.bold = True
        run.italic = True

    # Process each paragraph, skipping headings
    for paragraph in doc.paragraphs:
        # Skip paragraphs that are section headings
        if paragraph.text.strip() in SECTION_HEADINGS:
            continue

        # Apply phrase emphasis using the shared run-splitting algorithm
        split_run_at_matches(paragraph, phrase_pattern, apply_phrase_emphasis)

    return doc


# =============================================================================
# Main Orchestration
# =============================================================================


def main():
    """
    Entry point for the DOCX Market Report Styler.

    Orchestrates the full styling pipeline:
      1. Prompt user for input file path
      2. Validate the file (existence and .docx extension)
      3. Load the document
      4. Format section headings
      5. Highlight stock tickers
      6. Emphasize important phrases
      7. Save the styled document

    All errors are caught at the top level to prevent unhandled exceptions.
    The original document is never modified; a new '_styled' copy is produced.
    """
    try:
        path = get_input_path()
        validated_path = validate_file(path)

        log_progress("Loading document...")
        doc = Document(validated_path)

        log_progress("Formatting section headings...")
        format_headings(doc)

        log_progress("Highlighting stock tickers...")
        highlight_tickers(doc)

        log_progress("Emphasizing important phrases...")
        emphasize_phrases(doc)

        output_path = generate_output_path(validated_path)
        log_progress("Saving styled document...")
        doc.save(output_path)

        print(f"\n✓ Success! Styled document saved to: {output_path}")

    except FileNotFoundError:
        print(f"Error: File not found at '{path}'.")
    except ValueError as e:
        print(f"Error: {e}")
    except PermissionError:
        print(f"Error: Permission denied when saving.")
    except PackageNotFoundError:
        print("Error: The file appears to be corrupted or is not a valid .docx document.")
    except Exception as e:
        print(f"Error: An unexpected error occurred: {e}")


if __name__ == "__main__":
    main()
