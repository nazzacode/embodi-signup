**CREATE DESIGN SYSTEM JSON**

UI TO ANALYZE: $ARGUMENTS

**GOAL**
Your goal is to extract a generalized and reusable design system from the screenshots provided in `$ARGUMENTS` and the `brand-guidelines.md` file. **without including specific image content**, so that frontend developers or AI agents can reference the JSON as a style foundation for building consistent UIs.

**Task**

1. Analyze the screenshots provided in `$ARGUMENTS` to infer:

  - Color palette
  - Typography rules
  - Spacing guidelines
  - Layout structure (grids, cards, containers, etc.)
  - UI components (buttons, inputs, tables, etc.)
  - Border radius, shadows, and other visual styling patterns

2. Create a ui_mockups/design-system_<n>.json file that clearly defines these rules and can be used to replicate the visual language in a consistent way.

3. Output the JSON to the `ui_mockups` folder with the name: `design-system_<n>.json` where `<n>` is the number of the mock up (use the lowest number not already used).
4. Do not include any other text in the JSON file.

**Constraints**

- Do **not** extract specific content from the screenshots (text, logos, icons, etc.).
- Focus purely on *design principles*, *structure* and *styles*.
