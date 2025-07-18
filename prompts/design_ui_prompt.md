# UI Design Prompt

Create a single page html + tailwind mockup of our signup page in `ui_mockups/design2.html`.
- Just the first part of the 2-part progressive interface (text, email & submit).
- Using the text content in `src/config/form-config.js`.
- Start with a simple and clean wireframe design, we will iterate the layout then add the styles.

 
## Design system

- Spatial UI
- Minimal yet functional

## Step 1: Extract design system

**Task**: Extract a generalized and reusable design system from:

1. UI inspiration in `ui_mockups/assets/ui<TODO>.png`, and,
2. Brand guidelines in `docs/brand-guidelines.md`.
3. Design guidlines in `docs/design-guidelines.md`(TODO).

### Constraints
- Do not include specific content from the UI inspiration (text, logos, icons, etc.).
- Focus purely on *design principles*, *structure* and *styles*.

## Output 
3. Output the JSON to the `ui_mockups` folder with the name: `design-system_<n>.json` where `<n>` is the number of the mock up (use the lowest number not already used).
4. Do not include any other text in the JSON file.


## Step 2: Generate mockup
Implement one UI html mockup of our signup page.

## Design Features
 
### Background
Use `ui_mockups/assets/bg3.jpg` as background.

### Header
- Centered header, not extend to the sides.
- Content: [Logo: "Embodi" (sign up page), "Blog", "Contact"]
    - Blog & Contact can be purely visual.

### Sign up form
- Centered with good spacing from header.
- First part the 2-part progressive interface (text, email & submit).

### Miscellaneous