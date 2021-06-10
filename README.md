# Testing GitHub Actions for FVTT releases

## Current Implementation - Setup

- Set up `module.json` as normal. Once it's been set up, you shouldn't need to touch it again.
- On project creation, set up `module-slugs.json`. You shouldn't need to change this again either.
- Set up `module-release.json`. All of your release versioning data will go here.
- Add `latest-changes.md`. Add the release notes here.
  
## YML

`main.yml` will only run the `build` job when code is pushed to `master`

It will:

1. Checkout the repo
2. Update `module.json` using `update-manifest.js`, creating a "versioned" module.json
3. Grab the version from the manifest as an envar
4. Grab the download name as an envar
5. Zip the "versioned" module for archival. Uses download name envar for zip name
6. Ensure a release for this version doesn't exist. Delete it if so. - We delete and re-create it since updating the release doesn't modify the date
7. Create a new release using our "versioned" module.json and zip. Use `latest-changes.md` as the release body
8. Update `module.json` using `update-manifest.js`, creating a "latest" module.json
9. Remove the previous versioned zip
10. Zip the "latest" module for production. Uses download name envar for zip name
11. Delete the previous "latest" release if it exists
12. Create a new "latest" release. Use `latest-changes.md` as the release body

Note that the module.jsons for the "versioned" and "latest" releases differ, allowing users who want an old version of the module to just grab the module.json from an archived release.

## JS

### get-download-name.js

Read module-slugs.json, log out `downloadName` so the yml file can grab it

### get-version.js

Read module-release.json, log out `version` so the yml file can grab it

### update-manifest.js

Construct a new `manifest.json` using data from `module-slugs.json`, `module-release.json` and `module.json`, then overwrite `module.json` with the new data.
It will accept a single argument to specify a custom tag, or will revert to the module version if this isn't passed in.
This lets us pass in `latest` when creating the production release.