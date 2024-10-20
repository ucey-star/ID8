# Contributing to ID8

This guide outlines the steps for contributing, including setting up your environment, creating branches, and submitting pull requests.

## Table of Contents

- [Branch Naming Convention](#branch-naming-convention)
- [How to Contribute](#how-to-contribute)
  - [Step 1: Create a New Branch](#step-1-create-a-new-branch)
  - [Step 2: Implement Your Feature or Fix](#step-2-implement-your-feature-or-fix)
  - [Step 3: Pull Latest Changes from `main`](#step-3-pull-latest-changes-from-main)
  - [Step 4: Linting and Formatting](#step-4-linting-and-formatting)
  - [Step 5: Commit and Push](#step-4-commit-and-push)
  - [Step 6: Submit a Pull Request](#step-5-submit-a-pull-request)
- [Code Review Process](#code-review-process)
- [Best Practices](#best-practices)

## Branch Naming Convention

When creating a new branch, please use the following naming convention:

`<your-username>/<feature-or-task>`

**Example:**

- flavia/login-page

## How to Contribute

### Step 1: Create a New Branch

Before you start working, create a new branch off of the `main` branch using the naming convention mentioned above.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ID8.git
   cd ID8.git
   ```
2. Checkout the main branch and pull the latest changes:
   ```bash
   git checkout main
   git pull origin main
   ```
3. Create a new branch for your feature or fix:
   ```bash
   git checkout -b <your-username>/<feature-or-task>
   ```

### Step 2: Implement Your Feature or Fix

Now that you’re in your own branch, make the necessary changes or implement your feature.

### Step 3: Pull Latest Changes from `main`

Before committing and pushing your changes, make sure your branch is up-to-date with the latest changes from `main`:

```bash
git pull origin main
```

Resolve any merge conflicts if necessary.


### Step 4: Linting and Formatting

Before committing and pushing your changes, run: 

- `npm run lint` to fix formatting 
- `npm run format` to fix formatting issues  

### Step 5: Commit and Push

Once your feature is ready and your branch is up to date, commit your changes with a descriptive message:

```bash
git add .
git commit -m "Brief description of your changes"
```

Then push your branch to your remote repository:

```bash
git push origin <your-username>/<feature-or-task>
```

### Step 6: Submit a Pull Request

Once your changes are pushed, open a pull request (PR) from your branch to the main repository's `main` branch.

1. Go to the repository on GitHub.
2. Click the "Compare & pull request" button.
3. There should be an automatic template that you have to fill out.

## Code Review Process

Once you've submitted your pull request, it will be reviewed by one or more maintainers, with the requirement of at least one for merging. You may be asked to make additional changes, so please be prepared to address any feedback. Once approved, you will be able to merge your changes into the `main` branch.

## Best Practices

- **Write Clear Commit Messages**: Each commit should describe the intent of your changes.
- **Keep Your Branch Up to Date**: Regularly pull from `main` to avoid large merge conflicts later.
