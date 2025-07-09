**CREATE DESIGN VARIATIONS**

UI TO BUILD: $ARGUMENTS

**GOAL**
Your goal is to spin up 3 parallel sub agents concurrently to implement one UI html mockup for our signup page with variations, so that users can review and decide which one is better.

**Task for each sub agent**
1. Analyse the style guide in `ui_mockups/design-system_<n>.json`, as well as mockups for reference.
2. Build one single html page of just one screen to build a UI based on users' feedback/task
3. Output html in `ui_mockups` folder as `ui_<n>.<m>.html`, where n is the design-system_<n>.json file and m is the iteration number (needs to be unique like `ui_1.1.html`, `ui_1.2.html`, etc.)

**Constraints**
- You can use the text currently in the `src/config/form-config.js` file as a reference and also add your own where it makes sense in the context of the UI layout which is the main focus. 