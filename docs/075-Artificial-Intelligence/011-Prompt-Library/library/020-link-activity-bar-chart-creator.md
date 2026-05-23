/skill-creator
Create a skill that performs the following, and place all generated files in the link-activity-bar-chart directory:

1. **Database Query**:

   - Read the database connection URL from the .env file (variable: `DATABASE_URL`).
   - The script should dynamically determine the appropriate database driver based on the prefix of the DATABASE_URL (e.g., postgres://, mysql://).
   - Connect to the database using this URL.
   - Query for all links created within the past 12 months.
   - Aggregate the results to count the total number of links created in each month (grouped by month, for the last 12 months).

2. **Data Visualization**:

   - Use a Python script to generate a bar chart:

     - X-axis: Each month (labelled, covering the past 12 months).
     - Y-axis: Total number of links created in that month.
   - The chart must be clear, with labeled axes and a title.

3. **Export**:

   - Save the generated bar chart as a PNG image file.

4. **Python Environment**:

   - Check if Python and pip are installed; if not, prompt to install them.
   - All commands must be blocking commands that return control to the shell before proceeding. 
   - Generate a `requirements.txt` in the same directory with all required packages.
   - Create a Python virtual environment in `.agents/skills/link-activity-bar-chart/venv`.
   - Activate the virtual environment using the activate script located inside the venv’s standard activation directory for the current shell environment.
   - To verify activation, run python -c 'import sys; print(sys.prefix)'. The output must match the relative path of the created virtual environment.
   - The virtual environment should only be activated once during the entire session.
   - NEVER attempt to activate the virtual environment again after it has already been activated.
   - NEVER nest or recursively activate a virtual environment from inside another activated virtual environment.
   - All subsequent commands must be run within the already-activated virtual environment.
   - NEVER call the venv's binaries directly by their full path.
   - NEVER install the packages globally.
   - NEVER install the packages outside of the virtual environment.
   - NEVER install the packages individually.
   - Packages should all be installed together using the `requirements.txt` file.
   - Run commands one at a time on separate lines.
   - NEVER chain commands together using && or similar operators.
   - Wait for each command to complete successfully before running the next command.
   - Run the script from within the virtual environment.
   - NEVER `cd` into an absolute project directory path.
   - NEVER enter the full absolute project path manually.
   - The VS Code workspace is already opened at the project root, so terminals already start in the correct project directory.
   - Only use relative paths from the existing project root when needed.
   - When installing dependencies, use the --force-reinstall and --no-cache-dir flags to ensure all packages are physically written into the virtual environment's site-packages, even if they exist elsewhere on the system.
   - Use the --ignore-installed flag with pip install -r requirements.txt. This forces pip to install the requirements into the active environment regardless of what is already installed in the user or system global site-packages.

**Requirements:**

- The skill must handle errors gracefully (e.g., missing .env file, invalid `DATABASE_URL`, no data, missing Python/pip).
- The Python script should be self-contained and include all necessary imports.
- The output PNG file should be saved in the current working directory with a descriptive filename (e.g., `links_created_last_12_months.png`).
- All skill files, scripts, and documentation must be created under link-activity-bar-chart.
- DO NOT test the skill with a sample run. The skill should be created and documented, but not executed or tested with actual data.

**Additional Rules:**

- Instead of assuming success, enforce a verification step after each command to ensure it completed successfully before moving on to the next command.
- Every command must be followed by an explicit check. For example, after pip install, run pip list to verify the presence of key packages. After creating a file, run ls or test -f to verify its existence.
- Every step must be validated using an explicit command output (not inference, not prompt state).
- Do not proceed until a verification command explicitly confirms success. 